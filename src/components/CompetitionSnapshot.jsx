import { useState } from "react";
import { assets } from "../data/club.js";
import { recentSerieCResults, serieCStandings, serieCStatus, upcomingSerieC } from "../data/competition.generated.js";
import { MotionSection } from "./MotionSection.jsx";

const teamCode = (name) =>
  name
    .split(/[\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

function TeamMark({ name, logo = "", compact = false }) {
  const [failed, setFailed] = useState(false);
  const isAmazonas = name === "Amazonas";
  const source = failed ? "" : isAmazonas ? assets.logo : logo;
  const size = compact ? "h-7 w-7" : "h-8 w-8";
  const imageSize = compact ? "h-5 w-5" : "h-6 w-6";

  return (
    <span className={`flex ${size} shrink-0 items-center justify-center border ${isAmazonas ? "border-yellow/40 bg-yellow/10" : "border-paper/12 bg-paper/[0.04]"}`}>
      {source ? (
        <img className={`${imageSize} object-contain`} src={source} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="display text-base text-paper/66">{teamCode(name)}</span>
      )}
    </span>
  );
}

function FixtureCard({ match }) {
  const amazonasHome = match.home === "Amazonas";
  const [day, month] = match.date.split(" ");

  return (
    <article className="group overflow-hidden border border-paper/12 bg-paper/[0.035] transition duration-300 hover:-translate-y-0.5 hover:border-yellow/60">
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

function StandingsTable() {
  return (
    <div className="overflow-hidden border border-paper/12 bg-paper/[0.035]">
      <div className="flex items-center justify-between border-b border-paper/12 bg-paper/[0.06] px-3 py-2.5">
        <span className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-yellow">Série C</span>
        <span className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-paper/48">Atualizado {serieCStatus.updatedAt}</span>
      </div>
      <div className="grid grid-cols-[30px_1fr_28px_28px_28px_34px_34px] border-b border-paper/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.06em] text-paper/44">
        <span>#</span>
        <span>Equipe</span>
        <span>J</span>
        <span>V</span>
        <span>E</span>
        <span>SG</span>
        <span>Pts</span>
      </div>
      {serieCStandings.map((team) => {
        const active = team.team === "Amazonas";

        return (
          <div
            className={`grid grid-cols-[30px_1fr_28px_28px_28px_34px_34px] items-center px-3 py-2.5 text-xs font-extrabold ${active ? "bg-yellow text-black" : "border-b border-paper/8 text-paper/76"}`}
            key={team.team}
          >
            <span>{team.rank}</span>
            <span className="flex min-w-0 items-center gap-2">
              <TeamMark compact name={team.team} logo={team.logo} />
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
          {upcomingSerieC.map((match) => (
            <FixtureCard match={match} key={match.id} />
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
          <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-black/62">Posição atual</span>
          <div className="mt-3 flex items-end justify-between gap-4">
            <strong className="display text-6xl leading-none">{serieCStatus.position}</strong>
            <div className="text-right text-[11px] font-extrabold uppercase leading-5 text-black/64">
              <p>{serieCStatus.points} pontos</p>
              <p>{serieCStatus.record}</p>
              <p>SG {serieCStatus.goalDiff}</p>
            </div>
          </div>
        </div>
        <StandingsTable />
      </aside>
    </MotionSection>
  );
}
