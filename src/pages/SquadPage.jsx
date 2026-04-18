import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { assets, squad } from "../data/club.js";
import { MotionSection } from "../components/MotionSection.jsx";

const FILTERS = [
  { id: "todos", label: "Todos", match: () => true },
  { id: "goleiros", label: "Goleiros", match: (player) => player.position === "Goleiro" },
  { id: "defesa", label: "Defesa", match: (player) => ["Zagueiro", "Lateral"].includes(player.position) },
  { id: "meio", label: "Meio", match: (player) => ["Volante", "Meio-campista"].includes(player.position) },
  { id: "ataque", label: "Ataque", match: (player) => player.position === "Atacante" },
];

const SECTORS = [
  { id: "goleiros", label: "Goleiros" },
  { id: "defesa", label: "Defesa" },
  { id: "meio", label: "Meio" },
  { id: "ataque", label: "Ataque" },
];

const transition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] };

const cx = (...parts) => parts.filter(Boolean).join(" ");

function getSector(player) {
  if (player.position === "Goleiro") return "goleiros";
  if (["Zagueiro", "Lateral"].includes(player.position)) return "defesa";
  if (["Volante", "Meio-campista"].includes(player.position)) return "meio";
  return "ataque";
}

function hasPortrait(player) {
  return Boolean(player.image) && player.image !== assets.trainingWide;
}

function formatCount(value) {
  return String(value).padStart(2, "0");
}

function PlayerPortrait({ player }) {
  if (hasPortrait(player)) {
    return (
      <div className="flex h-full w-full items-end justify-center bg-[linear-gradient(135deg,#f6f0df,#d7cfbd)]">
        <img className="h-full w-full object-contain object-bottom" src={player.image} alt={player.name} />
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(242,195,25,0.2),transparent_58%),linear-gradient(135deg,rgba(18,53,31,0.56),rgba(5,4,3,0.94))]">
      <div className="absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,rgba(246,240,223,0.12)_0_1px,transparent_1px_22px),repeating-linear-gradient(0deg,rgba(242,195,25,0.08)_0_1px,transparent_1px_18px)]" />
      <span className="display absolute -left-5 bottom-4 text-[112px] leading-none text-paper/[0.035]">{player.position}</span>
      <img className="relative z-10 h-28 w-28 object-contain opacity-92 drop-shadow-[0_20px_55px_rgba(0,0,0,.42)]" src={assets.logo} alt="" />
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper/38">{label}</p>
      <p className="mt-2 text-sm font-extrabold uppercase text-paper">{value}</p>
    </div>
  );
}

