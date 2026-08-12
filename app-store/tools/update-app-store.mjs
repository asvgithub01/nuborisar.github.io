import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const toolsRoot = path.dirname(fileURLToPath(import.meta.url));
const storeRoot = path.dirname(toolsRoot);
const repoRoot = path.dirname(storeRoot);
const catalogPath = path.join(storeRoot, "data", "apps.js");
const indexPath = path.join(storeRoot, "index.html");
const sourcesPath = path.join(toolsRoot, "app-sources.json");
const maxApkBytes = 100 * 1024 * 1024;
const ignoredDirectories = new Set([".git", ".gradle", ".idea", "node_modules", "device-data-backups"]);

function parseArguments(argv) {
  const options = { publish: false, dryRun: false, apps: [], message: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--publish") options.publish = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--app") options.apps.push(argv[++index]);
    else if (argument === "--message") options.message = argv[++index];
    else if (argument === "--help") {
      console.log("Uso: node update-app-store.mjs [--dry-run] [--app id] [--publish] [--message texto]");
      process.exit(0);
    } else throw new Error(`Argumento desconocido: ${argument}`);
  }
  if (options.publish && options.dryRun) throw new Error("--publish y --dry-run no se pueden combinar.");
  return options;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? repoRoot,
    encoding: "utf8",
    windowsHide: true,
    shell: false,
    maxBuffer: 20 * 1024 * 1024
  });
  if (options.allowFailure) return result;
  if (result.error || result.status !== 0) {
    const detail = result.stderr?.trim() || result.stdout?.trim() || result.error?.message || `código ${result.status}`;
    throw new Error(`${command} ${args.join(" ")} falló: ${detail}`);
  }
  return result.stdout.trim();
}

function loadCatalog() {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(catalogPath, "utf8"), sandbox, { filename: catalogPath });
  if (!Array.isArray(sandbox.window.APP_CATALOG)) throw new Error("data/apps.js no contiene window.APP_CATALOG.");
  return sandbox.window.APP_CATALOG;
}

function findBuildTools() {
  const sdkRoot = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT ||
    (process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Android", "Sdk") : "");
  const buildToolsRoot = path.join(sdkRoot, "build-tools");
  if (!fs.existsSync(buildToolsRoot)) throw new Error(`No se encontró Android build-tools en ${buildToolsRoot}.`);
  const versions = fs.readdirSync(buildToolsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => right.localeCompare(left, undefined, { numeric: true }));
  for (const version of versions) {
    const root = path.join(buildToolsRoot, version);
    const aapt = path.join(root, process.platform === "win32" ? "aapt.exe" : "aapt");
    const apksigner = path.join(root, process.platform === "win32" ? "apksigner.bat" : "apksigner");
    if (fs.existsSync(aapt) && fs.existsSync(apksigner)) return { aapt, apksigner };
  }
  throw new Error("No se encontraron aapt y apksigner en una versión común de build-tools.");
}

function collectApks(root) {
  const output = [];
  const walk = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(absolute);
      else if (entry.isFile() && entry.name.toLowerCase().endsWith(".apk")) output.push(absolute);
    }
  };
  walk(root);
  return output;
}

function apkPriority(apkPath) {
  const normalized = apkPath.replaceAll("\\", "/").toLowerCase();
  if (normalized.includes("/build/outputs/")) return 0;
  if (normalized.includes("/build/intermediates/apk/")) return 1;
  return 2;
}

function verifySignature(apksigner, apkPath) {
  const command = process.platform === "win32" ? "cmd.exe" : apksigner;
  const args = process.platform === "win32"
    ? ["/d", "/c", "call", apksigner, "verify", apkPath]
    : ["verify", apkPath];
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    windowsHide: true,
    shell: false,
    maxBuffer: 20 * 1024 * 1024
  });
  return !result.error && result.status === 0;
}

