import { useMemo, useState } from "react";
import { news } from "../data/club.js";
import { NewsCard } from "../components/NewsCard.jsx";
import { PageTitle } from "../components/PageTitle.jsx";

export function NewsPage() {
  const categories = useMemo(() => ["Todas", ...new Set(news.map((item) => item.category))], []);
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");

  const filtered = news.filter((item) => {
    const categoryMatch = category === "Todas" || item.category === category;
    const searchMatch = `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <main>
      <PageTitle eyebrow="Notícias" title="Arquivo vivo." text="Busca, categoria e chamadas objetivas para conteúdo oficial." />
      <section className="section-shell pb-24">
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <input
            className="focus-ring h-14 w-full border border-paper/14 bg-paper/[0.04] px-5 text-sm font-bold text-paper outline-none transition placeholder:text-paper/38 focus:border-yellow"
            placeholder="Buscar notícia"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                className={`focus-ring rounded-[4px] px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] transition ${
                  item === category ? "bg-yellow text-black" : "border border-paper/16 text-paper/68 hover:border-yellow hover:text-yellow"
                }`}
                key={item}
                type="button"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {filtered.map((item) => <NewsCard item={item} key={item.id} />)}
        </div>
      </section>
    </main>
  );
}
