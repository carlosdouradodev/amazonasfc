import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { matches, officialLinks } from "../data/club.js";
import { CompetitionSnapshot } from "../components/CompetitionSnapshot.jsx";
import { MotionSection } from "../components/MotionSection.jsx";

const transition = { duration: 0.46, ease: [0.22, 1, 0.36, 1] };

const cx = (...parts) => parts.filter(Boolean).join(" ");

const isFinal = (match) => match.status?.toLowerCase() === "finalizado";

function MatchTab({ match, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cx(
        "rounded-[8px] border px-4 py-4 text-left transition",
        active ? "border-yellow bg-yellow text-black" : "border-paper/10 bg-paper/[0.025] text-paper/64 hover:border-yellow/36 hover:text-paper",
        isFinal(match) && !active ? "opacity-56" : "",
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
      className={cx(
        "focus-ring rounded-[8px] px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] transition",
        primary ? "bg-yellow text-black hover:bg-yellow-soft" : "border border-paper/20 bg-paper/[0.02] text-paper/76 hover:border-yellow hover:text-yellow",
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
            <span className={cx("rounded-[8px] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em]", final ? "border border-paper/14 text-paper/42" : "bg-yellow text-black")}>
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
              {final ? "Área do sócio" : "Check-in sócio"}
            </ActionLink>
            <ActionLink href="https://www.youtube.com/channel/UCmbbvZoJZeZWPEFXAoWmrjw">Assistir na TV Onça</ActionLink>
          </div>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}

export function MatchdayPage() {
  const defaultMatchId = useMemo(() => matches.find((match) => !isFinal(match))?.id ?? matches[0]?.id, []);
  const [selectedId, setSelectedId] = useState(defaultMatchId);
  const activeMatch = matches.find((match) => match.id === selectedId) ?? matches[0];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-paper/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(242,195,25,0.12),transparent_30%),radial-gradient(circle_at_86%_8%,rgba(18,53,31,0.32),transparent_36%)]" />
        <div className="editorial-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className="page-shell relative pb-12">
          <MotionSection className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-yellow">Central do torcedor</p>
              <h1 className="display max-w-[10ch] text-[clamp(58px,8vw,118px)] leading-[0.84] text-paper">Tudo do jogo.</h1>
              <p className="mt-6 max-w-[42ch] text-base font-semibold leading-8 text-paper/62">
                Horário, estádio, entrada e transmissão em uma tela. O jogo selecionado controla o serviço.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {matches.map((match) => (
                <MatchTab key={match.id} match={match} active={match.id === activeMatch.id} onSelect={() => setSelectedId(match.id)} />
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <CompetitionSnapshot />
    </main>
  );
}
