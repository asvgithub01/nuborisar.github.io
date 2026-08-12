[CmdletBinding()]
param(
    [switch] $Publish,
    [switch] $DryRun,
    [string[]] $App,
    [string] $CommitMessage
)

$ErrorActionPreference = 'Stop'
$scriptPath = Join-Path $PSScriptRoot 'update-app-store.mjs'
$arguments = @($scriptPath)

if ($Publish) { $arguments += '--publish' }
if ($DryRun) { $arguments += '--dry-run' }
foreach ($appId in $App) {
    if ($appId) { $arguments += @('--app', $appId) }
}
if ($CommitMessage) { $arguments += @('--message', $CommitMessage) }

& node @arguments
if ($LASTEXITCODE -ne 0) {
    throw "La actualización del app store terminó con código $LASTEXITCODE."
}
