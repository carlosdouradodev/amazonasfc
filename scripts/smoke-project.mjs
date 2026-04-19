import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const requiredFiles = [
  ".nvmrc",
  "index.html",
  "package.json",
  "tsconfig.json",
  "vite.config.ts",
  "src/App.tsx",
  "src/main.tsx",
  "src/vite-env.d.ts",
  "src/lib/routes.ts",
  "src/data/club.ts",
  "src/data/news.ts",
  "src/data/membership.ts",
  "src/data/store.ts",
  "src/data/history.ts",
  "src/data/competition.generated.js",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/MatchPulseBar.tsx",
  "src/pages/HomePage.tsx",
  "src/pages/MatchdayPage.tsx",
  "src/pages/NewsPage.tsx",
  "src/pages/SquadPage.tsx",
  "src/pages/MembershipPage.tsx",
  "src/pages/StorePage.tsx",
  "src/pages/HistoryPage.tsx",
  "src/pages/SectionPage.tsx",
  "src/pages/NotFoundPage.tsx",
  "tests/routes.test.ts",
  "tests/scrape-flashscore.test.ts",
  ".github/workflows/ci.yml",
  "public/favicon.png",
  "public/404.html",
  "public/_redirects",
];

const expectedScripts = [
  "build",
  "preview",
  "scrape:flashscore",
  "watch:flashscore",
  "verify:runtime",
  "lint",
  "smoke",
  "typecheck",
  "test",
  "check",
];

const expectedRoutes = [
  "/",
  "/noticias",
  "/elenco",
  "/socio",
  "/loja",
  "/matchday",
  "/historia",
  "/clube/historia",
  "/clube/simbolos",
  "/clube/titulos",
  "/clube/curiosidades",
  "/futebol/profissional",
  "/futebol/base",
  "/institucional/estatuto",
  "/institucional/transparencia",
  "/institucional/comercial",
  "/institucional/imprensa",
];

const generatedExports = [
  "competitionSource",
  "serieCStatus",
  "serieCStandings",
  "serieCFullStandings",
  "upcomingSerieC",
  "serieCSimulationMatches",
  "serieCTopScorers",
  "recentSerieCResults",
];

const competitionSourceFields = [
  "scrapedAt",
  "fixturesUrl",
  "resultsUrl",
  "topScorersUrl",
  "expectedResults",
  "parsedResults",
];

const assetImportPattern = /from\s*["']([^"']+\.(?:png|jpe?g|webp|avif|svg)(?:\?raw)?)["']/g;
const issues = [];

function relative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll("\\", "/");
}

async function ensureFileExists(filePath) {
  try {
    await access(path.join(repoRoot, filePath));
  } catch {
    issues.push(`Missing required file: ${filePath}`);
  }
}

for (const filePath of requiredFiles) {
  await ensureFileExists(filePath);
}

const packageJson = JSON.parse(
  await readFile(path.join(repoRoot, "package.json"), "utf8"),
);

for (const scriptName of expectedScripts) {
  if (!packageJson.scripts?.[scriptName]) {
    issues.push(`package.json is missing script "${scriptName}"`);
  }
}

const appSource = await readFile(path.join(repoRoot, "src/App.tsx"), "utf8");
for (const route of expectedRoutes) {
  if (!appSource.includes(`"${route}"`)) {
    issues.push(`src/App.tsx is missing expected route "${route}"`);
  }
}

const generatedSource = await readFile(
  path.join(repoRoot, "src/data/competition.generated.js"),
  "utf8",
);

for (const exportName of generatedExports) {
  if (!generatedSource.includes(`export const ${exportName} =`)) {
    issues.push(`competition.generated.js is missing export "${exportName}"`);
  }
}

for (const fieldName of competitionSourceFields) {
  if (!generatedSource.includes(`"${fieldName}"`)) {
    issues.push(`competition.generated.js is missing competitionSource field "${fieldName}"`);
  }
}

const sourceFiles = [
  "src/App.tsx",
  "src/main.tsx",
  "src/data/club.ts",
  "src/components/Header.tsx",
  "src/components/Footer.tsx",
  "src/components/SiteLoader.tsx",
  "src/pages/HomePage.tsx",
  "src/pages/HistoryPage.tsx",
];

for (const sourceFile of sourceFiles) {
  const absolutePath = path.join(repoRoot, sourceFile);
  const source = await readFile(absolutePath, "utf8");
  const imports = [...source.matchAll(assetImportPattern)];

  for (const match of imports) {
    const rawImport = match[1];
    const importPath = rawImport.replace(/\?raw$/, "");
    const resolvedPath = path.resolve(path.dirname(absolutePath), importPath);

    try {
      await access(resolvedPath);
    } catch {
      issues.push(`${sourceFile} references missing asset ${relative(resolvedPath)}`);
    }
  }
}

const teamLogosDir = path.join(repoRoot, "public/team-logos");
try {
  const logos = await readdir(teamLogosDir);
  if (logos.length === 0) {
    issues.push("public/team-logos is empty");
  }
} catch {
  issues.push("public/team-logos is missing");
}

if (issues.length > 0) {
  console.error("Smoke checks failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(
  [
    "Smoke checks passed.",
    `Verified ${requiredFiles.length} required files, ${expectedRoutes.length} routes, ${generatedExports.length} generated exports, and baseline asset references.`,
  ].join(" "),
);
