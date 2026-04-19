import { officialLinks } from"../data/club";
import { MembershipBuilder } from"../components/MembershipBuilder";
import { PageTitle } from"../components/PageTitle";
import { plans } from"../data/membership";

export function MembershipPage() {
  return (
    <main id="main-content">
      <PageTitle
        eyebrow="Sócio Amazonas"
        title="Benefício legível."
        text="Comparação de planos, prioridade e estimativa mensal sem esconder a decisão."
      />
      <section className="section-shell grid gap-10 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        <MembershipBuilder plans={plans} />
        <div className="glass p-6 md:p-8">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Conversão</p>
          <h2 className="display mt-5 text-[clamp(42px,5vw,62px)] leading-[0.94]">O sócio precisa ver o ganho antes do formulário.</h2>
          <p className="mt-5 text-sm font-semibold leading-7 text-paper/64">
            Prioridade, check-in e desconto devem aparecer antes de cadastro, CPF e pagamento. O torcedor decide com menos atrito.
          </p>
          <a className="focus-ring mt-7 inline-flex rounded-[8px] bg-yellow px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-black hover:bg-yellow-soft" href={officialLinks.socio} target="_blank" rel="noreferrer">
            Ir ao sócio oficial
          </a>
        </div>
      </section>
    </main>
  );
}
