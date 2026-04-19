import { CTAButton } from"../components/CTAButton";

export function NotFoundPage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="overflow-hidden rounded-[8px] border border-paper/10 bg-[linear-gradient(180deg,rgba(246,240,223,0.04),rgba(246,240,223,0.01)),rgba(5,4,3,0.86)] px-6 py-16 md:px-8">
        <p className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-yellow">404</p>
        <h1 className="display max-w-[10ch] text-[clamp(40px,6vw,78px)] leading-[0.88] text-paper">Página não encontrada.</h1>
        <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-paper/66">
          A rota pedida não existe nesta vitrine. Use a home ou siga para matchday e notícias.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton href="/">Voltar ao início</CTAButton>
          <CTAButton href="/matchday" variant="ghost">
            Ir para matchday
          </CTAButton>
        </div>
      </section>
    </main>
  );
}
