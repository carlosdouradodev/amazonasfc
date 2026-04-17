import { useEffect, useMemo, useState } from "react";
import { recentSerieCResults, upcomingSerieC } from "../data/competition.generated.js";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function formatCountdown(distance) {
  if (distance <= 0) return "Hoje";

  const days = Math.floor(distance / DAY);
  const hours = Math.floor((distance % DAY) / HOUR);
  const minutes = Math.floor((distance % HOUR) / (60 * 1000));

  if (days > 0) return `${days}d ${hours}h`;
  return `${hours}h ${String(minutes).padStart(2, "0")}min`;
}

function useCountdown(timestamp) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const kickoff = timestamp * 1000;
    const distance = kickoff - now;

    return {
      label: formatCountdown(distance),
      isUrgent: distance > 0 && distance <= 48 * HOUR,
    };
  }, [now, timestamp]);
}

export function MatchPulseBar() {
  const nextMatch = upcomingSerieC[0];
  const latestResult = recentSerieCResults[0];
  const countdown = useCountdown(nextMatch?.timestamp ?? 0);

  if (!nextMatch) return null;

  return (
    <section className="border-y border-yellow/20 bg-yellow text-black">
      <div className="section-shell grid gap-3 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="display text-xl leading-none">{countdown.isUrgent ? "Próximo jogo" : "Calendário"}</span>
          <span className="hidden h-px w-10 bg-black/38 sm:block" />
          <span className="min-w-0 truncate">
            {nextMatch.home} x {nextMatch.away}
          </span>
        </div>

        <div className="flex items-center justify-start gap-3 md:justify-center">
          <span className="border border-black/18 px-3 py-1">{countdown.label}</span>
          <span>{nextMatch.date}</span>
          <span>{nextMatch.time}</span>
        </div>

        {latestResult ? (
          <div className="flex min-w-0 items-center gap-3 md:justify-end">
            <span className="hidden text-black/48 sm:inline">Último</span>
            <span className="rounded-none bg-black px-2 py-1 text-yellow">{latestResult.outcome}</span>
            <span className="min-w-0 truncate">
              Amazonas {latestResult.amazonasScore} {latestResult.opponent}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
