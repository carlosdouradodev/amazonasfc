import { useMemo } from "react";
import { matches, officialLinks } from "../data/club.js";
import { CompetitionSnapshot } from "../components/CompetitionSnapshot.jsx";
import { PageTitle } from "../components/PageTitle.jsx";
import { VueIsland } from "../components/VueIsland.jsx";
import MatchConsole from "../vue/MatchConsole.vue";

export function MatchdayPage() {
  const matchProps = useMemo(() => ({ matches }), []);
  const steps = [
    ["1", "Escolha o jogo", "Calendário, horário, estádio e status ficam no topo."],
    ["2", "Confirme entrada", "Sócio tem caminho direto para check-in e compra."],
    ["3", "Acompanhe conteúdo", "TV Onça e notícias entram no fluxo de partida."],
  ];

  return (
    <main>
      <PageTitle
        eyebrow="Matchday"
        title="Partida sem ruído."
        text="Uma central para ingresso, serviço, transmissão, estádio e chamadas comerciais."
      />
      <CompetitionSnapshot />
      <section className="section-shell grid gap-10 pb-24 lg:grid-cols-[1.1fr_0.9fr]">
        <VueIsland component={MatchConsole} props={matchProps} />
        <div className="grid content-start gap-4">
          {steps.map(([number, title, text]) => (
            <div className="grid grid-cols-[44px_1fr] gap-4 border-b border-paper/12 pb-5" key={number}>
              <span className="display flex h-11 w-11 items-center justify-center rounded-[4px] bg-yellow text-2xl text-black">{number}</span>
              <div>
                <h2 className="display text-4xl leading-none">{title}</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-paper/62">{text}</p>
              </div>
            </div>
          ))}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a className="focus-ring rounded-[4px] bg-yellow px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-yellow-soft" href={officialLinks.socio} target="_blank" rel="noreferrer">
              Área do sócio
            </a>
            <a className="focus-ring rounded-[4px] border border-paper/20 px-5 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.08em] text-paper/76 hover:border-yellow hover:text-yellow" href={officialLinks.site} target="_blank" rel="noreferrer">
              Site oficial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