function readApkMetadata(aapt, apkPath) {
  const badgingResult = run(aapt, ["dump", "badging", apkPath], { allowFailure: true });
  const badging = badgingResult.stdout || "";
  const packageLine = badging.split(/\r?\n/, 1)[0];
  const packageName = packageLine.match(/name='([^']+)'/)?.[1];
  const versionCode = Number(packageLine.match(/versionCode='([^']+)'/)?.[1]);
  const versionName = packageLine.match(/versionName='([^']+)'/)?.[1];
  const sdk = badging.match(/^sdkVersion:'([^']+)'/m)?.[1];
  if (!packageName || !Number.isFinite(versionCode) || !versionName) {
    const detail = badgingResult.stderr?.trim();
    throw new Error(`No se pudieron leer package/version de ${apkPath}${detail ? `: ${detail}` : "."}`);
  }
  const xmlResult = run(aapt, ["dump", "xmltree", apkPath, "AndroidManifest.xml"], { allowFailure: true });
  const xmlTree = xmlResult.stdout || "";
  const testOnly = /android:testOnly[^\n]*0xffffffff/i.test(xmlTree);
  const normalized = apkPath.replaceAll("\\", "/").toLowerCase();
  const buildType = normalized.includes("/release/") ? "Release" : "Debug";
  return { packageName, versionCode, versionName, sdk, testOnly, buildType };
}

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase();
}

function isoLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function spanishDate(date) {
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatSize(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function safeSegment(value) {
  return String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function changelog(projectRoot, previousIsoDate) {
  if (!fs.existsSync(path.join(projectRoot, ".git"))) {
    return ["Nueva compilación incorporada automáticamente al catálogo."];
  }
  const args = ["-C", projectRoot, "log", "--no-merges", "--pretty=format:%s", "--max-count=6"];
  if (previousIsoDate) args.push(`--after=${previousIsoDate}T23:59:59`);
  const result = run("git", args, { allowFailure: true });
  const subjects = result.status === 0 ? result.stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) : [];
  return subjects.length ? subjects : ["Nueva compilación incorporada automáticamente al catálogo."];
}

function chooseCandidate(source, app, buildTools) {
  if (!fs.existsSync(source.projectRoot)) {
    console.warn(`  ! No existe ${source.projectRoot}`);
    return null;
  }
  const apks = collectApks(source.projectRoot)
    .filter((apkPath) => !apkPath.toLowerCase().includes("unsigned"))
    .map((apkPath) => ({ apkPath, stat: fs.statSync(apkPath) }))
    .filter((item) => item.stat.size <= maxApkBytes)
    .sort((left, right) => apkPriority(left.apkPath) - apkPriority(right.apkPath) || right.stat.mtimeMs - left.stat.mtimeMs || left.apkPath.localeCompare(right.apkPath));

  for (const candidate of apks) {
    if (!verifySignature(buildTools.apksigner, candidate.apkPath)) continue;
    let metadata;
    try { metadata = readApkMetadata(buildTools.aapt, candidate.apkPath); }
    catch (error) { console.warn(`  ! ${error.message}`); continue; }
    if (metadata.packageName !== app.packageName) continue;
    return { ...candidate, metadata, hash: sha256(candidate.apkPath) };
  }
  console.warn("  ! No se encontró un APK firmado, compatible y menor de 100 MiB.");
  return null;
}

function writeCatalog(apps) {
  fs.writeFileSync(catalogPath, `window.APP_CATALOG = ${JSON.stringify(apps, null, 2)};\n`, "utf8");
  const builds = apps.reduce((sum, app) => sum + app.versions.length, 0);
  let html = fs.readFileSync(indexPath, "utf8");
  html = html.replace(/(<dt id="app-count">)\d+(<\/dt>)/, `$1${String(apps.length).padStart(2, "0")}$2`);
  html = html.replace(/(<dt id="build-count">)\d+(<\/dt>)/, `$1${String(builds).padStart(2, "0")}$2`);
  fs.writeFileSync(indexPath, html, "utf8");
}

function validateCatalog(apps) {
  const errors = [];
  for (const app of apps) {
    for (const version of app.versions) {
      const apkPath = path.join(storeRoot, version.apk);
      if (!fs.existsSync(apkPath)) errors.push(`Falta ${version.apk}`);
      else if (sha256(apkPath) !== version.sha256) errors.push(`SHA incorrecto en ${version.apk}`);
    }
    for (const asset of [app.icon, ...app.screenshots.map((shot) => shot.src)]) {
      if (!fs.existsSync(path.join(storeRoot, asset))) errors.push(`Falta ${asset}`);
    }
  }
  if (errors.length) throw new Error(`Catálogo inválido:\n- ${errors.join("\n- ")}`);
}

function publish(options) {
  const status = run("git", ["status", "--porcelain", "--untracked-files=all"]);
  const outsideStore = status.split(/\r?\n/).filter(Boolean).filter((line) => {
    const changedPath = line.slice(3).replace(/^"|"$/g, "").replaceAll("\\", "/");
    return !changedPath.startsWith("app-store/");
  });
  if (outsideStore.length) {
    throw new Error(`Hay cambios fuera de app-store; no se publicará para evitar mezclarlos:\n${outsideStore.join("\n")}`);
  }
  run("git", ["add", "--", "app-store"]);
  const staged = run("git", ["diff", "--cached", "--quiet"], { allowFailure: true });
  const branch = run("git", ["branch", "--show-current"]);
  if (staged.status === 1) {
    const message = options.message || `chore(app-store): update Android builds ${isoLocalDate(new Date())}`;
    run("git", ["commit", "-m", message]);
    console.log(`Commit creado: ${message}`);
  } else if (staged.status === 0) console.log("No había cambios nuevos que confirmar.");
  else throw new Error(`No se pudo comprobar el área de staging: ${staged.stderr?.trim() || `código ${staged.status}`}`);
  run("git", ["push", "origin", branch]);
  console.log(`Publicado en origin/${branch}.`);
}

const options = parseArguments(process.argv.slice(2));
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));
const apps = loadCatalog();
const buildTools = findBuildTools();
const selectedSources = options.apps.length ? sources.filter((source) => options.apps.includes(source.id)) : sources;
const unknownIds = options.apps.filter((id) => !sources.some((source) => source.id === id));
if (unknownIds.length) throw new Error(`Apps no configuradas: ${unknownIds.join(", ")}`);

