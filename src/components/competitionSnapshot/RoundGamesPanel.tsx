import { TeamMark } from"./shared";
import { MAX_SIMULATION_SCORE } from"./utils";

export function RoundGamesPanel({
  matches,
  simulationView = false,
  simulations = {},
  roundIndex = 0,
  roundCount = 1,
  onPreviousRound,
  onNextRound,
  onScoreChange,
}) {
  const roundLabel = simulationView ? (matches[0]?.round ??"Rodada simulada") :"Próximos jogos";
  const scopeLabel = simulationView ? `Todos os ${matches.length} jogos da rodada` :"Jogos do Amazonas";
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
            <article className={`border-b border-paper/8 px-5 last:border-b-0 ${simulationView ?"py-3" :"py-4"}`} key={match.id}>
              <div className={`${simulationView ?"mb-2" :"mb-3"} flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42`}>
                <span className="truncate">{match.venue ||"Local a confirmar"}</span>
                <span className="shrink-0 text-yellow">{match.round}</span>
              </div>
              <p className={`${simulationView ?"mb-2" :"mb-3"} text-center text-[11px] font-extrabold uppercase tracking-[0.08em] text-paper/64`}>
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
                      value={score.homeGoals ??""}
                      onChange={(event) => onScoreChange?.(match.id,"homeGoals", event.target.value)}
                    />
                    <span className="text-center text-[10px] font-extrabold text-paper/36">x</span>
                    <input
                      aria-label={`Gols do ${match.away}`}
                      className="h-8 w-[30px] rounded-[4px] border border-paper/16 bg-black/44 text-center text-sm font-extrabold text-paper outline-none transition focus:border-yellow"
                      inputMode="numeric"
                      max={MAX_SIMULATION_SCORE}
                      min="0"
                      type="number"
                      value={score.awayGoals ??""}
                      onChange={(event) => onScoreChange?.(match.id,"awayGoals", event.target.value)}
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
