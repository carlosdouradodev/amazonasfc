import { FormPill, NextOpponent, TeamMark } from"./shared";
import { getEfficiency, getNextOpponent, getRecentForm } from"./utils";

export function StandingsTable({
  rows,
  simulationOpen,
  simulationCount,
  simulationMatches,
  simulationView,
  movements,
  onShowRealTable,
  onShowSimulation,
  statusUpdatedAt,
}) {
  const simulationSelected = simulationView || simulationOpen;

  return (
    <div className="overflow-hidden rounded-[8px] border border-paper/12 bg-paper/[0.035] shadow-[0_20px_70px_rgba(0,0,0,.18)]">
      <div className="grid gap-3 border-b border-paper/12 bg-paper/[0.06] px-4 py-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-yellow">Série C</span>
          <span className="ml-3 text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/42">
            {simulationView ?"Simulado" : `Atualizado ${statusUpdatedAt}`}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 md:w-[360px]">
          <button
            className={`rounded-[8px] border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationView ?"border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow" :"border-yellow bg-yellow/60 text-black"}`}
            type="button"
            onClick={onShowRealTable}
          >
            Tabela real
          </button>
          <button
            className={`rounded-[8px] border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em] transition ${simulationSelected ?"border-yellow bg-yellow/60 text-black" :"border-paper/14 text-paper/62 hover:border-yellow hover:text-yellow"}`}
            type="button"
            onClick={onShowSimulation}
          >
            Simular resultados{simulationCount > 0 ? ` (${simulationCount})` :""}
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
            const active = team.team ==="Amazonas";
            const movement = movements.get(team.team) ?? 0;
            const recentForm = getRecentForm(team);
            const nextOpponent = getNextOpponent(team.team, simulationMatches);
            const isPromotionZone = team.rank <= 4;
            const isRelegationZone = team.rank > rows.length - 4;
            const rowClass = active
              ?"border-b border-yellow/25 bg-yellow/75 text-black"
              : isPromotionZone
                ?"border-b border-emerald-400/14 bg-emerald-500/[0.12] text-paper"
                : isRelegationZone
                  ?"border-b border-red-400/14 bg-red-500/[0.1] text-paper"
                  :"border-b border-paper/8 text-paper/76";
            const pointsClass = active ?"text-black" : isPromotionZone ?"text-emerald-300" : isRelegationZone ?"text-red-300" :"text-yellow";

            return (
              <div
                className={`grid grid-cols-[28px_minmax(120px,1fr)_40px_30px_30px_30px_30px_36px_36px_38px_42px_76px_42px] items-center px-3 py-3 text-xs font-extrabold ${rowClass}`}
                key={team.team}
              >
                <span className="flex items-center gap-1">
                  <span>{team.rank}</span>
                  {movement !== 0 ? (
                    <span className={`text-[9px] ${active ?"text-black/54" : movement > 0 ?"text-yellow" :"text-paper/38"}`}>
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
                  {recentForm.length ? recentForm.map((result, index) => <FormPill active={active} key={`${team.team}-${result}-${index}`} result={result} />) :"-"}
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
