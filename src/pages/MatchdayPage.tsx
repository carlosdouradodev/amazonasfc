import { Suspense, lazy, useMemo, useRef, useState } from"react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from"framer-motion";
import { assets, officialLinks } from"../data/club";
import { matchdayMatches } from"../data/matchday";
import { MotionSection } from"../components/MotionSection";

const transition = { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const };
const CompetitionSnapshot = lazy(() =>
  import("../components/CompetitionSnapshot").then((module) => ({
    default: module.CompetitionSnapshot,
  })),
);

const cx = (...parts) => parts.filter(Boolean).join(" ");

const isFinal = (match) => match.status?.toLowerCase() ==="finalizado";

function MatchTab({ match, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx("rounded-[8px] border px-4 py-4 text-left transition",
        active ?"border-yellow bg-yellow text-black" :"border-paper/10 bg-paper/[0.025] text-paper/64 hover:border-yellow/36 hover:text-paper",
        isFinal(match) && !active ?"opacity-56" :"",
      )}
    >
      <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-70">{match.date}</span>
      <strong className="display mt-3 block text-[28px] leading-[0.9]">{match.home} x {match.away}</strong>
      <span className="mt-3 block text-[10px] font-extrabold uppercase tracking-[0.13em] opacity-68">{match.status}</span>
    </button>
  );
}

function ServiceTile({ label, value }) {
  return (
    <div className="rounded-[8px] border border-paper/10 bg-black/30 px-4 py-4">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper/40">{label}</p>
      <p className="mt-2 text-sm font-extrabold uppercase leading-tight text-paper">{value}</p>
    </div>
  );
}

function ActionLink({ href, children, primary = false }) {
  return (
    <a
      className={cx("focus-ring rounded-[8px] px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] transition",
        primary ?"bg-yellow text-black hover:bg-yellow-soft" :"border border-paper/20 bg-paper/[0.02] text-paper/76 hover:border-yellow hover:text-yellow",
      )}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

function MatchCard({ match }) {
  const final = isFinal(match);
  const serviceRows = [
    ["Quando", `${match.date} · ${match.time}`],
    ["Onde", match.venue],
    ["Entrada", match.ticket],
    ["Transmissão", match.channel],
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={match.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={transition}
        className="relative overflow-hidden rounded-[8px] border border-paper/10 bg-[linear-gradient(180deg,rgba(246,240,223,0.055),rgba(246,240,223,0.018)),rgba(13,12,9,0.9)]"
      >
        <div className="editorial-grid pointer-events-none absolute inset-0 opacity-28" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(242,195,25,0.16),transparent_32%),linear-gradient(180deg,transparent,rgba(5,4,3,0.36))]" />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className={cx("rounded-[8px] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em]", final ?"border border-paper/14 text-paper/42" :"bg-yellow text-black")}>
              {match.status}
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-paper/40">{match.competition}</span>
          </div>

          <h2 className="display mt-6 max-w-[10ch] text-[clamp(56px,7vw,98px)] leading-[0.84] text-paper">
            {match.home} x {match.away}
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {serviceRows.map(([label, value]) => (
              <ServiceTile key={label} label={label} value={value} />
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <ActionLink href={officialLinks.socio} primary>
              {final ?"Área do sócio" :"Check-in sócio"}
            </ActionLink>
            <ActionLink href="https://www.youtube.com/channel/UCmbbvZoJZeZWPEFXAoWmrjw">Assistir na TV Onça</ActionLink>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

function SnapshotFallback() {
  return (
    <section className="section-shell py-20">
      <div className="overflow-hidden rounded-[8px] border border-paper/10 bg-paper/[0.025]">
        <div className="grid gap-4 p-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-4">
            <div className="h-16 rounded-[8px] bg-paper/[0.06]" />
            <div className="h-64 rounded-[8px] bg-paper/[0.05]" />
          </div>
          <div className="h-80 rounded-[8px] bg-paper/[0.04]" />
        </div>
      </div>
    </section>
  );
}

export function MatchdayPage() {
  const tabs = useMemo(() => matchdayMatches.slice(0, 3), []);
  const defaultMatchId = useMemo(() => tabs.find((match) => !isFinal(match))?.id ?? tabs[0]?.id, [tabs]);
  const [selectedId, setSelectedId] = useState(defaultMatchId);
  const activeMatch = tabs.find((match) => match.id === selectedId) ?? tabs[0];
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start","end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 70]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1.04, 1.04] : [1.08, 1.03]);

  if (!activeMatch) {
    return (
      <main id="main-content" className="section-shell py-24">
        <div className="rounded-[8px] border border-paper/10 bg-paper/[0.025] px-6 py-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-yellow">Matchday</p>
          <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-paper/64">
            Os dados de jogo ainda nao foram carregados.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section ref={heroRef} className="relative overflow-hidden border-b border-paper/8">
        <motion.img
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.16] blur-[1px]"
          src={assets.oncaWide}
          style={{ y: backgroundY, scale: backgroundScale }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-[-18%] left-[-12%] w-[34%] bg-[linear-gradient(118deg,transparent_12%,rgba(255,241,186,0.02)_40%,rgba(255,241,186,0.14)_50%,rgba(255,241,186,0.02)_60%,transparent_88%)] mix-blend-screen blur-[16px]"
          animate={prefersReducedMotion ? undefined : { x: ["0%","240%"] }}
          transition={prefersReducedMotion ? undefined : { duration: 7.2, repeat: Infinity, repeatDelay: 1.1, ease:"linear" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(242,195,25,0.12),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(18,53,31,0.32),transparent_36%)]" />
        <div className="editorial-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.22)_0%,rgba(5,4,3,0.38)_56%,rgba(5,4,3,0.82)_100%)]" />
        <div className="page-shell relative pb-12">
          <MotionSection className="space-y-6">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-yellow">Central do torcedor</p>
                <h1 className="display max-w-[10ch] text-[clamp(58px,8vw,118px)] leading-[0.84] text-paper">Tudo do jogo.</h1>
                <p className="mt-6 max-w-[42ch] text-base font-semibold leading-8 text-paper/62">
                  Horário, estádio, entrada e transmissão em uma tela. O jogo selecionado controla o serviço.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {tabs.map((match) => (
                  <MatchTab key={match.id} match={match} active={match.id === activeMatch.id} onSelect={() => setSelectedId(match.id)} />
                ))}
              </div>
            </div>

            <MatchCard match={activeMatch} />
          </MotionSection>
        </div>
      </section>

      <Suspense fallback={<SnapshotFallback />}>
        <CompetitionSnapshot />
      </Suspense>
    </main>
  );
}
