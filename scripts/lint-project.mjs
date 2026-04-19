import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const scanTargets = ["src", "scripts", "tests"];
const scanExtensions = new Set([".ts", ".tsx", ".mjs"]);
const allowDangerousInnerHtml = new Set([
  path.join(repoRoot, "src/components/SiteLoader.tsx"),
]);

async function collectFiles(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
      continue;
    }

    if (scanExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

function findAnchorTags(source) {
  return source.match(/<a\b[\s\S]*?>/g) ?? [];
}

function hasDangerousInnerHtmlUsage(source) {
  return /\bdangerouslySetInnerHTML\s*=/.test(source);
}

function hasInsecureHref(source) {
  return /href\s*=\s*["']http:\/\//.test(source);
}

const issues = [];
const scannedFiles = [];

for (const target of scanTargets) {
  const directory = path.join(repoRoot, target);
  scannedFiles.push(...(await collectFiles(directory)));
}

for (const filePath of scannedFiles) {
  const source = await readFile(filePath, "utf8");
  const anchors = findAnchorTags(source);

  for (const tag of anchors) {
    if (tag.includes('target="_blank"') && !/rel=\{[^}]*\}|rel="[^"]+"/.test(tag)) {
      issues.push(`${relative(filePath)}: anchor with target="_blank" is missing rel="noreferrer"`);
    }
  }

  if (hasDangerousInnerHtmlUsage(source) && !allowDangerousInnerHtml.has(filePath)) {
    issues.push(`${relative(filePath)}: dangerouslySetInnerHTML is only allowed in src/components/SiteLoader.tsx`);
  }

  if (hasInsecureHref(source)) {
    issues.push(`${relative(filePath)}: insecure http:// URL found`);
  }
}

if (issues.length > 0) {
  console.error("Project lint failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Project lint passed across ${scannedFiles.length} source files.`);
