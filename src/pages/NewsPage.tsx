import { useMemo, useState } from"react";
import { motion } from"framer-motion";
import { officialLinks } from"../data/club";
import { getNewsArticle, news } from"../data/news";
import { upcomingSerieC } from"../data/competition.generated";
import { CTAButton } from"../components/CTAButton";
import { NewsCard } from"../components/NewsCard";

function normalizeRouteArticleId(route?: string) {
  if (!route?.startsWith("/noticias/")) {
    return null;
  }

  return route.replace("/noticias/","").split("/")[0] || null;
}

function ArticleMeta({ date, author, readTime }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-paper/12 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-paper/46">
      <span>{date}</span>
      <span>por {author}</span>
      <span>tempo de leitura {readTime}</span>
    </div>
  );
}

function RelatedCard({ label, title, text, href, variant ="dark" }) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      className="group flex min-h-[220px] flex-col justify-between border border-paper/12 bg-paper/[0.035] p-6 transition duration-300 hover:border-yellow/60 hover:bg-paper/[0.06]"
      href={href}
      target={external ?"_blank" : undefined}
      rel={external ?"noreferrer" : undefined}
    >
      <div>
        <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">{label}</p>
        <h3 className="display max-w-sm text-[clamp(28px,3vw,42px)] leading-[0.92] text-paper">{title}</h3>
        <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-paper/58">{text}</p>
      </div>
      <div className="pt-6">
        <span
          className={`inline-flex min-h-11 items-center justify-center rounded-[8px] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] ${
            variant ==="primary" ?"bg-yellow text-black" :"border border-paper/16 bg-black/40 text-paper/82"
          }`}
        >
          Abrir
        </span>
      </div>
    </a>
  );
}

