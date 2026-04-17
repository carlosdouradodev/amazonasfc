import { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assets, news, officialLinks, socialLinks } from "../data/club.js";
import { CTAButton } from "../components/CTAButton.jsx";
import { NewsCard } from "../components/NewsCard.jsx";

const editorialLanes = [
  {
    label: "Bastidores",
    title: "Viagem, treino e vestiário entram na pauta.",
    text: "A notícia precisa mostrar o que o torcedor não viu no placar: rotina, ambiente, decisão e preparação.",
  },
  {
    label: "Vídeos",
    title: "O lance ganha ritmo antes do texto.",
    text: "Cortes curtos para treino, chegada ao estádio, coletiva, gol e reação da arquibancada.",
  },
  {
    label: "Quotes",
    title: "Fala direta, contexto curto.",
    text: "Trechos de atleta, técnico e torcida aparecem como prova editorial, sem transformar a página em release.",
  },
  {
    label: "Stats",
    title: "Números no lugar certo.",
    text: "Forma recente, campanha, artilharia e agenda entram como leitura rápida para quem abriu a matéria no intervalo do dia.",
  },
];

const nextSteps = [
  "Pré-jogo com serviço, rival, horário, transmissão e recorte de tabela.",
  "Pós-jogo com placar, melhores momentos, fotos e fala curta do vestiário.",
  "Bastidor semanal com treino, viagem, recuperação e preparação para a rodada seguinte.",
];

const storyQuotes = [
  {
    quote: "A matéria precisa chegar perto do gramado, não apenas repetir o resultado.",
    source: "Linha editorial",
  },
  {
    quote: "Torcida, elenco e cidade entram na mesma narrativa quando a página respira como dia de jogo.",
    source: "Redação Amazonas FC",
  },
];

