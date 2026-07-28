[CmdletBinding()]
param(
  [string]$ReleaseRoot = ""
)

$ErrorActionPreference = "Stop"
if ([string]::IsNullOrWhiteSpace($ReleaseRoot)) {
  $ReleaseRoot = Join-Path $PSScriptRoot "..\jarvis-agent"
}
$Root = (Resolve-Path -LiteralPath $ReleaseRoot).Path
$UpdateDir = Join-Path $Root "update"
$ManifestFiles = @(Get-ChildItem -LiteralPath $UpdateDir -Filter "*.json" -File)
if ($ManifestFiles.Count -eq 0) { throw "No update manifests found in $UpdateDir" }

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) { throw "VALIDATION FAILED: $Message" }
}

function Resolve-ArtifactPath {
  param([string]$ManifestDirectory, [string]$RelativeUrl)
  Assert-True (-not [string]::IsNullOrWhiteSpace($RelativeUrl)) "artifact URL is required"
  Assert-True ($RelativeUrl -notmatch '^[a-zA-Z][a-zA-Z0-9+.-]*:') "artifact URL must be relative inside GitHub Pages"
  Assert-True ($RelativeUrl -notmatch '[?#]') "artifact URL cannot contain query or fragment"
  $Decoded = [Uri]::UnescapeDataString($RelativeUrl).Replace('/', [IO.Path]::DirectorySeparatorChar)
  $Resolved = [IO.Path]::GetFullPath((Join-Path $ManifestDirectory $Decoded))
  $RootPrefix = $Root.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar
  Assert-True ($Resolved.StartsWith($RootPrefix, [StringComparison]::OrdinalIgnoreCase)) "artifact escapes jarvis-agent root: $RelativeUrl"
  return $Resolved
}

function Test-ZipSafety {
  param([string]$ZipPath, [string]$ExpectedVersion)
  $Archive = [IO.Compression.ZipFile]::OpenRead($ZipPath)
  try {
    $PackageEntry = $null
    foreach ($Entry in $Archive.Entries) {
      $Name = $Entry.FullName.Replace('\', '/')
      $Segments = @($Name.Split('/') | Where-Object { $_ -ne "" })
      Assert-True (-not $Name.StartsWith('/')) "absolute ZIP entry: $Name"
      Assert-True ($Name -notmatch '^[A-Za-z]:/') "drive-qualified ZIP entry: $Name"
      Assert-True ($Segments -notcontains '..') "ZIP path traversal: $Name"
      Assert-True ([IO.Path]::GetFileName($Name) -ne ".env") "runtime .env found in ZIP: $Name"

      if ($Name -eq "agent/package.json") { $PackageEntry = $Entry }
      if ($Entry.Length -le 2MB -and $Name -match '\.(js|json|md|txt|cmd|ps1|sh|command|example)$') {
        $Reader = New-Object IO.StreamReader($Entry.Open())
        try { $Text = $Reader.ReadToEnd() } finally { $Reader.Dispose() }
        Assert-True ($Text -notmatch 'dev-agent-token') "legacy default token found in $Name"
        Assert-True ($Text -notmatch 'ghp_[A-Za-z0-9]{20,}') "GitHub token pattern found in $Name"
        Assert-True ($Text -notmatch 'github_pat_[A-Za-z0-9_]{20,}') "GitHub PAT pattern found in $Name"
        Assert-True ($Text -notmatch 'sk-[A-Za-z0-9]{20,}') "API key pattern found in $Name"
      }
    }
    Assert-True ($null -ne $PackageEntry) "agent/package.json is missing from $ZipPath"
    $PackageReader = New-Object IO.StreamReader($PackageEntry.Open())
    try { $Package = $PackageReader.ReadToEnd() | ConvertFrom-Json } finally { $PackageReader.Dispose() }
    Assert-True ($Package.version -eq $ExpectedVersion) "package version $($Package.version) does not match manifest $ExpectedVersion"
  } finally {
    $Archive.Dispose()
  }
}

foreach ($ManifestFile in $ManifestFiles) {
  $Manifest = Get-Content -LiteralPath $ManifestFile.FullName -Raw | ConvertFrom-Json
  $ExpectedChannel = $ManifestFile.BaseName.ToLowerInvariant()
  Assert-True ($Manifest.schemaVersion -eq 1) "unsupported schema in $($ManifestFile.Name)"
  Assert-True ($Manifest.channel -eq $ExpectedChannel) "channel must match manifest filename $ExpectedChannel"
  Assert-True ($Manifest.version -match '^\d+\.\d+\.\d+$') "invalid semantic version"
  Assert-True ($Manifest.minimumAutoUpdateVersion -match '^\d+\.\d+\.\d+$') "invalid minimumAutoUpdateVersion"

  $PlatformProperties = @($Manifest.platforms.PSObject.Properties)
  Assert-True ($PlatformProperties.Count -gt 0) "manifest has no platforms"
  foreach ($Platform in $PlatformProperties) {
    Assert-True ($Platform.Name -in @("windows-x64", "macos-arm64")) "unsupported platform $($Platform.Name)"
    $Artifact = $Platform.Value
    Assert-True ($Artifact.sha256 -match '^[a-fA-F0-9]{64}$') "invalid SHA-256 for $($Platform.Name)"
    $ArtifactPath = Resolve-ArtifactPath -ManifestDirectory $ManifestFile.DirectoryName -RelativeUrl $Artifact.url
    Assert-True (Test-Path -LiteralPath $ArtifactPath -PathType Leaf) "missing artifact $ArtifactPath"
    $File = Get-Item -LiteralPath $ArtifactPath
    Assert-True ($File.Length -eq [int64]$Artifact.sizeBytes) "size mismatch for $($Platform.Name)"
    $ActualHash = (Get-FileHash -LiteralPath $ArtifactPath -Algorithm SHA256).Hash
    Assert-True ($ActualHash -eq $Artifact.sha256) "SHA-256 mismatch for $($Platform.Name)"
    Test-ZipSafety -ZipPath $ArtifactPath -ExpectedVersion $Manifest.version
    Write-Host "[ok] $($Manifest.channel) $($Manifest.version) $($Platform.Name) $($File.Length) bytes"
  }
}

Write-Host "Jarvis Agent release validation OK"