export function NewsPage({ route ="/noticias" }) {
  const articleId = normalizeRouteArticleId(route) ?? news[0].id;
  const articleItem = getNewsArticle(articleId);
  const story = articleItem.article;
  const nextMatch = upcomingSerieC[0];
  const categories = useMemo(() => ["Todas", ...new Set(news.map((item) => item.category))], []);
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return news.filter((item) => {
      const categoryMatch = category ==="Todas" || item.category === category;
      const searchTarget = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
      const searchMatch = !normalizedQuery || searchTarget.includes(normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const relatedNews = news.filter((item) => item.id !== articleItem.id).slice(0, 2);

  return (
    <main id="main-content">
      <section className="relative min-h-[88svh] overflow-hidden pt-24">
        <img className="absolute inset-0 h-full w-full object-cover object-[50%_28%]" src={story.heroImage} alt={`Imagem de capa da matéria ${story.title ?? articleItem.title}`} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.36)_0%,rgba(5,4,3,.42)_24%,rgba(5,4,3,.86)_62%,rgba(5,4,3,.98)_100%),linear-gradient(90deg,rgba(5,4,3,.86)_0%,rgba(5,4,3,.38)_38%,rgba(5,4,3,.2)_100%)]" />
        <div className="amazon-pattern absolute inset-0 opacity-30" />
        <div className="grain" />

        <div className="section-shell relative z-10 flex min-h-[calc(88svh-96px)] items-end pb-12 lg:pb-16">
          <motion.div
            className="max-w-5xl"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-paper/72">Notícias</p>
            <p className="mb-5 inline-flex rounded-full bg-yellow px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-black">
              {articleItem.category}
            </p>
            <h1 className="display max-w-5xl text-[clamp(42px,7.8vw,110px)] leading-[0.86] text-paper">{story.title ?? articleItem.title}</h1>
            <p className="mt-6 max-w-3xl text-[clamp(18px,2.1vw,26px)] font-bold leading-tight text-paper/82">{story.lead}</p>
            <div className="mt-8 max-w-3xl">
              <ArticleMeta date={articleItem.date.toUpperCase()} author="Amazonas FC" readTime="3 min" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="min-w-0">
            <div className="mb-10 overflow-hidden border border-paper/12 bg-paper/[0.03]">
              <img className="h-[340px] w-full object-cover md:h-[460px]" src={story.inlineImage} alt={`Imagem da matéria ${story.title ?? articleItem.title}`} />
            </div>

            <div className="mx-auto max-w-3xl">
              <div className="space-y-6 text-[18px] leading-9 text-paper/78">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <figure className="my-12 border-l-2 border-yellow pl-6">
                <blockquote className="display text-[clamp(32px,4vw,54px)] leading-[0.94] text-paper">{story.quote}</blockquote>
                <figcaption className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-paper/44">{story.quoteSource}</figcaption>
              </figure>

              <div className="space-y-6 text-[18px] leading-9 text-paper/78">
                <p>
                  O desenho da página trata a matéria como produto editorial completo. Hero forte, metadados limpos, largura de leitura estável, imagem com peso e saída clara para jogo, elenco e ingresso. Isso sustenta a sensação de clube profissional em vez de postagem solta.
                </p>
                <p>
                  O objetivo aqui é unificar as notícias principais em uma linguagem visual só. A manchete muda; a estrutura permanece. Isso reduz ruído, melhora continuidade e cria assinatura editorial para o site.
                </p>
              </div>
            </div>
          </article>

          <aside className="grid content-start gap-5">
            <div className="border border-paper/12 bg-paper/[0.035] p-6">
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Stats</p>
              <div className="grid gap-4">
                {story.stats.map((item) => (
                  <div className="border-t border-paper/10 pt-4 first:border-t-0 first:pt-0" key={item.label}>
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper/40">{item.label}</p>
                    <p className="mt-2 text-[22px] font-black uppercase leading-tight text-paper">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-paper/12 bg-paper/[0.035] p-6">
              <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Próximos passos</p>
              <ol className="grid gap-5">
                {story.nextSteps.map((item, index) => (
                  <li className="grid grid-cols-[34px_1fr] gap-4 border-t border-paper/10 pt-4 first:border-t-0 first:pt-0" key={item}>
                    <span className="display text-3xl leading-none text-yellow">{index + 1}</span>
                    <span className="text-sm font-semibold leading-6 text-paper/66">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-yellow/30 bg-[linear-gradient(135deg,rgba(242,195,25,.16),rgba(242,195,25,.04))] p-6">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black/72">Comprar ingresso</p>
              <h3 className="display text-[clamp(30px,3vw,44px)] leading-[0.92] text-black">Leve a matéria para a arquibancada.</h3>
              <p className="mt-4 text-sm font-semibold leading-6 text-black/72">A notícia precisa converter quando o próximo passo é estádio.</p>
              <div className="mt-6">
                <CTAButton href={officialLinks.ingressos} external>
                  Comprar ingressos
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-14">
        <div className="mb-8 grid gap-4 border-t border-paper/12 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Relacionados</p>
            <h2 className="display max-w-3xl text-[clamp(40px,6vw,76px)] leading-[0.88]">Próximo passo sem atrito.</h2>
          </div>
          <p className="max-w-2xl text-base font-semibold leading-7 text-paper/58">
            A saída da matéria precisa apontar para jogo, outras notícias, ingresso e elenco.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <RelatedCard
            label="Próximo jogo"
            title={`${nextMatch.home} x ${nextMatch.away}`}
            text={`${nextMatch.date.toUpperCase()} • ${nextMatch.time} • ${nextMatch.venue} / ${nextMatch.city}`}
            href="/matchday"
            variant="primary"
          />
          {relatedNews.map((item) => (
            <RelatedCard key={item.id} label={item.category} title={item.title} text={item.excerpt} href={item.path} />
          ))}
          <RelatedCard
            label="Conheça o elenco"
            title="Números, fotos e contexto de grupo"
            text="Página de elenco com leitura mais viva, útil e próxima do futebol profissional."
            href="/elenco"
          />
        </div>
      </section>

      <section id="news-archive" className="section-shell pb-24">
        <div className="mb-10 grid gap-6 border-t border-paper/12 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Outras notícias</p>
            <h2 className="display max-w-3xl text-[clamp(40px,6vw,76px)] leading-[0.88]">Arquivo editorial.</h2>
          </div>
          <div className="grid gap-4">
            <input
              className="focus-ring h-14 w-full border border-paper/14 bg-paper/[0.04] px-5 text-sm font-bold text-paper outline-none transition placeholder:text-paper/38 focus:border-yellow"
              aria-label="Buscar notícia"
              placeholder="Buscar notícia"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  className={`focus-ring rounded-[8px] px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] transition ${
                    item === category ?"bg-yellow text-black" :"border border-paper/16 text-paper/68 hover:border-yellow hover:text-yellow"
                  }`}
                  aria-pressed={item === category}
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((item) => (
            <NewsCard item={item} key={item.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
