import { useMemo } from "react";
import { squad } from "../data/club.js";
import { PageTitle } from "../components/PageTitle.jsx";
import { VueIsland } from "../components/VueIsland.jsx";
import SquadExplorer from "../vue/SquadExplorer.vue";

export function SquadPage() {
  const squadProps = useMemo(() => ({ squad }), []);
  return (
    <main>
      <PageTitle
        eyebrow="Elenco"
        title="Rosto antes de lista."
        text="Filtro por posição, busca e leitura rápida do plantel profissional."
      />
      <section className="section-shell pb-24">
        <VueIsland component={SquadExplorer} props={squadProps} />
      </section>
    </main>
  );
}
