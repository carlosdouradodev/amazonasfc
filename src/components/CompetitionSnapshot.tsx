import { useMemo, useState } from"react";
import {
  competitionSource,
  serieCFullStandings,
  serieCSimulationMatches,
  serieCStatus,
  serieCTopScorers,
  upcomingSerieC,
} from"../data/competition.generated";
import { MotionSection } from"./MotionSection";
import { RoundGamesPanel } from"./competitionSnapshot/RoundGamesPanel";
import { StandingsTable } from"./competitionSnapshot/StandingsTable";
import { TopScorersSection } from"./competitionSnapshot/TopScorersSection";
import { applySimulations, cleanScore, groupMatchesByRound, hasCompleteScore } from"./competitionSnapshot/utils";

const HOUR = 60 * 60 * 1000;
const STALE_AFTER_HOURS = 36;
const OUTDATED_AFTER_HOURS = 72;

function formatScrapedAt(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone:"America/Manaus",
    day:"2-digit",
    month:"short",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit",
  }).format(new Date(value));
}

function getCompetitionHealth(scrapedAt) {
  const parsedAt = Date.parse(scrapedAt);

  if (Number.isNaN(parsedAt)) {
    return {
      tone:"warning",
      label:"Integridade pendente",
      message:"O timestamp da raspagem é inválido. Revise a geração do arquivo antes de confiar no dado.",
    };
  }

  const ageHours = (Date.now() - parsedAt) / HOUR;

  if (ageHours >= OUTDATED_AFTER_HOURS) {
    return {
      tone:"warning",
      label:"Dado desatualizado",
      message: `Raspagem com ${Math.round(ageHours)}h de idade. Tabela, agenda e artilharia podem divergir do oficial.`,
    };
  }

  if (ageHours >= STALE_AFTER_HOURS) {
    return {
      tone:"attention",
      label:"Atualização recomendada",
      message: `Raspagem com ${Math.round(ageHours)}h de idade. Vale rodar o scraper antes de publicar serviço de jogo.`,
    };
  }

  return {
    tone:"ok",
    label:"Dado recente",
    message: `Última raspagem em ${formatScrapedAt(scrapedAt)} (Manaus).`,
  };
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
  const simulationView = simulationOpen || (viewMode ==="simulation" && simulationActive);
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
  const dataHealth = useMemo(() => getCompetitionHealth(competitionSource.scrapedAt), []);
  const showDebug = typeof window !=="undefined" && (import.meta.env.DEV || new URLSearchParams(window.location.search).has("debug"));
  const standingsRows = simulationView ? simulatedStandings : serieCFullStandings;
  const amazonasStatus = simulationView
    ? simulatedStandings.find((team) => team.team ==="Amazonas")
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

      if ((next[matchId].homeGoals ??"") ==="" && (next[matchId].awayGoals ??"") ==="") {
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

      <div
        className={`mb-8 rounded-[8px] border px-4 py-4 ${
          dataHealth.tone ==="ok"
            ?"border-field-soft/38 bg-field/18"
            : dataHealth.tone ==="attention"
              ?"border-yellow/28 bg-yellow/10"
              :"border-red-500/30 bg-red-500/10"
        }`}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">{dataHealth.label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-paper/72">{dataHealth.message}</p>
          </div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/42">
            resultados {competitionSource.parsedResults} / esperados {competitionSource.expectedResults}
          </p>
        </div>

        {showDebug ? (
          <details className="mt-4 border-t border-paper/10 pt-4">
            <summary className="cursor-pointer text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/56">
              Origem e integridade
            </summary>
            <div className="mt-4 grid gap-3 text-[11px] font-semibold leading-6 text-paper/66 md:grid-cols-2">
              <p>Raspado em: {competitionSource.scrapedAt}</p>
              <p>Feed completo: {competitionSource.fullResultsFeedName}</p>
              <p>Fixtures parseadas: {competitionSource.parsedFixtures}</p>
              <p>Resultados parseados: {competitionSource.parsedResults}</p>
              <p>Próximos eventos Sofascore: {competitionSource.resolvedSofascoreVenues}</p>
              <p>Venues resolvidos: {competitionSource.resolvedFixtureVenues}</p>
              <a className="text-yellow hover:text-yellow-soft" href={competitionSource.fixturesUrl} target="_blank" rel="noreferrer">
                Fonte fixtures
              </a>
              <a className="text-yellow hover:text-yellow-soft" href={competitionSource.resultsUrl} target="_blank" rel="noreferrer">
                Fonte resultados
              </a>
            </div>
          </details>
        ) : null}
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
                {simulationView ?"Posição simulada" :"Posição atual"}
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
            simulationMatches={serieCSimulationMatches}
            simulationOpen={simulationOpen}
            simulationView={simulationView}
            statusUpdatedAt={serieCStatus.updatedAt}
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

      <TopScorersSection scorers={serieCTopScorers} topScorersUrl={competitionSource.topScorersUrl} />
    </MotionSection>
  );
}
