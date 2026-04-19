export const MAX_SIMULATION_SCORE = 20;

export const teamCode = (name) =>
  name
    .split(/[\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const signed = (value) => (value > 0 ? `+${value}` : String(value));

export const cleanScore = (value) => {
  if (value ==="") return"";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return"";
  return String(Math.max(0, Math.min(MAX_SIMULATION_SCORE, Math.trunc(parsed))));
};

export const hasCompleteScore = (score) =>
  score?.homeGoals !== undefined &&
  score?.awayGoals !== undefined &&
  score.homeGoals !=="" &&
  score.awayGoals !=="";

function sortStandings(table) {
  return [...table]
    .map((team) => ({
      ...team,
      goalDiff: team.goalsFor - team.goalsAgainst,
      diff: signed(team.goalsFor - team.goalsAgainst),
    }))
    .sort((a, b) =>
      b.points - a.points ||
      b.wins - a.wins ||
      b.goalDiff - a.goalDiff ||
      b.goalsFor - a.goalsFor ||
      a.team.localeCompare(b.team,"pt-BR"),
    )
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
}

function ensureSimulationTeam(teamMap, match, side) {
  const name = match[side];
  if (!teamMap.has(name)) {
    teamMap.set(name, {
      rank: 0,
      team: name,
      logo: match[`${side}Logo`] ??"",
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  }

  return teamMap.get(name);
}

export function applySimulations(baseTable, matches, simulations) {
  const table = baseTable.map((team) => ({ ...team }));
  const teamMap = new Map(table.map((team) => [team.team, team]));

  for (const match of matches) {
    const score = simulations[match.id];
    if (!hasCompleteScore(score)) continue;

    const homeGoals = Number(score.homeGoals);
    const awayGoals = Number(score.awayGoals);
    if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals)) continue;

    const home = ensureSimulationTeam(teamMap, match,"home");
    const away = ensureSimulationTeam(teamMap, match,"away");

    home.played += 1;
    away.played += 1;
    home.goalsFor += homeGoals;
    home.goalsAgainst += awayGoals;
    away.goalsFor += awayGoals;
    away.goalsAgainst += homeGoals;

    if (homeGoals > awayGoals) {
      home.wins += 1;
      home.points += 3;
      away.losses += 1;
    } else if (homeGoals < awayGoals) {
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

  return sortStandings(teamMap.values());
}

export function getEfficiency(team) {
  const maxPoints = team.played * 3;
  if (!maxPoints) return 0;
  return Math.round((team.points / maxPoints) * 100);
}

export function getRecentForm(team) {
  return [
    ...Array.from({ length: team.wins }, () =>"V"),
    ...Array.from({ length: team.draws }, () =>"E"),
    ...Array.from({ length: team.losses }, () =>"D"),
  ].slice(0, 3);
}

export function getNextOpponent(teamName, matches) {
  const match = matches.find((item) => item.home === teamName || item.away === teamName);
  if (!match) return null;

  const isHome = match.home === teamName;
  return {
    name: isHome ? match.away : match.home,
    logo: isHome ? match.awayLogo : match.homeLogo,
    side: isHome ?"Casa" :"Fora",
  };
}

export function groupMatchesByRound(matches) {
  const groups = [];
  const indexes = new Map();

  for (const match of matches) {
    const label = match.round ||"Rodada";
    if (!indexes.has(label)) {
      indexes.set(label, groups.length);
      groups.push({ label, matches: [] });
    }

    groups[indexes.get(label)].matches.push(match);
  }

  return groups;
}

export function isAmazonasScorer(scorer) {
  return /amazonas/i.test(scorer.club);
}

export function displayPlayerName(name) {
  return String(name ??"")
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|\s|[-'])(\p{L})/gu, (match) => match.toLocaleUpperCase("pt-BR"));
}