const updates = [];
for (const source of selectedSources) {
  const app = apps.find((item) => item.id === source.id);
  if (!app) { console.warn(`[${source.id}] no existe en el catálogo; se omite.`); continue; }
  console.log(`[${app.name}] buscando APK...`);
  const candidate = chooseCandidate(source, app, buildTools);
  if (!candidate) continue;
  if (app.versions.some((version) => version.sha256 === candidate.hash)) {
    console.log(`  = Ya está actualizado (${candidate.metadata.versionName}, ${candidate.hash.slice(0, 8)}).`);
    continue;
  }
  const currentDate = app.versions[0]?.isoDate ? new Date(`${app.versions[0].isoDate}T00:00:00`) : null;
  if (currentDate && candidate.stat.mtime < currentDate) {
    console.warn(`  ! Se omite un APK anterior al build publicado (${isoLocalDate(candidate.stat.mtime)} < ${app.versions[0].isoDate}).`);
    continue;
  }

  const date = candidate.stat.mtime;
  const isoDate = isoLocalDate(date);
  const channel = `${candidate.metadata.buildType}${candidate.metadata.testOnly ? " · ADB" : ""}`;
  const baseName = `${safeSegment(app.id)}-${safeSegment(candidate.metadata.versionName)}-${candidate.metadata.versionCode}-${isoDate.replaceAll("-", "")}-${candidate.metadata.buildType.toLowerCase()}.apk`;
  let relativeApk = path.posix.join("apks", app.id, baseName);
  let destination = path.join(storeRoot, ...relativeApk.split("/"));
  if (fs.existsSync(destination) && sha256(destination) !== candidate.hash) {
    const extension = path.extname(baseName);
    relativeApk = path.posix.join("apks", app.id, `${path.basename(baseName, extension)}-${candidate.hash.slice(0, 8).toLowerCase()}${extension}`);
    destination = path.join(storeRoot, ...relativeApk.split("/"));
  }

  const version = {
    version: candidate.metadata.versionName,
    code: candidate.metadata.versionCode,
    date: spanishDate(date),
    isoDate,
    size: formatSize(candidate.stat.size),
    channel,
    apk: relativeApk,
    sha256: candidate.hash,
    changes: changelog(source.projectRoot, app.versions[0]?.isoDate)
  };
  updates.push({ app, source: candidate.apkPath, destination, version });
  console.log(`  + ${version.version} (${version.date}, ${version.size}, ${channel})`);
}

if (options.dryRun) {
  console.log(`Simulación terminada: ${updates.length} actualización(es) pendiente(s).`);
  process.exit(0);
}

for (const update of updates) {
  fs.mkdirSync(path.dirname(update.destination), { recursive: true });
  fs.copyFileSync(update.source, update.destination);
  update.app.versions.unshift(update.version);
}
if (updates.length) writeCatalog(apps);
validateCatalog(apps);
console.log(`Catálogo válido: ${apps.length} apps y ${apps.reduce((sum, app) => sum + app.versions.length, 0)} builds.`);
if (options.publish) publish(options);
else console.log("Cambios locales listos. Usa -Publish en el script PowerShell para hacer commit y push.");
