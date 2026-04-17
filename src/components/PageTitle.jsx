export function PageTitle({ eyebrow, title, text }) {
  return (
    <section className="page-shell relative pb-12">
      <div className="gold-line mb-9 w-full opacity-80" />
      <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">{eyebrow}</p>
      <h1 className="display max-w-5xl text-[clamp(50px,10vw,128px)] leading-[0.86]">{title}</h1>
      {text ? <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-paper/64">{text}</p> : null}
    </section>
  );
}