function PlayerPreview({ player, index, total, onPrev, onNext }) {
  if (!player) {
    return (
      <aside className="rounded-[8px] border border-paper/10 bg-paper/[0.025] p-6">
        <p className="display text-4xl leading-none text-paper">Nenhum atleta.</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-paper/54">Ajuste a busca ou o filtro.</p>
      </aside>
    );
  }

  const details = [
    { label: "Posição", value: player.position },
    { label: "Camisa", value: String(player.number).padStart(2, "0") },
    { label: "Pé", value: player.foot },
    { label: "Altura", value: player.height },
    { label: "Nascimento", value: player.birth },
    { label: "Origem", value: player.birthplace },
  ].filter((item) => item.value);

  return (
    <aside className="sticky top-28 overflow-hidden rounded-[8px] border border-paper/10 bg-[linear-gradient(180deg,rgba(246,240,223,0.05),rgba(246,240,223,0.015)),rgba(13,12,9,0.9)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={transition}
        >
          <div className="relative h-[330px] overflow-hidden border-b border-paper/10 bg-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(242,195,25,0.14),transparent_34%),linear-gradient(180deg,rgba(5,4,3,0),rgba(5,4,3,0.22))]" />
            <span className="display absolute left-4 top-2 z-10 text-[120px] leading-none text-black/10">{String(player.number).padStart(2, "0")}</span>
            <div className="absolute inset-0">
              <PlayerPortrait player={player} />
            </div>
            <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/92 via-black/62 to-transparent p-5 pt-24">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow">
                {formatCount(index + 1)} de {formatCount(total)}
              </p>
              <h2 className="display mt-2 max-w-[11ch] text-[clamp(44px,4.8vw,70px)] leading-[0.88] text-paper drop-shadow-[0_8px_26px_rgba(0,0,0,.76)]">
                {player.name}
              </h2>
            </div>
          </div>

          <div className="p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-paper/42">Nome completo</p>
            <p className="mt-2 text-base font-extrabold uppercase leading-6 text-paper">{player.fullName ?? player.name}</p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {details.map((item) => (
                <DetailItem key={item.label} label={item.label} value={item.value} />
              ))}
            </div>

            {player.lastClub ? (
              <div className="mt-5 border-t border-paper/10 pt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper/38">Último clube</p>
                <p className="mt-2 text-sm font-extrabold uppercase text-paper">{player.lastClub}</p>
              </div>
            ) : null}

            {player.history ? (
              <div className="mt-5 border-t border-paper/10 pt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">Histórico</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-paper/58">{player.history}</p>
              </div>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="rounded-[8px] border border-paper/12 px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/68 transition hover:border-yellow hover:text-yellow"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={onNext}
                className="rounded-[8px] bg-yellow px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-black transition hover:bg-yellow-soft"
              >
                Próximo
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}

function PlayerRow({ player, active, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.995 }}
      className={cx(
        "relative mb-2 flex w-full items-center gap-3 overflow-hidden rounded-[8px] px-3 py-3 text-left transition last:mb-0",
        active ? "text-black" : "text-paper hover:bg-paper/[0.045]",
      )}
    >
      {active ? <motion.span layoutId="active-squad-row" className="absolute inset-0 rounded-[8px] bg-yellow" transition={transition} /> : null}
      <span className={cx("relative z-10 display w-8 shrink-0 text-2xl leading-none", active ? "text-black" : "text-paper/28")}>
        {String(player.number).padStart(2, "0")}
      </span>
      <div className="relative z-10 min-w-0 flex-1">
        <p className="display truncate text-[28px] leading-none">{player.name}</p>
        <p className={cx("mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em]", active ? "text-black/68" : "text-paper/38")}>
          {player.position}
          {player.height ? ` · ${player.height}` : ""}
        </p>
      </div>
      <span className={cx("relative z-10 text-[10px] font-extrabold uppercase tracking-[0.12em]", active ? "text-black/58" : "text-paper/28")}>
        {player.foot}
      </span>
    </motion.button>
  );
}

function SectorBackdrop({ players, title }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_16%,rgba(242,195,25,0.14),transparent_24%),linear-gradient(90deg,rgba(5,4,3,0.98)_0%,rgba(5,4,3,0.94)_58%,rgba(5,4,3,0.84)_76%,rgba(5,4,3,0.66)_100%)]" />
      <span className="pointer-events-none display absolute bottom-3 right-3 text-[88px] leading-none text-paper/[0.05]">
        {title}
      </span>
    </>
  );
}

function SectorColumn({ title, players, activeId, onSelect }) {
  return (
    <article className="relative overflow-hidden rounded-[8px] border border-paper/10 bg-paper/[0.025]">
      <SectorBackdrop players={players} title={title} />
      <div className="relative z-10 flex items-end justify-between gap-4 border-b border-paper/10 px-4 py-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">{title}</p>
          <p className="mt-2 text-sm font-semibold text-paper/46">{formatCount(players.length)} atletas</p>
        </div>
        <span className="display text-5xl leading-none text-paper/10">{formatCount(players.length)}</span>
      </div>
      <div className="relative z-10 p-2">
        {players.length > 0 ? (
          players.map((player) => <PlayerRow key={player.id} player={player} active={player.id === activeId} onSelect={() => onSelect(player.id)} />)
        ) : (
          <div className="px-3 py-8 text-sm font-semibold text-paper/36">Sem atletas neste recorte.</div>
        )}
      </div>
    </article>
  );
}