export function NewsPage() {
  const featured = news[0];
  const youtubeLink = socialLinks.find((item) => item.label === "YouTube")?.href ?? officialLinks.site;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 720], [0, 92]);
  const heroScale = useTransform(scrollY, [0, 720], [1.02, 1.12]);

  const categories = useMemo(() => ["Todas", ...new Set(news.map((item) => item.category))], []);
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return news.filter((item) => {
      const categoryMatch = category === "Todas" || item.category === category;
      const searchTarget = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
      const searchMatch = !normalizedQuery || searchTarget.includes(normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const archiveStats = useMemo(
    () => [
      { value: news.length.toString().padStart(2, "0"), label: "matérias oficiais" },
      { value: (categories.length - 1).toString().padStart(2, "0"), label: "editorias ativas" },
      { value: "24h", label: "ritmo de cobertura em jogo" },
    ],
    [categories.length],
  );

  return (
    <main>
      <section className="hero-mask relative min-h-[94svh] overflow-hidden pt-24">
        <motion.img
          className="absolute inset-0 z-0 h-full w-full object-cover object-[48%_38%]"
          src={featured.image}
          alt=""
          style={{ y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,4,3,.97)_0%,rgba(5,4,3,.75)_42%,rgba(5,4,3,.34)_72%),linear-gradient(180deg,rgba(5,4,3,.12)_0%,rgba(5,4,3,.34)_52%,rgba(5,4,3,.98)_100%)]" />
        <div className="amazon-pattern absolute inset-0 z-[2]" />
        <div className="grain z-[2]" />

        <div className="section-shell relative z-10 grid min-h-[calc(94svh-96px)] items-end pb-12">
          <div className="max-w-6xl">
            <motion.p
              className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.2em] text-yellow"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            >
              Manchete viva
            </motion.p>
            <motion.h1
              className="display max-w-6xl text-[clamp(54px,10.8vw,148px)] leading-[0.82] text-paper"
              initial={{ opacity: 0, y: 34, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.76, ease: [0.22, 1, 0.36, 1] }}
            >
              {featured.title}
            </motion.h1>
            <motion.div
              className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,680px)_auto] lg:items-end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.14em] text-yellow">
                  <span>{featured.category}</span>
                  <span className="h-px w-8 bg-yellow/60" />
                  <span>{featured.date}</span>
                </div>
                <p className="max-w-2xl text-[clamp(18px,2vw,26px)] font-bold leading-tight text-paper/88">{featured.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <CTAButton href={featured.href} external>
                  Ler manchete
                </CTAButton>
                <CTAButton href="#news-digest" variant="ghost">
                  Ver bastidores
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="news-digest" className="section-shell py-20 lg:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Conteúdo emocional</p>
            <h2 className="display max-w-4xl text-[clamp(46px,7.8vw,104px)] leading-[0.86]">O clube por dentro da rodada.</h2>
          </div>
          <p className="max-w-2xl text-base font-semibold leading-7 text-paper/62">
            Notícias com bastidor, vídeo, fala direta e dado competitivo. A página fica mais perto de transmissão premium do que de mural institucional.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.article
            className="group relative min-h-[560px] overflow-hidden border border-paper/12 bg-ink"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={assets.trainingWide} alt="" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,.18)_0%,rgba(5,4,3,.26)_40%,rgba(5,4,3,.95)_100%)]" />
            <div className="amazon-pattern absolute inset-0 opacity-20" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
              <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Bastidores</p>
              <h3 className="display max-w-4xl text-[clamp(42px,6vw,82px)] leading-[0.88]">A história antes do apito.</h3>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-paper/68">
                Preparação, deslocamento, ambiente de grupo e torcida deixam a notícia com temperatura de jogo.
              </p>
            </div>
          </motion.article>

          <div className="grid gap-5">
            <motion.a
              className="focus-ring group relative min-h-[300px] overflow-hidden border border-paper/12 bg-black"
              href={youtubeLink}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.08, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <img className="absolute inset-0 h-full w-full object-cover object-[52%_30%] opacity-[0.78] transition duration-700 group-hover:scale-105" src={assets.heroTraining} alt="" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,3,.88),rgba(5,4,3,.2)),linear-gradient(180deg,rgba(5,4,3,.08),rgba(5,4,3,.82))]" />
              <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-yellow/72 bg-yellow text-black shadow-[0_18px_50px_rgba(0,0,0,.38)] transition group-hover:scale-105">
                <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-black" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Vídeo</p>
                <h3 className="display mt-3 text-[clamp(34px,4.5vw,58px)] leading-[0.9]">Bastidor em movimento.</h3>
              </div>
            </motion.a>

            <motion.div
              className="border border-paper/12 bg-paper/[0.04] p-6 md:p-7"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.14, duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-6 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Quotes</p>
              <div className="grid gap-6">
                {storyQuotes.map((item) => (
                  <figure className="border-l border-yellow/70 pl-5" key={item.quote}>
                    <blockquote className="text-[clamp(21px,2.4vw,30px)] font-extrabold leading-tight text-paper">{item.quote}</blockquote>
                    <figcaption className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.15em] text-paper/44">{item.source}</figcaption>
                  </figure>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {archiveStats.map((item) => (
            <motion.div
              className="border border-paper/12 bg-yellow text-black p-6"
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.54, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="display text-[clamp(46px,6vw,76px)] leading-none">{item.value}</p>
              <p className="mt-3 text-[12px] font-extrabold uppercase tracking-[0.12em]">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {editorialLanes.map((item) => (
              <motion.article
                className="border border-paper/12 bg-paper/[0.035] p-6 transition hover:border-yellow/70 hover:bg-paper/[0.06]"
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-7 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">{item.label}</p>
                <h3 className="display text-[clamp(30px,3.3vw,42px)] leading-[0.94]">{item.title}</h3>
                <p className="mt-5 text-sm font-semibold leading-6 text-paper/58">{item.text}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            className="flex flex-col justify-between border border-yellow/40 bg-[linear-gradient(135deg,rgba(242,195,25,.18),rgba(18,53,31,.18))] p-6 md:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Próximos passos</p>
              <h3 className="display max-w-xl text-[clamp(38px,5vw,66px)] leading-[0.9]">Cobertura com ritmo de competição grande.</h3>
            </div>
            <ol className="mt-10 grid gap-5">
              {nextSteps.map((item, index) => (
                <li className="grid grid-cols-[44px_1fr] gap-4 border-t border-paper/14 pt-5" key={item}>
                  <span className="display text-4xl leading-none text-yellow">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-extrabold uppercase leading-6 tracking-[0.06em] text-paper/72">{item}</span>
                </li>
              ))}
            </ol>
          </motion.aside>
        </div>
      </section>

      <section id="news-archive" className="section-shell pb-24">
        <div className="mb-10 grid gap-6 border-t border-paper/12 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Arquivo oficial</p>
            <h2 className="display max-w-3xl text-[clamp(44px,7vw,88px)] leading-[0.88]">Tudo que virou notícia.</h2>
          </div>
          <div className="grid gap-4">
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
