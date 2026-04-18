import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { assets, timeline } from "../data/club.js";
import { MotionSection } from "../components/MotionSection.jsx";

const historyParagraphs = [
  "Fundado em 23 de maio de 2019 por um grupo de amigos empresários e sediado em Manaus, o Amazonas FC recebe o nome do Estado mais importante da região Norte e o maior em território no País. Com as cores amarelo e preto e com a Onça-pintada como mascote, surpreendeu os manauaras ao conseguir o acesso para a elite do futebol local em menos de seis meses de história.",
  "Logo em seu primeiro ano de existência, o Amazonas venceu a Série B do Estadual de maneira invicta e indiscutível. Em 2022, ao debutar em uma competição nacional, o Aurinegro liderou seu grupo na primeira fase, conquistou o acesso à Série C e terminou o certame com o melhor ataque, a terceira melhor campanha e os dois artilheiros da Quarta Divisão; o meia Rafael Tavares e o atacante Ítalo.",
  "No ano seguinte, a Onça-pintada conquistou duas taças de primeira grandeza; o Campeonato Amazonense 2023 e o Campeonato Brasileiro Série C 2023, o primeiro título nacional não apenas do clube, mas do futebol local, além de ter feito, mais uma vez, o artilheiro do certame; o atacante Sassá, com 18 gols.",
  "Ao participar pela primeira vez da Série B do Brasileiro, em 2024, o Aurinegro fez uma campanha sólida e terminou a competição em 11º lugar, com 52 pontos conquistados. Nesta mesma temporada, chegou à terceira fase da Copa do Brasil e ficou com o vice-campeonato amazonense.",
  "Nesta temporada, a Onça faturou o seu segundo título estadual ao derrotar o Nacional em uma decisão emocionante pelo placar de 2 a 1, com gol marcado nos minutos finais de jogo. Atualmente, a equipe é a única representante do Amazonas na Série B.",
];

const identityBlocks = [
  {
    title: "Missão",
    text: "Proporcionar entretenimento e diversão ao público em geral por meio de espetáculos esportivos de qualidade, com responsabilidade social e ambiental.",
  },
  {
    title: "Visão",
    text: "Elevar o estado do Amazonas ao mais alto nível do futebol nacional.",
  },
  {
    title: "Nosso propósito",
    text: "Entregar orgulho ao torcedor amazonense.",
  },
  {
    title: "Nosso foco",
    text: "Pessoas desportistas, que amam futebol e o Amazonas e que procuram um time competitivo para torcer nacionalmente.",
  },
  {
    title: "Nosso objetivo",
    text: "Manter o protagonismo esportivo, sendo campeão amazonense e ascendendo à Série A do Campeonato Brasileiro.",
  },
];

const valueList = [
  "Fome de vitória",
  "Nunca desistir",
  "Humildade dentro e fora de campo",
  "Compromisso com o ESG",
  "Deixar um legado",
];

const quickStats = [
  { label: "Fundado", value: "2019" },
  { label: "Título nacional", value: "Série C 2023" },
  { label: "Estadual", value: "Bi 2023 e 2025" },
  { label: "Base", value: "Manaus - AM" },
];

function QuickStatCard({ label, value }) {
  return (
    <article className="rounded-[8px] border border-paper/12 bg-[linear-gradient(180deg,rgba(246,240,223,0.06),rgba(246,240,223,0.02)),rgba(5,4,3,0.72)] px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-yellow/40">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-yellow">{label}</p>
      <p className="display mt-3 text-[clamp(28px,3vw,42px)] leading-none text-paper">{value}</p>
    </article>
  );
}

