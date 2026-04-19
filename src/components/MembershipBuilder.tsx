import { useMemo, useState } from"react";

function formatPrice(value) {
  return value.toFixed(2).replace(".",",");
}

export function MembershipBuilder({ plans, className ="" }) {
  const displayPlans = useMemo(() => [...plans].reverse(), [plans]);
  const [selectedId, setSelectedId] = useState(displayPlans[0]?.id ?? plans[0]?.id ??"");
  const [wantsStore, setWantsStore] = useState(true);
  const [wantsExperiences, setWantsExperiences] = useState(false);
  const selectedPlan = useMemo(
    () => plans.find((plan) => plan.id === selectedId) ?? plans[0],
    [plans, selectedId],
  );
  const total = (selectedPlan?.price ?? 0) + (wantsStore ? 12 : 0) + (wantsExperiences ? 18 : 0);

  if (!selectedPlan) return null;

  return (
    <section className={`glass relative overflow-hidden p-5 md:p-6 ${className}`.trim()}>
      <div className="pointer-events-none absolute inset-0 editorial-grid opacity-25" />
      <div className="relative grid gap-3 sm:grid-cols-3">
        {displayPlans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            className={`relative min-w-0 overflow-hidden border p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-yellow ${
              plan.id === selectedId ?"border-yellow bg-yellow text-black" :"border-paper/12 bg-paper/[0.025] text-paper"
            }`}
            onClick={() => setSelectedId(plan.id)}
          >
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.14em] opacity-70">{plan.priority}</span>
            <strong className="display mt-4 block break-words text-[clamp(28px,2.5vw,40px)] leading-none">{plan.name}</strong>
            <span className="mt-5 block text-sm font-extrabold">R$ {formatPrice(plan.price)}</span>
            {plan.id === selectedId ? <span className="absolute bottom-0 left-0 h-1 w-full bg-black/70" /> : null}
          </button>
        ))}
      </div>

      <div className="relative mt-7 grid gap-6 lg:grid-cols-[1fr_240px]">
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Benefícios incluídos</p>
          <ul className="mt-5 grid gap-3">
            {selectedPlan.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 border-b border-paper/10 pb-3 text-sm font-bold text-paper/72">
                <span className="h-2 w-2 bg-yellow" />
                {benefit}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <label className="flex cursor-pointer items-center justify-between border border-paper/12 bg-black/24 p-4 text-sm font-bold text-paper/72 transition hover:border-yellow/70">
              <span>Desconto extra na loja</span>
              <input
                checked={wantsStore}
                className="h-5 w-5 accent-yellow"
                type="checkbox"
                onChange={(event) => setWantsStore(event.target.checked)}
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between border border-paper/12 bg-black/24 p-4 text-sm font-bold text-paper/72 transition hover:border-yellow/70">
              <span>Experiências de matchday</span>
              <input
                checked={wantsExperiences}
                className="h-5 w-5 accent-yellow"
                type="checkbox"
                onChange={(event) => setWantsExperiences(event.target.checked)}
              />
            </label>
          </div>
        </div>

        <aside className="border border-yellow/50 bg-[linear-gradient(180deg,#f5c400,#b98e12)] p-5 text-black shadow-[0_24px_80px_rgba(245,196,0,.14)]">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-black/62">Estimativa mensal</span>
          <strong className="display mt-4 block text-[clamp(54px,5vw,72px)] leading-none">R$ {formatPrice(total)}</strong>
          <p className="mt-5 text-xs font-extrabold uppercase text-black/64">{selectedPlan.priority}</p>
          <div className="mt-6 h-px bg-black/22" />
          <p className="mt-5 text-xs font-extrabold uppercase leading-5 text-black/58">Simulação local. Cadastro no canal oficial.</p>
        </aside>
      </div>
    </section>
  );
}
