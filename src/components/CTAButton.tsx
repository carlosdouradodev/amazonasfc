export function CTAButton({ href, children, variant ="primary", external = false, className ="" }) {
  const base ="focus-ring group inline-flex min-h-11 max-w-full items-center justify-center overflow-hidden rounded-[8px] px-5 py-3 text-center text-[12px] font-extrabold uppercase leading-4 tracking-[0.08em] transition duration-300";
  const variants = {
    primary:"bg-yellow text-black shadow-[0_16px_42px_rgba(242,195,25,.18)] hover:-translate-y-0.5 hover:bg-yellow-soft",
    ghost:"border border-paper/18 bg-paper/[0.035] text-paper/82 backdrop-blur-xl hover:-translate-y-0.5 hover:border-yellow hover:text-yellow",
    dark:"border border-black/12 bg-black text-paper hover:-translate-y-0.5",
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} href={href} target={external ?"_blank" : undefined} rel={external ?"noreferrer" : undefined}>
      <span className="relative z-10">{children}</span>
    </a>
  );
}
