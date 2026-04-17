import { assets, timeline } from "../data/club.js";
import { PageTitle } from "../components/PageTitle.jsx";

export function HistoryPage() {
  return (
    <main>
      <PageTitle
        eyebrow="História"
        title="Clube novo, trajeto raro."
        text="A narrativa pública precisa ligar fundação, acesso, título nacional e consolidação regional."
      />
      <section className="section-shell grid gap-10 pb-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="overflow-hidden border border-paper/12 lg:sticky lg:top-28">
          <img className="aspect-[0.95] w-full object-cover" src={assets.trainingWide} alt="" />
        </div>
        <div className="grid gap-0 border-t border-paper/14">
          {timeline.map((item) => (
            <article className="grid gap-4 border-b border-paper/14 py-8 md:grid-cols-[140px_1fr]" key={`${item.year}-${item.title}`}>
              <span className="display text-5xl text-yellow">{item.year}</span>
              <div>
                <h2 className="display text-4xl leading-none">{item.title}</h2>
                <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-paper/62">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