export function HistoryPage() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1.02, 1.02] : [1.08, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0.78]);

  return (
    <main>
      <section
        ref={heroRef}
        className="relative -mt-[86px] overflow-hidden border-b border-paper/10 pt-[86px] lg:-mt-[84px] lg:pt-[84px]"
      >
        <div className="absolute inset-0">
          <motion.img
            alt=""
            className="h-full w-full object-cover object-[20%_18%] will-change-transform md:object-[22%_16%] lg:object-[22%_12%]"
            src={assets.historyHero}
            style={{ y: imageY, scale: imageScale }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.74)_0%,rgba(5,4,3,0.4)_14%,rgba(5,4,3,0.12)_30%,transparent_44%),linear-gradient(90deg,rgba(5,4,3,0.42)_0%,rgba(5,4,3,0.22)_24%,rgba(5,4,3,0.76)_56%,rgba(5,4,3,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(5,4,3,0.28),transparent_22%),radial-gradient(circle_at_76%_30%,rgba(242,195,25,0.12),transparent_26%)]" />

        <div className="page-shell relative flex min-h-[560px] items-end py-16 md:min-h-[620px] lg:min-h-[680px] lg:justify-end">
          <motion.div className="w-full max-w-[620px]" style={{ y: contentY, opacity: contentOpacity }}>
            <div className="gold-line mb-8 w-full max-w-[120px] opacity-90" />
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">História</p>
            <h1 className="display max-w-[10ch] text-[clamp(42px,7vw,112px)] leading-[0.84] text-paper">
              Clube novo, trajeto raro.
            </h1>
            <p className="mt-6 max-w-[32ch] text-base font-semibold leading-8 text-paper/80 md:text-lg">
              A narrativa do Amazonas precisa ligar fundação, acesso, título nacional e consolidação regional sem perder o peso simbólico da Onça.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="page-shell relative -mt-3 pb-12 pt-0 md:-mt-8">
        <MotionSection className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((item) => (
            <QuickStatCard key={item.label} label={item.label} value={item.value} />
          ))}
        </MotionSection>
      </div>

      <MotionSection className="section-shell grid gap-12 py-18 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-24">
        <div className="overflow-hidden rounded-[8px] border border-paper/12 lg:sticky lg:top-28">
          <img className="aspect-[0.95] w-full object-cover" src={assets.trainingWide} alt="" />
        </div>
        <div className="grid gap-0 border-t border-paper/14">
          {timeline.map((item) => (
            <article className="grid gap-4 border-b border-paper/14 py-10 md:grid-cols-[140px_1fr]" key={`${item.year}-${item.title}`}>
              <span className="display text-5xl text-yellow">{item.year}</span>
              <div>
                <h2 className="display text-4xl leading-none">{item.title}</h2>
                <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-paper/74">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="section-shell border-t border-paper/12 py-18 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,0.32fr)_minmax(0,0.68fr)]">
          <div>
            <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">História institucional</p>
            <h2 className="display max-w-[8ch] text-[clamp(38px,5vw,64px)] leading-[0.9] text-paper">
              Origem, acesso e consolidação.
            </h2>
          </div>
          <div className="grid gap-6">
            {historyParagraphs.map((paragraph) => (
              <p className="max-w-[74ch] text-[15px] font-semibold leading-8 text-paper/76 md:text-base" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="section-shell border-t border-paper/12 py-18 pb-24 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <div className="grid gap-5 md:grid-cols-2">
            {identityBlocks.map((item) => (
              <article
                className="rounded-[8px] border border-paper/10 bg-paper/[0.03] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-yellow/30 hover:bg-paper/[0.04]"
                key={item.title}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">{item.title}</p>
                <p className="mt-4 text-sm font-semibold leading-7 text-paper/76">{item.text}</p>
              </article>
            ))}
          </div>

          <article className="rounded-[8px] border border-paper/10 bg-[linear-gradient(180deg,rgba(242,195,25,0.12),rgba(242,195,25,0.04))] p-5">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-yellow">Valores</p>
            <div className="mt-5 grid gap-3">
              {valueList.map((value, index) => (
                <div
                  className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3 rounded-[8px] border border-paper/10 bg-black/18 px-4 py-3 transition duration-300 hover:border-yellow/24 hover:bg-black/24"
                  key={value}
                >
                  <span className="display text-2xl leading-none text-yellow">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm font-extrabold uppercase leading-6 text-paper">{value}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </MotionSection>
    </main>
  );
}
