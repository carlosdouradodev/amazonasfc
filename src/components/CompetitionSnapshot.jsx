import { useMemo, useState } from "react";
import { assets, officialLinks } from "../data/club.js";
import {
  recentSerieCResults,
  serieCFullStandings,
  serieCSimulationMatches,
  serieCStandings,
  serieCStatus,
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
    <span className={`flex ${size} shrink-0 items-center justify-center border ${tileClass}`}>
      {source ? (
        <img className={`${imageSize} object-contain`} src={source} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className={`display text-base ${active ? "text-paper/78" : "text-paper/66"}`}>{teamCode(name)}</span>
      )}
    </span>
  );
}

function SimulationPanel({ matches, simulations, completedCount, onScoreChange, onQuickPick, onReset }) {
  return (
    <div className="border-x border-b border-paper/12 bg-black/24">
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-3 py-3">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-yellow">Simulador</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.06em] text-paper/44">
            {completedCount} de {matches.length} jogos preenchidos
          </p>
        </div>
        <button
          className="border border-paper/14 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/62 transition hover:border-yellow hover:text-yellow"
          type="button"
          onClick={onReset}
        >
          Limpar
        </button>
      </div>

      <div className="max-h-[430px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {matches.map((match) => {
          const score = simulations[match.id] ?? {};

          return (
            <div className="border-b border-paper/8 px-3 py-3 last:border-b-0" key={match.id}>
              <div className="mb-2 flex items-center justify-between gap-3 text-[9px] font-extrabold uppercase tracking-[0.08em] text-paper/40">
                <span>{match.round}</span>
                <span>{match.date} | {match.time}</span>
              </div>
              <div className="grid grid-cols-[1fr_40px_14px_40px_1fr] items-center gap-2">
                <span className="truncate text-right text-[11px] font-extrabold uppercase text-paper/72">{match.home}</span>
                <input
                  aria-label={`Gols do ${match.home}`}
                  className="h-9 w-10 border border-paper/16 bg-black/38 text-center text-sm font-extrabold text-paper outline-none transition focus:border-yellow"
                  inputMode="numeric"
                  max={MAX_SIMULATION_SCORE}
                  min="0"
                  type="number"
                  value={score.homeGoals ?? ""}
                  onChange={(event) => onScoreChange(match.id, "homeGoals", event.target.value)}
                />
                <span className="text-center text-[10px] font-extrabold text-paper/36">x</span>
                <input
                  aria-label={`Gols do ${match.away}`}
                  className="h-9 w-10 border border-paper/16 bg-black/38 text-center text-sm font-extrabold text-paper outline-none transition focus:border-yellow"
                  inputMode="numeric"
                  max={MAX_SIMULATION_SCORE}
                  min="0"
                  type="number"
                  value={score.awayGoals ?? ""}
                  onChange={(event) => onScoreChange(match.id, "awayGoals", event.target.value)}
                />
                <span className="truncate text-[11px] font-extrabold uppercase text-paper/72">{match.away}</span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1">
                <button className="border border-paper/10 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-paper/48 transition hover:border-yellow hover:text-yellow" type="button" onClick={() => onQuickPick(match.id, 1, 0)}>
                  Casa
                </button>
                <button className="border border-paper/10 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-paper/48 transition hover:border-yellow hover:text-yellow" type="button" onClick={() => onQuickPick(match.id, 1, 1)}>
                  Empate
                </button>
                <button className="border border-paper/10 px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.06em] text-paper/48 transition hover:border-yellow hover:text-yellow" type="button" onClick={() => onQuickPick(match.id, 0, 1)}>
                  Fora
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FixtureCard({ match, featured = false }) {
  const amazonasHome = match.home === "Amazonas";
  const [day, month] = match.date.split(" ");

  return (
    <article className={`group overflow-hidden border transition duration-300 hover:-translate-y-0.5 hover:border-yellow/60 ${featured ? "border-yellow/50 bg-yellow/10 shadow-[0_24px_80px_rgba(245,196,0,.14)]" : "border-paper/12 bg-paper/[0.035]"}`}>
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
              <a className="col-span-2 mt-2 inline-flex w-fit border border-yellow/40 bg-yellow px-3 py-2 text-black transition hover:bg-yellow-soft sm:col-span-1 sm:mt-0" href={officialLinks.ingressos} target="_blank" rel="noreferrer">
                Comprar ingresso
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
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
    <article className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border border-paper/10 bg-paper/[0.025] p-3">
      <span className={`flex h-9 w-9 items-center justify-center border text-sm font-extrabold ${resultClass}`}>{match.outcome}</span>
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

function StandingsTable({ rows, simulationOpen, simulationCount, simulationView, movements, onShowRealTable, onShowSimulation }) {
  const simulationSelected = simulationView || simulationOpen;

  return (
    <div className="overflow-hidden border border-paper/12 bg-paper/[0.035]">
      <div className="grid gap-3 border-b border-paper/12 bg-paper/[0.06] px-3 py-2.5">
        <div className="min-w-0">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-yellow">Série C</span>
          <span className="ml-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42">
            {simulationView ? "Simulado" : `Atualizado ${serieCStatus.updatedAt}`}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={`border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationView ? "border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow" : "border-yellow bg-yellow/60 text-black"}`}
            type="button"
            onClick={onShowRealTable}
          >
            Tabela real
          </button>
          <button
            className={`border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationSelected ? "border-yellow bg-yellow/60 text-black" : "border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow"}`}
            type="button"
            onClick={onShowSimulation}
          >
            Simular resultados{simulationCount > 0 ? ` (${simulationCount})` : ""}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[34px_1fr_28px_28px_28px_34px_34px] border-b border-paper/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.06em] text-paper/44">
        <span>#</span>
        <span>Equipe</span>
        <span>J</span>
        <span>V</span>
        <span>E</span>
        <span>SG</span>
        <span>Pts</span>
      </div>
      {rows.map((team) => {
        const active = team.team === "Amazonas";
        const movement = movements.get(team.team) ?? 0;

        return (
          <div
            className={`grid grid-cols-[34px_1fr_28px_28px_28px_34px_34px] items-center px-3 py-2.5 text-xs font-extrabold ${active ? "border-b border-yellow/20 bg-yellow/75 text-black" : "border-b border-paper/8 text-paper/76"}`}
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
            <span>{team.played}</span>
            <span>{team.wins}</span>
            <span>{team.draws}</span>
            <span>{team.diff}</span>
            <span>{team.points}</span>
          </div>
        );
      })}
    </div>
  );
}

export function CompetitionSnapshot() {
  const [simulationOpen, setSimulationOpen] = useState(false);
  const [viewMode, setViewMode] = useState("real");
  const [simulations, setSimulations] = useState({});
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
  const standingsRows = simulationView ? simulatedStandings.slice(0, 8) : serieCStandings;
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

  function setQuickSimulation(matchId, homeGoals, awayGoals) {
    setSimulations((current) => ({
      ...current,
      [matchId]: {
        homeGoals: String(homeGoals),
        awayGoals: String(awayGoals),
      },
    }));
  }

  function showRealTable() {
    setViewMode("real");
    setSimulationOpen(false);
  }

  function showSimulation() {
    setViewMode("simulation");
    setSimulationOpen(true);
  }

  return (
    <MotionSection className="section-shell grid gap-8 py-14 lg:grid-cols-[1.34fr_0.66fr] lg:items-start">
      <div>
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Calendário</p>
            <h2 className="display text-[clamp(40px,5vw,58px)] leading-[0.9]">Próximos jogos.</h2>
          </div>
          <p className="max-w-xs text-xs font-semibold leading-5 text-paper/58">
            Calendário do Amazonas. Horários de Brasília, com partidas ainda sujeitas a alteração.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {upcomingSerieC.map((match, index) => (
            <FixtureCard featured={index === 0} match={match} key={match.id} />
          ))}
        </div>
        {recentSerieCResults.length > 0 ? (
          <div className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">Forma recente</p>
                <h3 className="display text-3xl leading-none text-paper">Últimos resultados.</h3>
              </div>
              <span className="text-right text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/40">Série C</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {recentSerieCResults.map((match) => (
                <ResultCard match={match} key={match.id} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <aside className="lg:sticky lg:top-28">
        <div className="mb-4 border border-yellow/40 bg-yellow p-4 text-black">
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
        <StandingsTable
          movements={movementMap}
          rows={standingsRows}
          simulationCount={completedSimulationCount}
          simulationOpen={simulationOpen}
          simulationView={simulationView}
          onShowRealTable={showRealTable}
          onShowSimulation={showSimulation}
        />
        {simulationOpen ? (
          <SimulationPanel
            completedCount={completedSimulationCount}
            matches={serieCSimulationMatches}
            simulations={simulations}
            onQuickPick={setQuickSimulation}
            onReset={() => setSimulations({})}
            onScoreChange={setSimulationScore}
          />
        ) : null}
      </aside>
    </MotionSection>
  );
}
