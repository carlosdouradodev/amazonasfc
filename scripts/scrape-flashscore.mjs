import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEAM_ID = "zk9LAfeq";
const AMAZONAS = "Amazonas";
const TIME_ZONE = "America/Sao_Paulo";
const OUTPUT_PATH = "src/data/competition.generated.js";
const LOGO_OUTPUT_PATH = "public/team-logos";
const LOGO_PUBLIC_PATH = "/team-logos";
const TEAM_FIXTURES_URL = "https://www.flashscore.com/team/amazonas/zk9LAfeq/fixtures/";
const SERIE_C_RESULTS_URL = "https://www.flashscore.com/football/brazil/serie-c/results/";
const FLASHSCORE_FEED_URL = "https://www.flashscore.com/x/feed";
const LOGO_BASE_URL = "https://static.flashscore.com/res/image/data";

const NAME_FIXES = new Map([
  ["Anapolis", "Anápolis"],
  ["Botafogo PB", "Botafogo-PB"],
  ["Confianca", "Confiança"],
  ["Ferroviaria", "Ferroviária"],
  ["Maranhao", "Maranhão"],
  ["Maringa FC", "Maringá"],
  ["Paysandu PA", "Paysandu"],
  ["SER Caxias", "Caxias"],
  ["Ypiranga FC", "Ypiranga-RS"],
]);

const MONTHS = new Map([
  ["jan.", "jan"],
  ["fev.", "fev"],
  ["mar.", "mar"],
  ["abr.", "abr"],
  ["mai.", "mai"],
  ["jun.", "jun"],
  ["jul.", "jul"],
  ["ago.", "ago"],
  ["set.", "set"],
  ["out.", "out"],
  ["nov.", "nov"],
  ["dez.", "dez"],
]);

function normalizeTeam(name) {
  return NAME_FIXES.get(name) ?? name;
}

function signed(value) {
  return value > 0 ? `+${value}` : String(value);
}

function titleDate(date) {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "short",
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const rawMonth = parts.find((part) => part.type === "month")?.value.toLowerCase() ?? "";
  return `${day} ${MONTHS.get(rawMonth) ?? rawMonth.replace(".", "")}`;
}

function weekDay(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIME_ZONE,
    weekday: "long",
  }).format(date);
}

function matchTime(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date).replace(":", "h");
}

function updatedAt(date) {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIME_ZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).formatToParts(date);
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const rawMonth = parts.find((part) => part.type === "month")?.value.toLowerCase() ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";
  return `${day} ${MONTHS.get(rawMonth) ?? rawMonth.replace(".", "")} ${year}`;
}

function roundLabel(value) {
  const match = String(value ?? "").match(/\d+/);
  return match ? `${match[0]}ª rodada` : String(value ?? "");
}

function competitionLabel(value) {
  return String(value ?? "")
    .replace(/^BRAZIL:\s*/i, "")
    .replace(/\s+-\s+First stage$/i, "")
    .trim();
}

