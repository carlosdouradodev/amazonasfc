import { useState } from"react";
import { assets } from"../../data/club";
import { displayPlayerName, isAmazonasScorer, teamCode } from"./utils";

export function TeamMark({ name, logo ="", compact = false, active = false }) {
  const [failed, setFailed] = useState(false);
  const isAmazonas = name ==="Amazonas";
  const source = failed ?"" : isAmazonas ? assets.logo : logo;
  const size = compact ?"h-7 w-7" :"h-8 w-8";
  const imageSize = compact ?"h-5 w-5" :"h-6 w-6";
  const tileClass = active
    ?"border-black/20 bg-black/82 shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]"
    :"border-paper/14 bg-[#d8c46a]/15";

  return (
    <span className={`flex ${size} shrink-0 items-center justify-center rounded-[8px] border ${tileClass}`}>
      {source ? (
        <img className={`${imageSize} object-contain`} src={source} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className={`display text-base ${active ?"text-paper/78" :"text-paper/66"}`}>{teamCode(name)}</span>
      )}
    </span>
  );
}

export function FormPill({ result, active }) {
  const classes = {
    V: active ?"bg-black/75 text-yellow" :"bg-emerald-400 text-black",
    E: active ?"bg-black/35 text-paper" :"bg-paper/24 text-paper",
    D: active ?"bg-black/35 text-paper" :"bg-red-500 text-paper",
  };

  return (
    <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black ${classes[result]}`}>
      {result}
    </span>
  );
}

export function NextOpponent({ opponent, active }) {
  if (!opponent) {
    return <span className={active ?"text-black/45" :"text-paper/34"}>-</span>;
  }

  return (
    <span className="flex items-center justify-center">
      <TeamMark active={active} compact name={opponent.name} logo={opponent.logo} />
    </span>
  );
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

  return scorer?.playerImage ??"";
}

export function PlayerPortrait({ scorer, className ="" }) {
  const [failed, setFailed] = useState(false);
  const source = failed ?"" : scorerImageSource(scorer);

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

export function ClubLogo({ scorer }) {
  const [failed, setFailed] = useState(false);
  const source = failed ?"" : scorer?.clubLogo;

  if (!source) {
    return <TeamMark compact name={scorer?.club ??""} logo="" />;
  }

  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-paper/14 bg-[#d8c46a]/15">
      <img alt="" className="h-5 w-5 object-contain" loading="lazy" src={source} onError={() => setFailed(true)} />
    </span>
  );
}

export function AmazonasScorerRow({ scorer, leader = false }) {
  return (
    <div className={`grid grid-cols-[36px_minmax(0,1fr)_42px] items-center gap-3 rounded-[8px] border px-3 py-2 ${leader ?"border-black/18 bg-black/10" :"border-black/10 bg-black/[0.04]"}`}>
      <PlayerPortrait scorer={scorer} className="h-9 w-9 rounded-[8px]" />
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold uppercase text-black">{displayPlayerName(scorer.player)}</p>
        <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-black/48">Amazonas</p>
      </div>
      <strong className="display text-right text-3xl leading-none text-black">{scorer.goals}</strong>
    </div>
  );
}
