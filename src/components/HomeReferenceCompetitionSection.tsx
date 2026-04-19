import { useRef } from"react";
import { motion, useScroll, useTransform } from"framer-motion";
import { MotionSection } from"./MotionSection";
import { assets } from"../data/club";
import { serieCStandings, serieCStatus, upcomingSerieC } from"../data/competition.generated";

function AccentTitle({ children }) {
  return (
    <h2 className="flex items-center gap-3 text-2xl font-bold uppercase leading-none text-paper md:text-[40px]">
      <span className="h-8 w-1 rounded-full bg-yellow" />
      <span>{children}</span>
    </h2>
  );
}

function TeamLogo({ name, logo, compact = false }) {
  const isAmazonas = name ==="Amazonas";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[8px] border ${
        isAmazonas ?"border-black/10 bg-black/78 shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]" :"border-paper/10 bg-paper/[0.04]"
      } ${
        compact ?"h-8 w-8" :"h-10 w-10"
      }`}
      aria-hidden="true"
      title={name}
    >
      <img
        className={compact ?"h-5 w-5 object-contain" :"h-6 w-6 object-contain"}
        src={logo}
        alt=""
        loading="lazy"
      />
    </span>
  );
}

function MatchCard({ match }) {
  const amazonasHome = match.home ==="Amazonas";
  const competition = (match.competition || match.round ||"Serie C").toUpperCase();
  const locationLabel =
    match.venue && match.venue !=="A confirmar"
      ? [match.venue, match.city].filter(Boolean).join(" /")
      : match.city
        ? match.city
        :"Local a confirmar";

  return (
    <article className="group rounded-[8px] border border-paper/10 bg-[#1b1b1b]/92 px-6 py-6 backdrop-blur-[2px] transition-all duration-300 hover:border-yellow/40 hover:shadow-[0_18px_48px_rgba(242,195,25,.08)]">
      <div className="grid gap-5 md:grid-cols-[72px_minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-[72px] text-center">
          <div className="rounded-[8px] bg-yellow px-3 py-2 text-sm font-black uppercase text-black">
            {match.date.toUpperCase()}
          </div>
          <div className="mt-2 text-xs text-paper/44">{match.time}</div>
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 text-[18px] font-bold uppercase leading-none md:text-[20px]">
          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className={`truncate text-right ${amazonasHome ?"text-yellow" :"text-paper"}`}>{match.home}</div>
            <TeamLogo logo={match.homeLogo} name={match.home} />
          </div>
          <div className="text-paper/22">VS</div>
          <div className="flex min-w-0 items-center gap-3">
            <TeamLogo logo={match.awayLogo} name={match.away} />
            <div className={`truncate ${amazonasHome ?"text-paper" :"text-yellow"}`}>{match.away}</div>
          </div>
        </div>

        <div className="md:justify-self-end">
          <span className="inline-flex w-fit rounded-full bg-paper/[0.05] px-4 py-2 text-xs uppercase tracking-[0.06em] text-paper/38">
            {competition}
          </span>
        </div>

        <div className="md:col-start-2 md:col-end-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-paper/38">{locationLabel}</p>
        </div>
      </div>
    </article>
  );
}

function StandingsRow({ team }) {
  const highlighted = team.rank <= 4;
  const isAmazonas = team.team ==="Amazonas";

  return (
    <div
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b px-4 py-4 last:border-b-0 ${
        isAmazonas ?"border-yellow/10 bg-yellow/[0.14]" :"border-paper/8"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
            highlighted ?"bg-yellow text-black" :"bg-paper/[0.05] text-paper/44"
          }`}
        >
          {team.rank}
        </span>
        <TeamLogo compact logo={team.logo} name={team.team} />
        <span className="truncate text-sm font-semibold uppercase text-paper">{team.team}</span>
      </div>
      <div />
      <div className="flex items-center justify-end gap-4 text-sm font-black">
        <span className="w-8 text-right text-yellow">{team.points}</span>
        <span className="w-8 text-right text-paper/72">{team.wins}</span>
        <span className="w-10 text-right text-paper/72">{team.diff}</span>
      </div>
    </div>
  );
}

export function HomeReferenceCompetitionSection() {
  const sectionRef = useRef(null);
  const visibleMatches = upcomingSerieC.slice(0, 5);
  const visibleStandings = serieCStandings.slice(0, 8);
  const seasonYear = serieCStatus.updatedAt.match(/\d{4}$/)?.[0] ??"2026";
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end","end start"],
  });
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.1, 0.18, 0.82, 0.9, 1], [0, 0, 1, 1, 0, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-x-hidden py-20 lg:py-24">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-[84px] z-0 hidden h-[calc(100vh-84px)] overflow-hidden lg:block"
        style={{ opacity: backgroundOpacity }}
      >
        <img
          alt=""
          className="absolute -left-[18%] top-[-4%] h-[112%] max-w-none object-contain opacity-[0.11] mix-blend-screen"
          src={assets.oncaWide}
        />
        <img
          alt=""
          className="absolute -right-[14%] top-[6%] h-[88%] max-w-none object-contain opacity-[0.12] mix-blend-screen blur-[0.4px]"
          src={assets.historyHero}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_42%,rgba(242,195,25,0.08),transparent_22%),radial-gradient(circle_at_84%_38%,rgba(242,195,25,0.1),transparent_18%),linear-gradient(90deg,rgba(5,4,3,0.98)_0%,rgba(5,4,3,0.76)_16%,rgba(5,4,3,0.58)_50%,rgba(5,4,3,0.76)_84%,rgba(5,4,3,0.98)_100%)]" />
        <div className="editorial-grid absolute inset-0 opacity-[0.07]" />
      </motion.div>

      <MotionSection className="section-shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.95fr_0.95fr]">
          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <AccentTitle>Proximos jogos</AccentTitle>
              <a className="text-sm font-bold text-yellow transition hover:text-yellow-soft" href="/matchday">
                Ver todos {"\u2192"}
              </a>
            </div>

            <div className="space-y-4">
              {visibleMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <AccentTitle>Classificacao</AccentTitle>
            </div>

            <div className="overflow-hidden rounded-[8px] border border-paper/10 bg-[#1b1b1b]/92 backdrop-blur-[2px]">
              <div className="bg-yellow px-4 py-4 text-sm font-black uppercase text-black">Serie C {seasonYear}</div>
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center border-b border-paper/8 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-paper/34">
                <div />
                <div />
                <div className="flex items-center justify-end gap-4">
                  <span className="w-8 text-right">P</span>
                  <span className="w-8 text-right">V</span>
                  <span className="w-10 text-right">SG</span>
                </div>
              </div>
              <div>
                {visibleStandings.map((team) => (
                  <StandingsRow key={team.team} team={team} />
                ))}
              </div>
              <div className="bg-paper/[0.03] px-4 py-4 text-center">
                <a className="text-sm font-bold text-yellow transition hover:text-yellow-soft" href="/matchday">
                  Ver tabela completa {"\u2192"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