function logoFile(value) {
  const file = String(value ?? "").trim().replace(/^\/?res\/image\/data\//, "");
  return file ? file.replace(/[^A-Za-z0-9._-]/g, "") : "";
}

function logoUrl(value) {
  const file = logoFile(value);
  return file ? `${LOGO_PUBLIC_PATH}/${file}` : "";
}

function logoFileFromPublicPath(value) {
  const match = String(value ?? "").match(/\/team-logos\/([^/?#]+)/);
  return match ? match[1] : "";
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Flashscore returned ${response.status} for ${url}`);
  }

  return response.text();
}

async function fetchFlashscoreFeed(feedName, feedSign, referer) {
  const response = await fetch(`${FLASHSCORE_FEED_URL}/${feedName}`, {
    headers: {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "referer": referer,
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      "x-fsign": feedSign,
    },
  });

  if (!response.ok) {
    throw new Error(`Flashscore feed returned ${response.status} for ${feedName}`);
  }

  return response.text();
}

async function downloadLogo(file, outputDir) {
  const response = await fetch(`${LOGO_BASE_URL}/${file}`, {
    headers: {
      "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "referer": "https://www.flashscore.com/",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Logo download failed: ${file} returned ${response.status}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outputDir, file), bytes);
}

async function downloadLogos({ fixtures, results, standings, repoRoot }) {
  const files = new Set();

  for (const match of fixtures) {
    const homeFile = logoFileFromPublicPath(match.homeLogo);
    const awayFile = logoFileFromPublicPath(match.awayLogo);
    if (homeFile) files.add(homeFile);
    if (awayFile) files.add(awayFile);
  }

  for (const match of results) {
    const homeFile = logoFileFromPublicPath(match.homeLogo);
    const awayFile = logoFileFromPublicPath(match.awayLogo);
    if (homeFile) files.add(homeFile);
    if (awayFile) files.add(awayFile);
  }

  for (const team of standings) {
    const file = logoFileFromPublicPath(team.logo);
    if (file) files.add(file);
  }

  const outputDir = path.join(repoRoot, LOGO_OUTPUT_PATH);
  await mkdir(outputDir, { recursive: true });
  await Promise.all([...files].map((file) => downloadLogo(file, outputDir)));

  return files.size;
}

function extractInitialFeed(html, feedName) {
  const markerIndex = findInitialFeedIndex(html, feedName);
  if (markerIndex < 0) {
    throw new Error(`Missing Flashscore feed: ${feedName}`);
  }

  const dataMarker = "data: `";
  const dataIndex = html.indexOf(dataMarker, markerIndex);
  if (dataIndex < 0) {
    throw new Error(`Missing data block for Flashscore feed: ${feedName}`);
  }

  const start = dataIndex + dataMarker.length;
  const end = html.indexOf("`,", start);
  if (end < 0) {
    throw new Error(`Unterminated data block for Flashscore feed: ${feedName}`);
  }

  return html.slice(start, end);
}

function findInitialFeedIndex(html, feedName) {
  const doubleQuoted = html.indexOf(`cjs.initialFeeds["${feedName}"]`);
  if (doubleQuoted >= 0) {
    return doubleQuoted;
  }

  return html.indexOf(`cjs.initialFeeds['${feedName}']`);
}

function extractInitialFeedInfo(html, feedName) {
  const markerIndex = findInitialFeedIndex(html, feedName);
  if (markerIndex < 0) {
    return {};
  }

  const dataMarker = "data: `";
  const dataIndex = html.indexOf(dataMarker, markerIndex);
  if (dataIndex < 0) {
    return {};
  }

  const dataEnd = html.indexOf("`,", dataIndex + dataMarker.length);
  const blockEnd = html.indexOf("}", dataEnd);
  const block = html.slice(dataEnd, blockEnd > dataEnd ? blockEnd : dataEnd + 500);

  return {
    allEventsCount: Number(block.match(/allEventsCount:\s*(\d+)/)?.[1] ?? 0),
    seasonId: block.match(/seasonId:\s*(\d+)/)?.[1] ?? "",
  };
}

function extractResultsFeedMeta(html, feedName) {
  const initialInfo = extractInitialFeedInfo(html, feedName);

  return {
    allEventsCount: initialInfo.allEventsCount,
    seasonId: initialInfo.seasonId,
    countryId: html.match(/country_id\s*=\s*(\d+)/)?.[1] ?? html.match(/"country_id":\s*(\d+)/)?.[1] ?? "",
    tournamentId: html.match(/tournament_id\s*=\s*"([^"]+)"/)?.[1] ?? html.match(/"tournament_id":\s*"([^"]+)"/)?.[1] ?? "",
    timezone: html.match(/default_tz\s*=\s*(-?\d+)/)?.[1] ?? "2",
    lang: html.match(/<html lang="([^"]+)"/)?.[1] ?? "en",
    projectId: html.match(/project_id\s*=\s*(\d+)/)?.[1] ?? html.match(/"project_id":\s*"?(\d+)/)?.[1] ?? "2",
    feedSign: html.match(/"feed_sign":"([^"]+)"/)?.[1] ?? "SW9D1eZo",
  };
}

function buildFullResultsFeedName(meta) {
  if (!meta.seasonId || !meta.countryId || !meta.tournamentId) {
    return "";
  }

  return `tr_${[
    1,
    meta.countryId,
    meta.tournamentId,
    meta.seasonId,
    "0",
    meta.timezone,
    meta.lang,
    meta.projectId,
  ].join("_")}`;
}

async function loadCompleteResults(resultsHtml) {
  const feedName = findInitialFeedIndex(resultsHtml, "results") >= 0 ? "results" : "summary-results";
  const initialFeed = extractInitialFeed(resultsHtml, feedName);
  const initialResults = parseResults(initialFeed);
  const meta = extractResultsFeedMeta(resultsHtml, feedName);
  const fullResultsFeedName = buildFullResultsFeedName(meta);

  if (!meta.allEventsCount || initialResults.length >= meta.allEventsCount || !fullResultsFeedName) {
    return {
      results: initialResults,
      expectedResults: meta.allEventsCount || initialResults.length,
      fullResultsFetched: false,
      fullResultsFeedName,
    };
  }

  const fullFeed = await fetchFlashscoreFeed(fullResultsFeedName, meta.feedSign, SERIE_C_RESULTS_URL);
  const fullResults = parseResults(fullFeed);

  return {
    results: fullResults.length >= initialResults.length ? fullResults : initialResults,
    expectedResults: meta.allEventsCount,
    fullResultsFetched: fullResults.length >= initialResults.length,
    fullResultsFeedName,
  };
}

function parseFeedRecords(feed) {
  const records = [];
  let currentCompetition = "";

  for (const record of feed.split("¬~")) {
      const parsed = {};
      for (const token of record.split("¬")) {
        const separator = token.indexOf("÷");
        if (separator > 0) {
          parsed[token.slice(0, separator)] = token.slice(separator + 1);
        }
      }

      if (parsed.ZA) {
        currentCompetition = competitionLabel(parsed.ZA);
      }

      if (parsed.AA) {
        records.push({
          ...parsed,
          _competition: currentCompetition,
        });
      }
  }

  return records;
}

function parseFixtures(feed) {
  return parseFeedRecords(feed)
    .filter((record) => record.AD && record.AE && record.AF)
    .map((record) => {
      const date = new Date(Number(record.AD) * 1000);
      const home = normalizeTeam(record.AE);
      const away = normalizeTeam(record.AF);

      return {
        id: record.AA,
        timestamp: Number(record.AD),
        competition: record._competition,
        round: roundLabel(record.ER) || record._competition,
        date: titleDate(date),
        day: weekDay(date),
        time: matchTime(date),
        home,
        away,
        homeLogo: logoUrl(record.OA),
        awayLogo: logoUrl(record.OB),
        venue: "A confirmar",
        city: "",
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);
}

function parseResults(feed) {
  return parseFeedRecords(feed)
    .filter((record) => record.AD && record.AE && record.AF && record.AG !== undefined && record.AH !== undefined)
    .map((record) => ({
      id: record.AA,
      timestamp: Number(record.AD),
      round: roundLabel(record.ER),
      home: normalizeTeam(record.AE),
      away: normalizeTeam(record.AF),
      homeLogo: logoUrl(record.OA),
      awayLogo: logoUrl(record.OB),
      homeGoals: Number(record.AG),
      awayGoals: Number(record.AH),
    }))
    .filter((match) => Number.isFinite(match.homeGoals) && Number.isFinite(match.awayGoals));
}

function ensureTeam(table, team, logo = "") {
  if (!table.has(team)) {
    table.set(team, {
      team,
      logo,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  }

  const current = table.get(team);
  if (!current.logo && logo) {
    current.logo = logo;
  }

  return current;
}

function computeStandings(results) {
  const table = new Map();

  for (const match of results) {
    const home = ensureTeam(table, match.home, match.homeLogo);
    const away = ensureTeam(table, match.away, match.awayLogo);

    home.played += 1;
    away.played += 1;
    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;
    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;

    if (match.homeGoals > match.awayGoals) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (match.homeGoals < match.awayGoals) {
      away.wins += 1;
      away.points += 3;
      home.losses += 1;
    } else {
      home.draws += 1;
      away.draws += 1;
      home.points += 1;
      away.points += 1;
    }
  }

  return [...table.values()]
    .map((team) => ({
      ...team,
      goalDiff: team.goalsFor - team.goalsAgainst,
    }))
    .sort((a, b) =>
      b.points - a.points ||
      b.wins - a.wins ||
      b.goalDiff - a.goalDiff ||
      b.goalsFor - a.goalsFor ||
      a.team.localeCompare(b.team, "pt-BR"),
    )
    .map((team, index) => ({
      rank: index + 1,
      team: team.team,
      logo: team.logo,
      played: team.played,
      wins: team.wins,
      draws: team.draws,
      losses: team.losses,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      diff: signed(team.goalDiff),
      points: team.points,
    }));
}

function buildStatus(standings, now) {
  const amazonas = standings.find((team) => team.team === AMAZONAS);
  if (!amazonas) {
    throw new Error("Amazonas missing from computed Serie C standings");
  }

  return {
    updatedAt: updatedAt(now),
    position: `${amazonas.rank}º`,
    points: amazonas.points,
    record: `${amazonas.wins}V ${amazonas.draws}E ${amazonas.losses}D`,
    goals: `${amazonas.goalsFor}:${amazonas.goalsAgainst}`,
    goalDiff: amazonas.diff,
  };
}

function buildRecentResults(results) {
  return results
    .filter((match) => match.home === AMAZONAS || match.away === AMAZONAS)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((match) => {
      const isHome = match.home === AMAZONAS;
      const amazonasGoals = isHome ? match.homeGoals : match.awayGoals;
      const opponentGoals = isHome ? match.awayGoals : match.homeGoals;
      const opponent = isHome ? match.away : match.home;
      const opponentLogo = isHome ? match.awayLogo : match.homeLogo;
      const outcome = amazonasGoals > opponentGoals ? "V" : amazonasGoals < opponentGoals ? "D" : "E";
      const date = new Date(match.timestamp * 1000);

      return {
        id: match.id,
        timestamp: match.timestamp,
        competition: "Serie C",
        round: match.round || "Serie C",
        date: titleDate(date),
        day: weekDay(date),
        home: match.home,
        away: match.away,
        homeLogo: match.homeLogo,
        awayLogo: match.awayLogo,
        homeGoals: match.homeGoals,
        awayGoals: match.awayGoals,
        opponent,
        opponentLogo,
        side: isHome ? "Casa" : "Fora",
        score: `${match.homeGoals} x ${match.awayGoals}`,
        amazonasScore: `${amazonasGoals} x ${opponentGoals}`,
        outcome,
      };
    });
}

function toModule({ source, status, standings, fixtures, simulationFixtures, recentResults }) {
  return `// Generated by npm run scrape:flashscore. Do not edit by hand.
export const competitionSource = ${JSON.stringify(source, null, 2)};

export const serieCStatus = ${JSON.stringify(status, null, 2)};

export const serieCStandings = ${JSON.stringify(standings.slice(0, 8), null, 2)};

export const serieCFullStandings = ${JSON.stringify(standings, null, 2)};

export const upcomingSerieC = ${JSON.stringify(fixtures.slice(0, 6), null, 2)};

export const serieCSimulationMatches = ${JSON.stringify(simulationFixtures.slice(0, 10), null, 2)};

export const recentSerieCResults = ${JSON.stringify(recentResults.slice(0, 3), null, 2)};
`;
}

async function main() {
  const [fixturesHtml, resultsHtml] = await Promise.all([
    fetchHtml(TEAM_FIXTURES_URL),
    fetchHtml(SERIE_C_RESULTS_URL),
  ]);

  const fixtures = parseFixtures(extractInitialFeed(fixturesHtml, "summary-fixtures"));
  const simulationFeedName = findInitialFeedIndex(resultsHtml, "fixtures") >= 0 ? "fixtures" : "summary-fixtures";
  const simulationFixtures = parseFixtures(extractInitialFeed(resultsHtml, simulationFeedName))
    .filter((match) => match.competition === "Serie C");
  const {
    results,
    expectedResults,
    fullResultsFetched,
    fullResultsFeedName,
  } = await loadCompleteResults(resultsHtml);
  const standings = computeStandings(results);
  const recentResults = buildRecentResults(results);
  const now = new Date();
  const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

  if (fixtures.length === 0) {
    throw new Error("No fixtures parsed from Flashscore");
  }

  if (results.length === 0) {
    throw new Error("No results parsed from Flashscore");
  }

  const downloadedLogos = await downloadLogos({ fixtures, results, standings, repoRoot });

  const output = toModule({
    source: {
      scrapedAt: now.toISOString(),
      fixturesUrl: TEAM_FIXTURES_URL,
      resultsUrl: SERIE_C_RESULTS_URL,
      fullResultsFeedName,
      teamId: TEAM_ID,
      parsedFixtures: fixtures.length,
      parsedSimulationFixtures: simulationFixtures.length,
      parsedResults: results.length,
      expectedResults,
      fullResultsFetched,
      parsedAmazonasResults: recentResults.length,
      downloadedLogos,
    },
    status: buildStatus(standings, now),
    standings,
    fixtures,
    simulationFixtures,
    recentResults,
  });

  const outputPath = path.join(repoRoot, OUTPUT_PATH);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, "utf8");

  console.log(`Flashscore scrape ok: ${fixtures.length} fixtures, ${results.length}/${expectedResults} results, ${downloadedLogos} logos`);
  console.log(`Updated ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