export function SquadPage() {
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState("todos");
  const [selectedId, setSelectedId] = useState(squad[0]?.id ?? "");

  const activeFilter = useMemo(() => FILTERS.find((item) => item.id === filterId) ?? FILTERS[0], [filterId]);

  const filteredSquad = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return squad.filter((player) => {
      const filterMatch = activeFilter.match(player);
      const queryMatch = !normalizedQuery || player.name.toLowerCase().includes(normalizedQuery);
      return filterMatch && queryMatch;
    });
  }, [activeFilter, query]);

  useEffect(() => {
    if (!filteredSquad.some((player) => player.id === selectedId)) {
      setSelectedId(filteredSquad[0]?.id ?? squad[0]?.id ?? "");
    }
  }, [filteredSquad, selectedId]);

  const activePlayer = filteredSquad.find((player) => player.id === selectedId) ?? filteredSquad[0] ?? null;
  const activeIndex = activePlayer ? filteredSquad.findIndex((player) => player.id === activePlayer.id) : -1;

  const groupedSquad = useMemo(
    () =>
      SECTORS.map((sector) => ({
        ...sector,
        players: filteredSquad.filter((player) => getSector(player) === sector.id),
      })),
    [filteredSquad],
  );

  const summary = useMemo(
    () => [
      { label: "Atletas", value: formatCount(filteredSquad.length) },
      { label: "Setores", value: formatCount(new Set(filteredSquad.map(getSector)).size || 0) },
      { label: "Canhotos", value: formatCount(filteredSquad.filter((player) => player.foot === "Esquerdo").length) },
    ],
    [filteredSquad],
  );

  const cyclePlayer = (direction) => {
    if (!filteredSquad.length) return;
    const currentIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex = (currentIndex + direction + filteredSquad.length) % filteredSquad.length;
    setSelectedId(filteredSquad[nextIndex].id);
  };

  const missingPortraits = filteredSquad.filter((player) => !hasPortrait(player)).length;

  return (
    <main className="relative overflow-hidden">
      <section className="relative overflow-hidden border-b border-paper/8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_4%,rgba(242,195,25,0.16),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(18,53,31,0.32),transparent_32%)]" />
        <div className="editorial-grid pointer-events-none absolute inset-0 opacity-24" />
        <div className="page-shell relative pb-10">
          <MotionSection className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(360px,0.28fr)] lg:items-end">
            <div>
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-yellow">Elenco profissional</p>
              <h1 className="display max-w-[12ch] text-[clamp(56px,8vw,112px)] leading-[0.86] text-paper">Plantel 2026.</h1>
              <p className="mt-5 max-w-[58ch] text-base font-semibold leading-8 text-paper/62">
                Setores primeiro, atleta no detalhe. A página fica mais rápida de ler e mantém movimento onde ele ajuda a escolha.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {summary.map((item) => (
                <div key={item.label} className="rounded-[8px] border border-paper/10 bg-paper/[0.03] px-4 py-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-paper/40">{item.label}</p>
                  <p className="display mt-3 text-5xl leading-none text-paper">{item.value}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="section-shell grid gap-8 py-10 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <div>
          <div className="mb-6 grid gap-3 lg:grid-cols-[minmax(260px,0.34fr)_minmax(0,1fr)] lg:items-center">
            <label className="block">
              <span className="sr-only">Buscar atleta</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 w-full rounded-[8px] border border-paper/12 bg-paper/[0.035] px-4 text-sm font-bold text-paper outline-none transition placeholder:text-paper/36 focus:border-yellow"
                placeholder="Buscar atleta"
              />
            </label>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {FILTERS.map((item) => {
                const active = item.id === filterId;
                const count = squad.filter((player) => item.match(player)).length;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setFilterId(item.id)}
                    className={cx(
                      "rounded-[8px] border px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] transition",
                      active ? "border-yellow bg-yellow text-black" : "border-paper/12 text-paper/66 hover:border-yellow hover:text-yellow",
                    )}
                  >
                    {item.label} <span className={active ? "text-black/64" : "text-paper/34"}>{formatCount(count)}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {groupedSquad.map((group) => (
              <SectorColumn key={group.id} title={group.label} players={group.players} activeId={activePlayer?.id} onSelect={setSelectedId} />
            ))}
          </div>
        </div>

        <PlayerPreview player={activePlayer} index={activeIndex} total={filteredSquad.length} onPrev={() => cyclePlayer(-1)} onNext={() => cyclePlayer(1)} />
      </MotionSection>

      <MotionSection className="section-shell pb-24">
        <div className="rounded-[8px] border border-paper/10 bg-[linear-gradient(90deg,rgba(242,195,25,0.1),rgba(246,240,223,0.025),rgba(18,53,31,0.16))] p-5 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">Banco visual</p>
            <h3 className="display mt-2 text-[clamp(34px,4vw,54px)] leading-none text-paper">Retratos oficiais no elenco.</h3>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:mt-0 md:w-[360px]">
            <div className="rounded-[8px] border border-paper/10 bg-black/38 px-4 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-paper/40">Com retrato</p>
              <p className="display mt-2 text-5xl leading-none text-paper">{formatCount(filteredSquad.length - missingPortraits)}</p>
            </div>
            <div className="rounded-[8px] border border-yellow/16 bg-yellow/[0.08] px-4 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-yellow/72">A revisar</p>
              <p className="display mt-2 text-5xl leading-none text-yellow">{formatCount(missingPortraits)}</p>
            </div>
          </div>
        </div>
      </MotionSection>
    </main>
  );
}
