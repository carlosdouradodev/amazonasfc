import { useMemo, useState } from "react";
import { assets, officialLinks } from "../data/club.js";
import {
  competitionSource,
  recentSerieCResults,
  serieCFullStandings,
  serieCSimulationMatches,
  serieCStandings,
  serieCStatus,
  serieCTopScorers,
  upcomingSerieC,
} from "../data/competition.generated.js";
import { MotionSection } from "./MotionSection.jsx";

const MAX_SIMULATION_SCORE = 20;

const teamCode = (name) =>
  name
    .split(/[\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const signed = (value) => (value > 0 ? `+${value}` : String(value));

const cleanScore = (value) => {
  if (value === "") return "";
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return "";
  return String(Math.max(0, Math.min(MAX_SIMULATION_SCORE, Math.trunc(parsed))));
};

const hasCompleteScore = (score) =>
  score?.homeGoals !== undefined &&
  score?.awayGoals !== undefined &&
  score.homeGoals !== "" &&
  score.awayGoals !== "";

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
      a.team.localeCompare(b.team, "pt-BR"),
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
      logo: match[`${side}Logo`] ?? "",
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

function applySimulations(baseTable, matches, simulations) {
  const table = baseTable.map((team) => ({ ...team }));
  const teamMap = new Map(table.map((team) => [team.team, team]));

  for (const match of matches) {
    const score = simulations[match.id];
    if (!hasCompleteScore(score)) continue;

    const homeGoals = Number(score.homeGoals);
    const awayGoals = Number(score.awayGoals);
    if (!Number.isFinite(homeGoals) || !Number.isFinite(awayGoals)) continue;

    const home = ensureSimulationTeam(teamMap, match, "home");
    const away = ensureSimulationTeam(teamMap, match, "away");

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

function TeamMark({ name, logo = "", compact = false, active = false }) {
  const [failed, setFailed] = useState(false);
  const isAmazonas = name === "Amazonas";
  const source = failed ? "" : isAmazonas ? assets.logo : logo;
  const size = compact ? "h-7 w-7" : "h-8 w-8";
  const imageSize = compact ? "h-5 w-5" : "h-6 w-6";
  const tileClass = active
    ? "border-black/20 bg-black/82 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]"
    : "border-paper/14 bg-[#d8c46a]/15";

  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-[8px] border ${tileClass}`}>
      {source ? (
        <img className={`${imageSize} object-contain`} src={source} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className={`display text-base ${active ? "text-paper/78" : "text-paper/66"}`}>{teamCode(name)}</span>
      )}
    </span>
  );
}

function FixtureCard({ match, featured = false }) {
  const amazonasHome = match.home === "Amazonas";
  const [day, month] = match.date.split(" ");

  return (
    <article className={`group overflow-hidden rounded-[8px] border transition duration-300 hover:-translate-y-0.5 hover:border-yellow/60 ${featured ? "border-yellow/50 bg-yellow/10 shadow-[0_24px_80px_rgba(245,196,0,.14)]" : "border-paper/12 bg-paper/[0.035]"}`}>
      <div className="grid grid-cols-[58px_1fr]">
        <div className="flex flex-col justify-between bg-yellow px-3 py-4 text-black">
          <span className="display text-3xl leading-none">{day}</span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.08em]">{month}</span>
        </div>
        <div className="grid min-w-0 gap-3 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <TeamMark name={match.home} logo={match.homeLogo} />
            <span className="display min-w-0 truncate text-[clamp(27px,2.6vw,34px)] leading-[0.9] text-paper">{match.home}</span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <TeamMark name={match.away} logo={match.awayLogo} />
            <span className="display min-w-0 truncate text-[clamp(27px,2.6vw,34px)] leading-[0.9] text-paper">{match.away}</span>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-1 border-t border-paper/10 pt-3 text-[10px] font-extrabold uppercase tracking-[0.07em] text-paper/58 sm:flex sm:flex-wrap sm:items-center">
            <span>{match.round || match.competition}</span>
            <span>{match.day}</span>
            <span>{match.time}</span>
            <span>{amazonasHome ? "Casa" : "Fora"}</span>
            <span className="col-span-2 min-w-0 break-words sm:col-span-1">{match.venue}</span>
            {featured ? (
              <a className="col-span-2 mt-2 inline-flex w-fit rounded-[8px] border border-yellow/40 bg-yellow px-3 py-2 text-black transition hover:bg-yellow-soft sm:col-span-1 sm:mt-0" href={officialLinks.ingressos} target="_blank" rel="noreferrer">
                Comprar ingresso
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function RoundGamesPanel({
  matches,
  simulationView = false,
  simulations = {},
  roundIndex = 0,
  roundCount = 1,
  onPreviousRound,
  onNextRound,
  onScoreChange,
}) {
  const roundLabel = simulationView ? (matches[0]?.round ?? "Rodada simulada") : "Próximos jogos";
  const scopeLabel = simulationView ? `Todos os ${matches.length} jogos da rodada` : "Jogos do Amazonas";
  const canPreviousRound = simulationView && roundIndex > 0;
  const canNextRound = simulationView && roundIndex < roundCount - 1;

  return (
    <aside className="overflow-hidden rounded-[8px] border border-paper/12 bg-paper/[0.035] shadow-[0_20px_70px_rgba(0,0,0,.18)]">
      <div className="flex items-center justify-between border-b border-paper/10 bg-paper/[0.06] px-5 py-4">
        <div>
          <h3 className="display text-[34px] leading-none text-paper">Jogos</h3>
          <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-yellow">{scopeLabel}</p>
        </div>
        {simulationView ? (
          <div className="grid grid-cols-[32px_auto_32px] items-center overflow-hidden rounded-[8px] border border-yellow/20 bg-yellow/10">
            <button
              aria-label="Rodada anterior"
              className="h-10 border-r border-yellow/15 text-lg font-black text-yellow transition hover:bg-yellow hover:text-black disabled:cursor-not-allowed disabled:text-paper/24 disabled:hover:bg-transparent disabled:hover:text-paper/24"
              disabled={!canPreviousRound}
              type="button"
              onClick={onPreviousRound}
            >
              ‹
            </button>
            <span className="px-3 text-center text-[10px] font-extrabold uppercase tracking-[0.12em] text-yellow">
              {roundLabel}
            </span>
            <button
              aria-label="Próxima rodada"
              className="h-10 border-l border-yellow/15 text-lg font-black text-yellow transition hover:bg-yellow hover:text-black disabled:cursor-not-allowed disabled:text-paper/24 disabled:hover:bg-transparent disabled:hover:text-paper/24"
              disabled={!canNextRound}
              type="button"
              onClick={onNextRound}
            >
              ›
            </button>
          </div>
        ) : (
          <span className="rounded-[8px] border border-yellow/20 bg-yellow/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-yellow">
            {roundLabel}
          </span>
        )}
      </div>

      <div>
        {matches.map((match) => {
          const score = simulations[match.id] ?? {};

          return (
          <article className={`border-b border-paper/8 px-5 last:border-b-0 ${simulationView ? "py-3" : "py-4"}`} key={match.id}>
            <div className={`${simulationView ? "mb-2" : "mb-3"} flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42`}>
              <span className="truncate">{match.venue || "Local a confirmar"}</span>
              <span className="shrink-0 text-yellow">{match.round}</span>
            </div>
            <p className={`${simulationView ? "mb-2" : "mb-3"} text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-paper/64`}>
              {match.date} | {match.day} | {match.time}
            </p>
            <div className="grid grid-cols-[minmax(104px,1fr)_auto_minmax(104px,1fr)] items-center gap-2">
              <div className="flex min-w-0 items-center justify-end gap-2">
                <span className="min-w-0 text-right text-[13px] font-extrabold uppercase leading-tight text-paper/76">{match.home}</span>
                <TeamMark compact name={match.home} logo={match.homeLogo} />
              </div>
              {simulationView ? (
                <div className="grid grid-cols-[30px_12px_30px] items-center gap-1">
                  <input
                    aria-label={`Gols do ${match.home}`}
                    className="h-8 w-[30px] rounded-[4px] border border-paper/16 bg-black/44 text-center text-sm font-extrabold text-paper outline-none transition focus:border-yellow"
                    inputMode="numeric"
                    max={MAX_SIMULATION_SCORE}
                    min="0"
                    type="number"
                    value={score.homeGoals ?? ""}
                    onChange={(event) => onScoreChange?.(match.id, "homeGoals", event.target.value)}
                  />
                  <span className="text-center text-[10px] font-extrabold text-paper/36">x</span>
                  <input
                    aria-label={`Gols do ${match.away}`}
                    className="h-8 w-[30px] rounded-[4px] border border-paper/16 bg-black/44 text-center text-sm font-extrabold text-paper outline-none transition focus:border-yellow"
                    inputMode="numeric"
                    max={MAX_SIMULATION_SCORE}
                    min="0"
                    type="number"
                    value={score.awayGoals ?? ""}
                    onChange={(event) => onScoreChange?.(match.id, "awayGoals", event.target.value)}
                  />
                </div>
              ) : (
                <span className="text-center text-[10px] font-extrabold text-paper/32">x</span>
              )}
              <div className="flex min-w-0 items-center gap-2">
                <TeamMark compact name={match.away} logo={match.awayLogo} />
                <span className="min-w-0 text-[13px] font-extrabold uppercase leading-tight text-paper/76">{match.away}</span>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </aside>
  );
}

function ResultCard({ match }) {
  const resultClass =
    match.outcome === "V"
      ? "bg-yellow text-black"
      : match.outcome === "E"
        ? "border-paper/28 text-paper"
        : "border-paper/16 text-paper/58";

  return (
    <article className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-[8px] border border-paper/10 bg-paper/[0.025] p-3">
      <span className={`flex h-9 w-9 items-center justify-center rounded-[8px] border text-sm font-extrabold ${resultClass}`}>{match.outcome}</span>
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-2">
          <TeamMark compact name={match.opponent} logo={match.opponentLogo} />
          <p className="truncate text-xs font-extrabold uppercase text-paper/76">{match.opponent}</p>
        </div>
        <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42">
          {match.date} | {match.side} | {match.round}
        </p>
      </div>
      <strong className="display text-3xl leading-none text-paper">{match.amazonasScore}</strong>
    </article>
  );
}

function getEfficiency(team) {
  const maxPoints = team.played * 3;
  if (!maxPoints) return 0;
  return Math.round((team.points / maxPoints) * 100);
}

function getRecentForm(team) {
  return [
    ...Array.from({ length: team.wins }, () => "V"),
    ...Array.from({ length: team.draws }, () => "E"),
    ...Array.from({ length: team.losses }, () => "D"),
  ].slice(0, 3);
}

function getNextOpponent(teamName) {
  const match = serieCSimulationMatches.find((item) => item.home === teamName || item.away === teamName);
  if (!match) return null;

  const isHome = match.home === teamName;
  return {
    name: isHome ? match.away : match.home,
    logo: isHome ? match.awayLogo : match.homeLogo,
    side: isHome ? "Casa" : "Fora",
  };
}

function groupMatchesByRound(matches) {
  const groups = [];
  const indexes = new Map();

  for (const match of matches) {
    const label = match.round || "Rodada";
    if (!indexes.has(label)) {
      indexes.set(label, groups.length);
      groups.push({ label, matches: [] });
    }

    groups[indexes.get(label)].matches.push(match);
  }

  return groups;
}

function FormPill({ result, active }) {
  const classes = {
    V: active ? "bg-black/75 text-yellow" : "bg-emerald-400 text-black",
    E: active ? "bg-black/35 text-paper" : "bg-paper/24 text-paper",
    D: active ? "bg-black/35 text-paper" : "bg-red-500 text-paper",
  };

  return (
    <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black ${classes[result]}`}>
      {result}
    </span>
  );
}

function NextOpponent({ opponent, active }) {
  if (!opponent) {
    return <span className={active ? "text-black/45" : "text-paper/34"}>-</span>;
  }

  return (
    <span className="flex items-center justify-center">
      <TeamMark active={active} compact name={opponent.name} logo={opponent.logo} />
    </span>
  );
}

function isAmazonasScorer(scorer) {
  return /amazonas/i.test(scorer.club);
}

function displayPlayerName(name) {
  return String(name ?? "")
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|\s|[-'])(\p{L})/gu, (match) => match.toLocaleUpperCase("pt-BR"));
}

function scorerImageSource(scorer) {
  if (scorer && isAmazonasScorer(scorer)) {
    if (/^nicolas$/i.test(scorer.player)) {
      return assets.nicolasCustomPhoto;
    }

    if (/^ronaldo$/i.test(scorer.player)) {
      return assets.ronaldoCustomPhoto;
    }
  }

  return scorer?.playerImage ?? "";
}

function PlayerPortrait({ scorer, className = "" }) {
  const [failed, setFailed] = useState(false);
  const source = failed ? "" : scorerImageSource(scorer);

  return (
    <div className={`overflow-hidden bg-paper/8 ${className}`}>
      {source ? (
        <img
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          src={source}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-black text-[11px] font-extrabold uppercase tracking-[0.14em] text-yellow">
          Amazonas
        </div>
      )}
    </div>
  );
}

function AmazonasScorerRow({ scorer, leader = false }) {
  return (
    <div className={`grid grid-cols-[36px_minmax(0,1fr)_42px] items-center gap-3 rounded-[8px] border px-3 py-2 ${leader ? "border-black/18 bg-black/10" : "border-black/10 bg-black/[0.04]"}`}>
      <PlayerPortrait scorer={scorer} className="h-9 w-9 rounded-[8px]" />
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold uppercase text-black">{displayPlayerName(scorer.player)}</p>
        <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-black/48">Amazonas</p>
      </div>
      <strong className="display text-right text-3xl leading-none text-black">{scorer.goals}</strong>
    </div>
  );
}

function ClubLogo({ scorer }) {
  const [failed, setFailed] = useState(false);
  const source = failed ? "" : scorer?.clubLogo;

  if (!source) {
    return <TeamMark compact name={scorer?.club ?? ""} logo="" />;
  }

  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-paper/14 bg-[#d8c46a]/15">
      <img alt="" className="h-5 w-5 object-contain" loading="lazy" src={source} onError={() => setFailed(true)} />
    </span>
  );
}

function TopScorersSection() {
  const amazonasScorers = serieCTopScorers.filter(isAmazonasScorer);
  const amazonasTopGoals = amazonasScorers.reduce((highest, scorer) => Math.max(highest, scorer.goals), 0);
  const amazonasLeaders = amazonasScorers.filter((scorer) => scorer.goals === amazonasTopGoals);
  const amazonasLeader = amazonasLeaders[0];
  const topList = serieCTopScorers.slice(0, 8);
  const serieCLeaderGoals = topList[0]?.goals ?? 0;

  if (!serieCTopScorers.length) return null;

  return (
    <section className="mt-10 border-t border-paper/12 pt-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Estatísticas</p>
          <h3 className="display text-[clamp(34px,4vw,56px)] leading-[0.9] text-paper">Artilharia.</h3>
        </div>
        <a
          className="hidden rounded-[8px] border border-paper/14 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-paper/62 transition hover:border-yellow hover:text-yellow md:inline-flex"
          href={competitionSource.topScorersUrl}
          rel="noreferrer"
          target="_blank"
        >
          CBF
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.22fr)_minmax(280px,0.78fr)]">
        <div className="overflow-hidden rounded-[8px] border border-paper/12 bg-paper/[0.035]">
          <div className="border-b border-paper/10 px-4 py-4">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">Artilharia Série C</p>
          </div>
          <div className="grid grid-cols-[42px_minmax(0,1fr)_56px_42px] border-b border-paper/10 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/44">
            <span>#</span>
            <span>Jogador</span>
            <span>Gols</span>
            <span>Clube</span>
          </div>
          {topList.map((scorer) => {
            const active = isAmazonasScorer(scorer);
            const isSerieCLeader = scorer.goals === serieCLeaderGoals;
            return (
              <div
                className={`grid grid-cols-[42px_minmax(0,1fr)_56px_42px] items-center border-b px-4 text-xs font-extrabold last:border-b-0 ${
                  active
                    ? "border-yellow/18 bg-yellow/75 py-3 text-black"
                    : isSerieCLeader
                      ? "border-yellow/16 bg-yellow/[0.08] py-4 text-paper"
                      : "border-paper/8 py-3 text-paper/76"
                }`}
                key={`${scorer.rank}-${scorer.player}`}
              >
                <span className={isSerieCLeader && !active ? "display text-2xl leading-none text-yellow" : ""}>{scorer.rank}</span>
                <span className="flex min-w-0 items-center gap-3">
                  <PlayerPortrait scorer={scorer} className={`${isSerieCLeader ? "h-11 w-11" : "h-9 w-9"} shrink-0 rounded-[8px]`} />
                  <span className={`truncate uppercase ${isSerieCLeader && !active ? "display text-[26px] leading-none text-paper" : ""}`}>
                    {displayPlayerName(scorer.player)}
                  </span>
                </span>
                <span className={`${active ? "text-black" : "text-yellow"} ${isSerieCLeader && !active ? "display text-3xl leading-none" : ""}`}>
                  {scorer.goals}
                </span>
                <ClubLogo scorer={scorer} />
              </div>
            );
          })}
        </div>

        {amazonasLeader ? (
          <article className="rounded-[8px] border border-yellow/30 bg-yellow p-5 text-black shadow-[0_24px_80px_rgba(245,196,0,.12)]">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-black/56">Artilheiro do Amazonas</p>
                <strong className="display mt-4 block text-[clamp(40px,4vw,58px)] uppercase leading-[0.82]">
                  {displayPlayerName(amazonasLeader.player)}
                </strong>
              </div>
              <PlayerPortrait scorer={amazonasLeader} className="h-24 w-24 shrink-0 rounded-[8px] border border-black/12" />
            </div>
            <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-black/12 pt-5">
              <div className="flex items-center gap-3">
                <ClubLogo scorer={amazonasLeader} />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-black/62">{amazonasLeader.club}</span>
              </div>
              <div className="text-right">
                <p className="display text-6xl leading-none">{amazonasLeader.goals}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-black/58">
                  {amazonasLeader.goals === 1 ? "Gol" : "Gols"}
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {amazonasLeaders.map((scorer) => (
                <AmazonasScorerRow key={`${scorer.rank}-${scorer.player}`} leader={scorer.player === amazonasLeader.player} scorer={scorer} />
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}

function StandingsTable({ rows, simulationOpen, simulationCount, simulationView, movements, onShowRealTable, onShowSimulation }) {
  const simulationSelected = simulationView || simulationOpen;

  return (
    <div className="overflow-hidden rounded-[8px] border border-paper/12 bg-paper/[0.035] shadow-[0_20px_70px_rgba(0,0,0,.18)]">
      <div className="grid gap-3 border-b border-paper/12 bg-paper/[0.06] px-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-yellow">Série C</span>
          <span className="ml-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42">
            {simulationView ? "Simulado" : `Atualizado ${serieCStatus.updatedAt}`}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 md:w-[360px]">
          <button
            className={`rounded-[8px] border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationView ? "border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow" : "border-yellow bg-yellow/60 text-black"}`}
            type="button"
            onClick={onShowRealTable}
          >
            Tabela real
          </button>
          <button
            className={`rounded-[8px] border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationSelected ? "border-yellow bg-yellow/60 text-black" : "border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow"}`}
            type="button"
            onClick={onShowSimulation}
          >
            Simular resultados{simulationCount > 0 ? ` (${simulationCount})` : ""}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="min-w-full">
          <div className="grid grid-cols-[28px_minmax(120px,1fr)_40px_30px_30px_30px_30px_36px_36px_38px_42px_76px_42px] border-b border-paper/10 px-3 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/44">
            <span>#</span>
            <span>Equipe</span>
            <span>PTS</span>
            <span>J</span>
            <span>V</span>
            <span>E</span>
            <span>D</span>
            <span>GP</span>
            <span>GC</span>
            <span>SG</span>
            <span>%</span>
            <span>Recentes</span>
            <span>Próx</span>
          </div>
          {rows.map((team) => {
            const active = team.team === "Amazonas";
            const movement = movements.get(team.team) ?? 0;
            const recentForm = getRecentForm(team);
            const nextOpponent = getNextOpponent(team.team);
            const isPromotionZone = team.rank <= 4;
            const isRelegationZone = team.rank > rows.length - 4;
            const rowClass = active
              ? "border-b border-yellow/25 bg-yellow/75 text-black"
              : isPromotionZone
                ? "border-b border-emerald-400/14 bg-emerald-500/[0.12] text-paper"
                : isRelegationZone
                  ? "border-b border-red-400/14 bg-red-500/[0.1] text-paper"
                  : "border-b border-paper/8 text-paper/76";
            const pointsClass = active ? "text-black" : isPromotionZone ? "text-emerald-300" : isRelegationZone ? "text-red-300" : "text-yellow";

            return (
              <div
                className={`grid grid-cols-[28px_minmax(120px,1fr)_40px_30px_30px_30px_30px_36px_36px_38px_42px_76px_42px] items-center px-3 py-3 text-xs font-extrabold ${rowClass}`}
                key={team.team}
              >
                <span className="flex items-center gap-1">
                  <span>{team.rank}</span>
                  {movement !== 0 ? (
                    <span className={`text-[9px] ${active ? "text-black/54" : movement > 0 ? "text-yellow" : "text-paper/38"}`}>
                      {movement > 0 ? `+${movement}` : movement}
                    </span>
                  ) : null}
                </span>
                <span className="flex min-w-0 items-center gap-2">
                  <TeamMark active={active} compact name={team.team} logo={team.logo} />
                  <span className="truncate uppercase">{team.team}</span>
                </span>
                <span className={pointsClass}>{team.points}</span>
                <span>{team.played}</span>
                <span>{team.wins}</span>
                <span>{team.draws}</span>
                <span>{team.losses}</span>
                <span>{team.goalsFor}</span>
                <span>{team.goalsAgainst}</span>
                <span>{team.diff}</span>
                <span>{getEfficiency(team)}</span>
                <span className="flex items-center gap-1">
                  {recentForm.length ? recentForm.map((result, index) => <FormPill active={active} key={`${team.team}-${result}-${index}`} result={result} />) : "-"}
                </span>
                <NextOpponent active={active} opponent={nextOpponent} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-paper/10 px-4 py-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/44">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          Acesso Série B
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          Rebaixamento Série D
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-black text-black">V</span>
          Vitória
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-paper/40 text-[8px] font-black text-paper">E</span>
          Empate
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-black text-paper">D</span>
          Derrota
        </span>
      </div>
    </div>
  );
}

export function CompetitionSnapshot() {
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [viewMode, setViewMode] = useState("real");
  const [simulationRoundIndex, setSimulationRoundIndex] = useState(0);
  const [simulations, setSimulations] = useState({});
  const simulationRounds = useMemo(() => groupMatchesByRound(serieCSimulationMatches), []);
  const selectedSimulationRoundIndex = Math.min(simulationRoundIndex, Math.max(simulationRounds.length - 1, 0));
  const selectedSimulationRound = simulationRounds[selectedSimulationRoundIndex] ?? { matches: serieCSimulationMatches };
  const completedSimulationCount = useMemo(
    () => Object.values(simulations).filter(hasCompleteScore).length,
    [simulations],
  );
  const simulationActive = completedSimulationCount > 0;
  const simulationView = simulationOpen || (viewMode === "simulation" && simulationActive);
  const simulatedStandings = useMemo(
    () => applySimulations(serieCFullStandings, serieCSimulationMatches, simulations),
    [simulations],
  );
  const baseRanks = useMemo(
    () => new Map(serieCFullStandings.map((team) => [team.team, team.rank])),
    [],
  );
  const movementMap = useMemo(() => {
    if (!simulationView) return new Map();
    return new Map(simulatedStandings.map((team) => [team.team, (baseRanks.get(team.team) ?? team.rank) - team.rank]));
  }, [baseRanks, simulatedStandings, simulationView]);
  const standingsRows = simulationView ? simulatedStandings : serieCFullStandings;
  const amazonasStatus = simulationView
    ? simulatedStandings.find((team) => team.team === "Amazonas")
    : null;
  const status = amazonasStatus
    ? {
        position: `${amazonasStatus.rank}º`,
        points: amazonasStatus.points,
        record: `${amazonasStatus.wins}V ${amazonasStatus.draws}E ${amazonasStatus.losses}D`,
        goalDiff: amazonasStatus.diff,
      }
    : serieCStatus;

  function setSimulationScore(matchId, field, value) {
    const nextValue = cleanScore(value);
    setSimulations((current) => {
      const next = {
        ...current,
        [matchId]: {
          ...current[matchId],
          [field]: nextValue,
        },
      };

      if ((next[matchId].homeGoals ?? "") === "" && (next[matchId].awayGoals ?? "") === "") {
        delete next[matchId];
      }

      return next;
    });
  }

  function showRealTable() {
    setViewMode("real");
    setSimulationOpen(false);
  }

  function showSimulation() {
    setViewMode("simulation");
    setSimulationOpen(true);
  }

  function previousSimulationRound() {
    setSimulationRoundIndex((current) => Math.max(0, current - 1));
  }

  function nextSimulationRound() {
    setSimulationRoundIndex((current) => Math.min(simulationRounds.length - 1, current + 1));
  }

  return (
    <MotionSection className="section-shell py-14">
      <div className="mb-8 flex items-center justify-between border-b border-paper/12 pb-5">
        <span className="display text-4xl leading-none text-paper/24">‹</span>
        <h2 className="text-center text-xl font-extrabold uppercase tracking-[0.14em] text-paper">Primeira fase</h2>
        <span className="display text-4xl leading-none text-yellow">›</span>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-start">
        <section className="min-w-0">
          <div className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Série C 2026</p>
            <h2 className="display text-[clamp(40px,5vw,70px)] leading-[0.88]">Tabela.</h2>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-paper/58">
              Tabela do primeiro ao último, com jogos, vitórias, empates, derrotas, gols e saldo.
            </p>
          </div>
          <div className="rounded-[8px] border border-yellow/40 bg-yellow p-4 text-black shadow-[0_20px_70px_rgba(242,195,25,.12)]">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-black/62">
              {simulationView ? "Posição simulada" : "Posição atual"}
            </span>
            <div className="mt-3 flex items-end justify-between gap-4">
              <strong className="display text-6xl leading-none">{status.position}</strong>
              <div className="text-right text-[11px] font-extrabold uppercase leading-5 text-black/64">
                <p>{status.points} pontos</p>
                <p>{status.record}</p>
                <p>SG {status.goalDiff}</p>
              </div>
            </div>
          </div>
        </div>
        <StandingsTable
          movements={movementMap}
          rows={standingsRows}
          simulationCount={completedSimulationCount}
          simulationOpen={simulationOpen}
          simulationView={simulationView}
          onShowRealTable={showRealTable}
          onShowSimulation={showSimulation}
        />
      </section>

        <RoundGamesPanel
          matches={simulationView ? selectedSimulationRound.matches : upcomingSerieC}
          roundCount={simulationRounds.length}
          roundIndex={selectedSimulationRoundIndex}
          simulations={simulations}
          simulationView={simulationView}
          onNextRound={nextSimulationRound}
          onPreviousRound={previousSimulationRound}
          onScoreChange={setSimulationScore}
        />
      </div>

      <TopScorersSection />
    </MotionSection>
  );
}
