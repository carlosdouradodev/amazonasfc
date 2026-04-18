import { assets, officialLinks, socialLinks } from "../data/club.js";
import { footerNavGroups } from "../data/siteSections.js";
import { CTAButton } from "./CTAButton.jsx";

function SocialIcon({ label }) {
  const iconClassName = "h-3.5 w-3.5";

  switch (label) {
    case "X":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 5L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "Facebook":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.3 21v-8h2.7l.4-3.1h-3.1V8c0-.9.2-1.5 1.5-1.5H16V3.8c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2h-2.3V13h2.3v8h2.7Z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.3" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "YouTube":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.3 8.4c-.2-1-.9-1.8-1.9-2C16.8 6 12 6 12 6s-4.8 0-6.4.4c-1 .2-1.7 1-1.9 2C3.3 10 3.3 12 3.3 12s0 2 .4 3.6c.2 1 .9 1.8 1.9 2 1.6.4 6.4.4 6.4.4s4.8 0 6.4-.4c1-.2 1.7-1 1.9-2 .4-1.6.4-3.6.4-3.6s0-2-.4-3.6Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M10.3 9.4L15 12l-4.7 2.6V9.4Z" fill="currentColor" />
        </svg>
      );
    case "Flickr":
      return (
        <svg className={iconClassName} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="8" cy="12" r="3.3" fill="currentColor" />
          <circle cx="16" cy="12" r="3.3" fill="currentColor" />
        </svg>
      );
    default:
      return <span className="text-[9px] font-extrabold uppercase">{label.slice(0, 2)}</span>;
  }
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-offblack text-paper">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:py-14">
        <div className="max-w-md">
          <img className="mb-5 h-14 w-auto" src={assets.logo} alt="Escudo Amazonas FC" />
          <p className="display text-[clamp(34px,4.6vw,62px)] leading-[0.92]">Amazonas FC</p>
          <p className="mt-4 text-sm font-semibold leading-7 text-paper/58">
            Clube de Manaus, campeao brasileiro da Serie C 2023 e bicampeao amazonense.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton className="min-h-10 px-4 py-2 text-[11px]" href={officialLinks.socio} external>Seja socio</CTAButton>
            <CTAButton className="min-h-10 px-4 py-2 text-[11px]" href={officialLinks.loja} variant="ghost" external>Loja oficial</CTAButton>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">{group.title}</p>
                <nav className="grid gap-2" aria-label={group.title}>
                  {group.items.map((item) => (
                    <a
                      className="w-fit text-sm font-extrabold uppercase tracking-[0.06em] text-paper/72 transition hover:text-yellow"
                      href={`#${item.path}`}
                      key={item.path}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-yellow">Canais</p>
            <nav className="flex flex-wrap gap-3" aria-label="Sociais">
              {socialLinks.map((item) => (
                <a
                  aria-label={item.label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-paper/10 bg-paper/[0.03] text-paper/64 transition hover:border-yellow/30 hover:text-yellow"
                  href={item.href}
                  key={item.label}
                  target="_blank"
                  rel="noreferrer"
                  title={item.label}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-paper/14 text-yellow transition group-hover:border-yellow group-hover:bg-yellow group-hover:text-black">
                    <SocialIcon label={item.label} />
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="section-shell flex flex-col gap-2 py-4 text-[11px] font-extrabold uppercase tracking-[0.08em] text-paper/42 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; 2026 Carlos Dantas</span>
          <span className="text-yellow">Projeto conceitual nao oficial inspirado no Amazonas FC</span>
        </div>
      </div>
    </footer>
  );
}
