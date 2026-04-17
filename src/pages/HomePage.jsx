import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assets, matches, news, officialLinks, plans, stats } from "../data/club.js";
import { CTAButton } from "../components/CTAButton.jsx";
import { MotionSection } from "../components/MotionSection.jsx";
import { NewsCard } from "../components/NewsCard.jsx";
import { SectionHeader } from "../components/SectionHeader.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { VueIsland } from "../components/VueIsland.jsx";
import { CompetitionSnapshot } from "../components/CompetitionSnapshot.jsx";
import { HonorsShowcase } from "../components/HonorsShowcase.jsx";
import { MatchPulseBar } from "../components/MatchPulseBar.jsx";
import MatchConsole from "../vue/MatchConsole.vue";
import MembershipBuilder from "../vue/MembershipBuilder.vue";

export function HomePage() {
  const matchProps = useMemo(() => ({ matches }), []);
  const planProps = useMemo(() => ({ plans }), []);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 76]);
  const heroScale = useTransform(scrollY, [0, 700], [1.03, 1.1]);

  return (
    <main>
      <section className="hero-mask relative min-h-[92svh] overflow-hidden pt-24">
        <motion.img
          className="absolute inset-0 z-0 h-full w-full object-cover object-[54%_46%]"
          src={assets.heroTraining}
          alt=""
          style={{ y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,4,3,.94)_0%,rgba(5,4,3,.72)_38%,rgba(5,4,3,.22)_74%),linear-gradient(180deg,rgba(5,4,3,.08)_0%,rgba(5,4,3,.34)_58%,rgba(5,4,3,.95)_100%)]" />
        <div className="amazon-pattern absolute inset-0 z-[2]" />
        <div className="grain z-[2]" />

        <div className="section-shell relative z-10 grid min-h-[calc(92svh-96px)] items-end pb-10 lg:pb-14">
          <div className="max-w-5xl">
            <motion.p
              className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.2em] text-yellow"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Manaus, Amazonas
            </motion.p>
            <motion.h1
              className="display text-[clamp(52px,12vw,168px)] leading-[0.82] text-paper"
              initial={{ opacity: 0, y: 34, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Amazonas FC
            </motion.h1>
            <motion.p
              className="mt-6 max-w-3xl text-[clamp(20px,2.2vw,32px)] font-bold leading-tight text-paper/95"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Manaus joga junto. A Onça entra em campo para transformar liderança em noite de arquibancada cheia.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton href={officialLinks.socio} external>Seja Sócio, Entre para a Onça</CTAButton>
              <CTAButton href={officialLinks.ingressos} variant="ghost" external>Comprar ingressos</CTAButton>
            </div>

            <div className="mt-10 grid max-w-5xl grid-cols-2 overflow-hidden border border-paper/14 bg-black/66 shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-md lg:grid-cols-4">
              {stats.map((item) => (
                <StatCard item={item} key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MatchPulseBar />

      <CompetitionSnapshot />

      <MotionSection className="section-shell grid gap-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Central do torcedor</p>
          <h2 className="display text-[clamp(44px,7vw,90px)] leading-[0.92]">Dia de jogo com menos atrito.</h2>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-paper/64">
            Confronto, horário, estádio, check-in, serviço e TV ficam no mesmo fluxo.
          </p>
          <div className="mt-8 grid gap-4 border-l border-yellow/60 pl-5 text-sm font-bold leading-6 text-paper/66">
            <p>Quem vai ao estádio encontra o caminho direto.</p>
            <p>Quem acompanha de fora acha transmissão e contexto sem busca lateral.</p>
          </div>
        </div>
        <VueIsland component={MatchConsole} props={matchProps} />
      </MotionSection>

      <section className="section-shell py-24">
        <SectionHeader
          eyebrow="Notícias"
          title="Manchete primeiro, ruído depois."
          text="Uma matéria domina a tela. As chamadas secundárias mantêm hierarquia clara e imagem em evidência."
          action={<CTAButton href="#/noticias" variant="ghost">Todas as notícias</CTAButton>}
        />
        <div className="grid gap-5 lg:grid-cols-12">
          <NewsCard item={news[0]} large />
          <div className="grid gap-5 lg:col-span-5">
            {news.slice(1, 4).map((item) => <NewsCard item={item} key={item.id} />)}
          </div>
        </div>
      </section>

      <MotionSection className="section-shell grid gap-12 py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div className="relative overflow-hidden border border-paper/12">
          <img className="aspect-[1.05] h-full w-full object-cover" src={assets.heroTraining} alt="" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,4,3,.86))]" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-yellow">Sócio Amazonas</p>
            <h2 className="display mt-3 max-w-md text-[clamp(42px,5vw,64px)] leading-[0.94]">Valor antes do cadastro.</h2>
          </div>
        </div>
        <div>
          <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Sócio</p>
          <h2 className="display text-[clamp(44px,7vw,86px)] leading-[0.92]">Comparação que decide rápido.</h2>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-paper/64">
            O torcedor vê prioridade, benefício e custo antes de sair para o cadastro oficial.
          </p>
          <VueIsland className="mt-8" component={MembershipBuilder} props={planProps} />
          <CTAButton className="mt-7" href={officialLinks.socio} external>
            Abrir sócio oficial
          </CTAButton>
        </div>
      </MotionSection>

      <HonorsShowcase />
    </main>
  );
}
