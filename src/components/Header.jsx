import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { assets, navItems, officialLinks } from "../data/club.js";
import { CTAButton } from "./CTAButton.jsx";

const desktopNavPaths = new Set(["/", "/matchday", "/noticias", "/elenco", "/socio"]);
const desktopNavItems = navItems.filter((item) => desktopNavPaths.has(item.path));

export function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  const compact = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        compact ? "border-b border-yellow/18 bg-black/92 shadow-[0_20px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl" : "border-b border-paper/10 bg-black/58 backdrop-blur-xl"
      }`}
    >
      <div
        className={`mx-auto flex w-[min(1200px,calc(100vw-28px))] items-center justify-between gap-5 transition-all duration-500 ${
          compact ? "h-[66px]" : "h-[84px]"
        }`}
      >
        <a href="#/" className="focus-ring flex min-w-0 items-center gap-3">
          <img className={`${compact ? "h-10" : "h-12"} w-auto transition-all duration-500`} src={assets.logo} alt="Escudo Amazonas FC" />
          <span className="brand-wordmark display truncate text-[22px] leading-none text-paper">Amazonas FC</span>
        </a>

        <nav className="hidden items-center gap-1 border border-paper/16 bg-black/38 p-1 shadow-[inset_0_0_0_1px_rgba(242,195,25,.08)] backdrop-blur-md lg:flex" aria-label="Principal">
          {desktopNavItems.map((item) => (
            <a
              key={item.path}
              className={`focus-ring group relative px-3.5 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] transition hover:text-paper ${
                route === item.path ? "bg-yellow text-black shadow-[inset_0_-4px_0_rgba(5,4,3,.72)]" : "text-paper/74"
              }`}
              href={`#${item.path}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CTAButton className="px-5 py-3" href={officialLinks.loja} variant="ghost" external>
              Loja
            </CTAButton>
          </div>
          <div className="header-join">
            <CTAButton className="px-5 py-3" href={officialLinks.socio} external>
              <span className="hidden sm:inline">Seja </span>sócio
            </CTAButton>
          </div>
          <button
            className="mobile-menu-button focus-ring"
            style={{
              position: "fixed",
              left: 74,
              top: 20,
              zIndex: 80,
              width: 44,
              height: 44,
              border: "1px solid rgba(242, 195, 25, 0.72)",
              borderRadius: 4,
              background: "rgba(5, 4, 3, 0.58)",
            }}
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 20,
                height: 2,
                background: "#f2c319",
                transform: open ? "translate(-50%, -50%) rotate(45deg)" : "translate(-50%, calc(-50% - 6px))",
                transition: "transform 180ms ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 20,
                height: 2,
                background: "#f2c319",
                transform: open ? "translate(-50%, -50%) rotate(-45deg)" : "translate(-50%, calc(-50% + 6px))",
                transition: "transform 180ms ease",
              }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-paper/10 bg-black/96 lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="px-5 py-4" aria-label="Mobile">
              {navItems.map((item, index) => (
                <motion.a
                  className={`display block border-b border-paper/10 py-4 text-4xl leading-none ${
                    route === item.path ? "text-yellow" : "text-paper"
                  }`}
                  href={`#${item.path}`}
                  key={item.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.035, duration: 0.25 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
