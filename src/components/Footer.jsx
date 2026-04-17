import { assets, navItems, officialLinks, socialLinks } from "../data/club.js";
import { CTAButton } from "./CTAButton.jsx";

const socialCodes = {
  X: "X",
  Facebook: "F",
  Instagram: "IG",
  YouTube: "YT",
  Flickr: "FL",
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-offblack text-paper">
      <div className="section-shell relative grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          <img className="mb-8 h-16 w-auto" src={assets.logo} alt="Escudo Amazonas FC" />
          <p className="display max-w-2xl text-[clamp(46px,7vw,88px)] leading-[0.9]">Amazonas FC</p>
          <p className="mt-6 max-w-lg text-sm font-semibold leading-7 text-paper/58">
            Clube de Manaus, campeão brasileiro da Série C 2023 e bicampeão amazonense. Presença digital com foco em jogo, torcida e marca.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href={officialLinks.socio} external>Seja sócio</CTAButton>
            <CTAButton href={officialLinks.loja} variant="ghost" external>Loja oficial</CTAButton>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Navegação</p>
            <nav className="grid gap-3" aria-label="Rodapé">
              {navItems.map((item) => (
                <a className="display w-fit text-3xl leading-none text-paper/78 transition hover:text-yellow" href={`#${item.path}`} key={item.path}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-yellow">Canais</p>
            <nav className="grid gap-3" aria-label="Sociais">
              {socialLinks.map((item) => (
                <a
                  className="group flex w-fit items-center gap-3 text-sm font-extrabold uppercase text-paper/58 transition hover:text-yellow"
                  href={item.href}
                  key={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-paper/14 text-[10px] text-yellow transition group-hover:border-yellow group-hover:bg-yellow group-hover:text-black">
                    {socialCodes[item.label] ?? item.label.slice(0, 2)}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="section-shell flex flex-col gap-3 py-5 text-xs font-extrabold uppercase text-paper/44 sm:flex-row sm:items-center sm:justify-between">
          <span>Amazonas FC</span>
          <span className="text-yellow">Identidade preta e dourada, futebol de Manaus</span>
        </div>
      </div>
    </footer>
  );
}
