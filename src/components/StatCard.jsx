export function StatCard({ label, value }) {
  return (
    <div
      className="stat-card min-w-0 border-b border-r border-paper/10 p-4 even:border-r-0 sm:p-5 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
    >
      <span className="block text-[10px] font-extrabold uppercase leading-4 tracking-[0.08em] text-paper/58 sm:text-[11px] sm:tracking-[0.16em]">{label}</span>
      <strong className="display mt-3 block break-words text-[clamp(25px,3vw,40px)] leading-[0.92] text-paper">{value}</strong>
    </div>
  );
}
