import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { assets, matches, officialLinks, plans, squad, stats } from "../data/club.js";
import { CTAButton } from "../components/CTAButton.jsx";
import { MotionSection } from "../components/MotionSection.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { VueIsland } from "../components/VueIsland.jsx";
import { HonorsShowcase } from "../components/HonorsShowcase.jsx";
import { MatchPulseBar } from "../components/MatchPulseBar.jsx";
import { HomeReferenceCompetitionSection } from "../components/HomeReferenceCompetitionSection.jsx";
import { HomeReferenceNewsSection } from "../components/HomeReferenceNewsSection.jsx";
import MembershipBuilder from "../vue/MembershipBuilder.vue";


const isFinalMatch = (match) => match.status?.toLowerCase() === "finalizado";

const homeSquadIds = ["diego", "joao", "renan", "fabiano", "iverton", "ph", "barbio", "tavares"];

function HomeSquadSpotlight() {
  const featuredPlayers = useMemo(
    () => homeSquadIds.map((id) => squad.find((player) => player.id === id)).filter(Boolean),
    [],
  );
  const [activeId, setActiveId] = useState(featuredPlayers[0]?.id ?? "");
  const activePlayer = featuredPlayers.find((player) => player.id === activeId) ?? featuredPlayers[0];
  const sectorSummary = useMemo(
    () => [
      ["Goleiros", squad.filter((player) => player.position === "Goleiro").length],
      ["Defesa", squad.filter((player) => ["Zagueiro", "Lateral"].includes(player.position)).length],
      ["Meio", squad.filter((player) => ["Volante", "Meio-campista"].includes(player.position)).length],
      ["Ataque", squad.filter((player) => player.position === "Atacante").length],
    ],
    [],
  );

  useEffect(() => {
    if (featuredPlayers.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = featuredPlayers.findIndex((player) => player.id === currentId);
        const nextIndex = (currentIndex + 1 + featuredPlayers.length) % featuredPlayers.length;
        return featuredPlayers[nextIndex].id;
      });
    }, 3200);

    return () => window.clearInterval(timer);
  }, [featuredPlayers]);

  if (!activePlayer) return null;

  return (
    <MotionSection className="relative overflow-hidden bg-yellow py-20 text-black">
      <div className="editorial-grid pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
      <div className="section-shell relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.2em] text-black/62">Elenco profissional</p>
            <h2 className="display max-w-[10ch] text-[clamp(48px,7vw,92px)] leading-[0.86] text-black">Plantel oficial.</h2>
            <p className="mt-5 max-w-2xl text-base font-extrabold leading-7 text-black/62">
              Retratos oficiais, setores claros e ficha de cada atleta em uma experiência mais direta.
            </p>
          </div>
          <CTAButton className="w-fit rounded-[8px] px-6" href="/#/elenco" variant="dark">
            Ver elenco completo
          </CTAButton>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-stretch">
          <motion.article
            key={activePlayer.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="grid min-h-[380px] overflow-hidden rounded-[8px] bg-black text-paper shadow-[0_28px_90px_rgba(0,0,0,.26)] md:grid-cols-[minmax(340px,1fr)_minmax(240px,300px)]"
          >
            <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden p-6 sm:p-8">
              <span className="display absolute left-5 top-4 text-[clamp(76px,8vw,112px)] leading-none text-yellow/12">
                {String(activePlayer.number).padStart(2, "0")}
              </span>
              <div className="relative z-10">
                <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">{activePlayer.position}</p>
                <h3 className="display max-w-full text-[clamp(38px,4.6vw,64px)] leading-[0.88]">{activePlayer.name}</h3>
                <p className="mt-5 max-w-md text-sm font-extrabold uppercase leading-6 text-paper/54">{activePlayer.fullName}</p>
                <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                  {[
                    ["Altura", activePlayer.height],
                    ["Origem", activePlayer.birthplace],
                    ["Pé", activePlayer.foot],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-paper/12 pt-3">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper/34">{label}</p>
                      <p className="mt-2 text-xs font-extrabold uppercase leading-tight text-paper">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative flex min-h-[320px] items-end justify-center bg-paper">
              <img className="h-full w-full object-contain object-bottom" src={activePlayer.image} alt={activePlayer.name} />
            </div>
          </motion.article>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {featuredPlayers.map((player) => {
              const active = player.id === activePlayer.id;
              return (
                <motion.button
                  key={player.id}
                  type="button"
                  onClick={() => setActiveId(player.id)}
                  onFocus={() => setActiveId(player.id)}
                  onPointerEnter={() => setActiveId(player.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group overflow-hidden rounded-[8px] border text-left transition ${
                    active ? "border-black bg-black text-paper" : "border-black/12 bg-black/[0.06] text-black hover:border-black/36"
                  }`}
                >
                  <div className="relative flex aspect-[4/4.45] items-end justify-center overflow-hidden bg-paper">
                    <img className="h-full w-full object-contain object-bottom transition duration-500 group-hover:scale-[1.045]" src={player.image} alt={player.name} />
                    <div className={`absolute inset-x-0 bottom-0 p-3 ${active ? "bg-black/82" : "bg-black/66"}`}>
                      <p className="display whitespace-normal break-words text-[clamp(20px,1.7vw,24px)] leading-[0.9] text-paper">{player.name}</p>
                      <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.13em] text-yellow">{player.position}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sectorSummary.map(([label, value]) => (
            <div key={label} className="rounded-[8px] border border-black/12 bg-black/[0.06] px-5 py-4">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-black/48">{label}</p>
              <p className="display mt-2 text-5xl leading-none text-black">{String(value).padStart(2, "0")}</p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function HomeSupporterCenter() {
  const activeMatch = matches.find((match) => !isFinalMatch(match)) ?? matches[0];
  const recentMatches = matches.slice(0, 2);

  if (!activeMatch) return null;

  return (
    <MotionSection className="section-shell py-24">
      <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
        <div>
          <p className="mb-4 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Central do torcedor</p>
          <h2 className="display max-w-[9ch] text-[clamp(48px,7vw,92px)] leading-[0.86]">Tudo do jogo.</h2>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-paper/64">
            Horário, estádio, entrada e transmissão em uma tela. O próximo compromisso fica no foco.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CTAButton className="rounded-[8px]" href={officialLinks.ingressos} external>
              Comprar ingresso
            </CTAButton>
            <CTAButton className="rounded-[8px]" href="/#/matchday" variant="ghost">
              Ver central completa
            </CTAButton>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-[8px] border border-paper/10 bg-[linear-gradient(180deg,rgba(246,240,223,0.055),rgba(246,240,223,0.018)),rgba(13,12,9,0.9)]">
          <div className="grid border-b border-paper/10 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-[8px] bg-yellow px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-black">{activeMatch.status}</span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-paper/40">{activeMatch.competition}</span>
              </div>
              <h3 className="display mt-6 max-w-[10ch] text-[clamp(48px,6vw,82px)] leading-[0.84] text-paper">
                {activeMatch.home} x {activeMatch.away}
              </h3>
            </div>

            <div className="grid min-w-0 grid-cols-2 border-t border-paper/10 xl:border-l xl:border-t-0">
              {recentMatches.map((match) => {
                const active = match.id === activeMatch.id;
                return (
                  <div key={match.id} className={`min-w-0 border-r border-paper/10 p-4 last:border-r-0 ${active ? "bg-yellow text-black" : "text-paper/46"}`}>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-72">{match.date}</p>
                    <p className="mt-3 break-words text-[12px] font-extrabold uppercase leading-tight">{match.home} x {match.away}</p>
                    <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.12em] opacity-64">{match.status}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-4 sm:p-7">
            {[
              ["Quando", `${activeMatch.date} / ${activeMatch.time}`],
              ["Onde", activeMatch.venue],
              ["Entrada", activeMatch.ticket],
              ["Transmissão", activeMatch.channel],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[8px] border border-paper/10 bg-black/30 px-4 py-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-paper/40">{label}</p>
                <p className="mt-2 text-sm font-extrabold uppercase leading-tight text-paper">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function HomePage() {
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
              <CTAButton className="min-h-[52px] rounded-[8px] px-6 shadow-[0_18px_48px_rgba(242,195,25,.16)]" href={officialLinks.socio} external>
                Seja Sócio, Entre para a Onça
              </CTAButton>
              <CTAButton
                className="min-h-[52px] rounded-[8px] border-paper/14 bg-black/42 px-6 text-paper shadow-[inset_0_0_0_1px_rgba(255,255,255,.02)]"
                href={officialLinks.ingressos}
                variant="ghost"
                external
              >
                Comprar ingressos
              </CTAButton>
            </div>

            <div className="mt-10 grid max-w-5xl grid-cols-2 overflow-hidden rounded-[8px] border border-paper/14 bg-black/66 shadow-[0_24px_80px_rgba(0,0,0,.32)] backdrop-blur-md lg:grid-cols-4">
              {stats.map((item) => (
                <StatCard item={item} key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MatchPulseBar />

      <HomeReferenceCompetitionSection />

      <HomeSupporterCenter />

      <HomeReferenceNewsSection />

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

      <HomeSquadSpotlight />
    </main>
  );
}
