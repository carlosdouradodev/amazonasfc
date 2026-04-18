export function StatCard({ item, label, value }) {
  const mark = item?.mark ?? label.slice(0, 2).toUpperCase();
  const featured = Boolean(item?.featured);

  return (
    <div
      className={`stat-card group min-w-0 border-b border-r border-paper/10 p-4 transition duration-300 even:border-r-0 sm:p-5 lg:border-b-0 lg:even:border-r lg:last:border-r-0 ${featured ? "stat-card--featured" : ""}`}
    >
      <span className={`mb-4 flex h-9 w-9 items-center justify-center rounded-[8px] border text-[10px] font-extrabold uppercase tracking-[0.05em] transition ${featured ? "border-yellow bg-yellow text-black" : "border-paper/14 bg-paper/[0.035] text-yellow group-hover:border-yellow"}`}>
        {mark}
      </span>
      <span className="block text-[10px] font-extrabold uppercase leading-4 tracking-[0.08em] text-paper/58 sm:text-[11px] sm:tracking-[0.16em]">{label}</span>
      <strong className={`display mt-3 block break-words text-[clamp(25px,3vw,40px)] leading-[0.92] ${featured ? "text-yellow" : "text-paper"}`}>{value}</strong>
    </div>
  );
}
