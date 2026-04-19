import { useEffect, useMemo, useState } from"react";
import { AnimatePresence, motion } from"framer-motion";
import { assets, officialLinks } from"../data/club";
import { institutionalNavItems, primaryNavItems } from"../data/siteSections";

function isActiveRoute(route, path) {
  if (path ==="/") {
    return route ==="/";
  }

  return route === path || route.startsWith(`${path}/`);
}

function childMatchesRoute(route, child) {
  return isActiveRoute(route, child.path) || child.aliases?.some((alias) => isActiveRoute(route, alias));
}

function matchesItem(route, item) {
  if (item.children?.length) {
    return item.children.some((child) => childMatchesRoute(route, child));
  }

  return isActiveRoute(route, item.path);
}

function DesktopLink({ item, route }) {
  const active = matchesItem(route, item);
  const groupCount = item.groups?.length ?? 0;
  const multiColumn = groupCount > 1;

  if (!item.children?.length) {
    return (
      <a
        className={`focus-ring relative py-2 text-[13px] font-bold uppercase tracking-[0.08em] transition ${
          active ?"text-paper" :"text-paper/78 hover:text-yellow"
        }`}
        href={item.path}
        aria-current={active ?"page" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="group relative">
      <a
        className={`focus-ring relative flex items-center gap-2 py-2 text-[13px] font-bold uppercase tracking-[0.08em] transition ${
          active ?"text-paper" :"text-paper/78 hover:text-yellow"
        }`}
        href={item.path}
        aria-current={active ?"page" : undefined}
      >
        <span>{item.label}</span>
        <span className={`mb-0.5 h-1.5 w-1.5 rotate-45 border-b-2 border-r-2 transition ${active ?"border-paper" :"border-yellow/72"}`} />
      </a>
      <div className="pointer-events-none absolute left-1/2 top-full z-40 -translate-x-1/2 translate-y-3 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="w-max max-w-[calc(100vw-32px)] overflow-hidden rounded-[12px] border border-paper/12 bg-[linear-gradient(180deg,rgba(13,12,9,.98),rgba(5,4,3,.96))] p-4 shadow-[0_24px_70px_rgba(0,0,0,.36)] backdrop-blur-2xl">
          <div className={`grid gap-4 ${multiColumn ?"grid-cols-2" :"grid-cols-1"}`}>
            {item.groups?.map((group) => (
              <div className="w-[160px] space-y-2" key={group.label}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow/74">{group.label}</p>
                <div className="grid gap-2">
                  {group.items.map((child) => {
                    const childActive = childMatchesRoute(route, child);
                    return (
                      <a
                        className={`focus-ring flex items-center justify-between rounded-[8px] px-3 py-3 text-[11px] font-extrabold uppercase tracking-[0.08em] transition ${
                          childActive ?"bg-yellow text-black" :"border border-paper/10 bg-paper/[0.03] text-paper/72 hover:border-yellow/32 hover:text-yellow"
                        }`}
                        href={child.path}
                        key={child.path}
                        aria-current={childActive ?"page" : undefined}
                      >
                        <span>{child.label}</span>
                        <span className={`h-1.5 w-1.5 rounded-full ${childActive ?"bg-black/72" :"bg-yellow/54"}`} />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

  const clubItem = primaryNavItems.find((item) => item.label ==="Clube");
  const footballItem = primaryNavItems.find((item) => item.label ==="Futebol");

  const desktopNavItems = useMemo(
    () => [
      { label:"Partidas", path:"/matchday" },
      {
        label:"Clube",
        path: clubItem?.path ??"/clube/historia",
        children: clubItem?.children ?? [],
        groups: [
          { label:"Clube", items: clubItem?.children ?? [] },
        ],
      },
      {
        label:"Futebol",
        path: footballItem?.path ??"/futebol/profissional",
        children: footballItem?.children ?? [],
        groups: [{ label:"Futebol", items: footballItem?.children ?? [] }],
      },
      { label:"Notícias", path:"/noticias" },
      { label:"Elenco", path:"/elenco" },
    ],
    [clubItem, footballItem],
  );

  const compact = scrolled || open;
  const isHistoryRoute = route ==="/historia" || route ==="/clube/historia";
  const immersiveHero = isHistoryRoute && !compact;
  const compactHistory = isHistoryRoute && compact;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        compactHistory
          ?"border-b border-yellow/10 bg-[linear-gradient(180deg,rgba(5,4,3,0.92)_0%,rgba(5,4,3,0.84)_56%,rgba(5,4,3,0.72)_100%),linear-gradient(90deg,rgba(36,23,10,0.42)_0%,rgba(36,23,10,0.28)_18%,rgba(36,23,10,0.14)_34%,rgba(36,23,10,0.08)_52%,transparent_72%)] shadow-[0_20px_70px_rgba(0,0,0,.22)] backdrop-blur-xl"
          : compact
            ?"border-b border-yellow/10 bg-black/92 shadow-[0_20px_70px_rgba(0,0,0,.3)] backdrop-blur-2xl"
            : immersiveHero
              ?"border-b border-yellow/10 bg-[linear-gradient(180deg,rgba(5,4,3,0.84)_0%,rgba(5,4,3,0.5)_58%,rgba(5,4,3,0.16)_100%),linear-gradient(90deg,rgba(36,23,10,0.42)_0%,rgba(36,23,10,0.28)_18%,rgba(36,23,10,0.14)_34%,rgba(36,23,10,0.08)_52%,transparent_72%)]"
              :"border-b border-paper/10 bg-black/74 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-16 w-[min(1280px,calc(100vw-28px))] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="focus-ring flex min-w-0 items-center gap-3">
          <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-[10px] border border-yellow/18 bg-yellow/[0.08] shadow-[0_10px_30px_rgba(242,195,25,.16)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,195,25,.16),transparent_60%)]" />
            <img className="relative z-10 h-9 w-auto" src={assets.logo} alt="Escudo Amazonas FC" />
          </span>
          <span className="brand-wordmark hidden truncate text-[21px] font-bold uppercase leading-none tracking-[0.02em] text-paper lg:block">
            Amazonas FC
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {desktopNavItems.map((item) => (
            <DesktopLink item={item} route={route} key={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button className="focus-ring text-[13px] font-bold uppercase tracking-[0.08em] text-paper/82 transition hover:text-yellow" type="button">
            PT-BR
          </button>
          <a
            className="focus-ring rounded-[12px] bg-yellow px-5 py-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-black shadow-[0_14px_38px_rgba(242,195,25,.22)] transition hover:brightness-105"
            href={officialLinks.ingressos}
            target="_blank"
            rel="noreferrer"
          >
            Ingressos
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <a
            className="focus-ring hidden rounded-[10px] bg-yellow px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-black shadow-[0_12px_32px_rgba(242,195,25,.22)] sm:inline-flex"
            href={officialLinks.ingressos}
            target="_blank"
            rel="noreferrer"
          >
            Ingressos
          </a>
          <button
            className={`focus-ring relative grid h-11 w-11 place-items-center overflow-hidden rounded-[10px] border transition duration-300 ${
              open
                ?"border-yellow bg-yellow text-black shadow-[0_14px_38px_rgba(242,195,25,.22)]"
                :"border-yellow/36 bg-yellow/[0.06] text-yellow hover:border-yellow hover:bg-yellow/[0.12]"
            }`}
            type="button"
            aria-label={open ?"Fechar menu" :"Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,195,25,.16),transparent_58%)]" />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition duration-200 ${
                open ?"-translate-y-1/2 rotate-45 bg-black" :"-translate-y-[7px] bg-yellow"
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full transition duration-200 ${
                open ?"-translate-y-1/2 -rotate-45 bg-black" :"translate-y-[7px] bg-yellow"
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height:"auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto w-[min(1280px,calc(100vw-28px))] border-t border-paper/10 px-4 pb-5 pt-4 sm:px-6">
              <nav className="grid gap-3" aria-label="Mobile" id="mobile-navigation">
                {desktopNavItems.map((item, index) =>
                  item.children?.length ? (
                    <motion.div
                      className="space-y-3 rounded-[12px] border border-paper/10 bg-paper/[0.03] p-4"
                      key={item.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035, duration: 0.25 }}
                    >
                      <a
                        className={`display flex items-center justify-between text-[clamp(24px,7vw,34px)] leading-none transition ${
                          matchesItem(route, item) ?"text-yellow" :"text-paper hover:text-yellow"
                        }`}
                        href={item.path}
                        aria-current={matchesItem(route, item) ?"page" : undefined}
                      >
                        <span>{item.label}</span>
                        <span className={`h-2 w-2 rounded-full ${matchesItem(route, item) ?"bg-yellow" :"bg-paper/18"}`} />
                      </a>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {item.groups?.map((group) => (
                          <div className="space-y-2" key={group.label}>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow/74">{group.label}</p>
                            <div className="grid gap-2">
                              {group.items.map((child) => {
                                const childActive = childMatchesRoute(route, child);
                                return (
                                  <a
                                    className={`flex items-center justify-between rounded-[8px] px-3 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] transition ${
                                      childActive ?"bg-yellow text-black" :"border border-paper/10 bg-paper/[0.03] text-paper/68 hover:border-yellow/32 hover:text-yellow"
                                    }`}
                                    href={child.path}
                                    key={child.path}
                                    aria-current={childActive ?"page" : undefined}
                                  >
                                    <span>{child.label}</span>
                                    <span className={`h-1.5 w-1.5 rounded-full ${childActive ?"bg-black/70" :"bg-yellow/56"}`} />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.a
                      className={`display flex items-center justify-between rounded-[12px] border px-4 py-4 text-[clamp(24px,7vw,34px)] leading-none transition ${
                        isActiveRoute(route, item.path)
                          ?"border-yellow/42 bg-yellow/[0.08] text-yellow"
                          :"border-paper/10 bg-paper/[0.03] text-paper hover:border-yellow/34 hover:text-yellow"
                      }`}
                      href={item.path}
                      key={item.path}
                      aria-current={isActiveRoute(route, item.path) ?"page" : undefined}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035, duration: 0.25 }}
                    >
                      <span>{item.label}</span>
                      <span className={`h-2 w-2 rounded-full ${isActiveRoute(route, item.path) ?"bg-yellow" :"bg-paper/16"}`} />
                    </motion.a>
                  ),
                )}
                <div className="grid gap-2 rounded-[12px] border border-paper/10 bg-paper/[0.03] p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-yellow">Institucional</p>
                  {institutionalNavItems.map((item) => (
                    <a
                      className={`flex items-center justify-between rounded-[8px] px-3 py-3 text-[12px] font-extrabold uppercase tracking-[0.12em] transition ${
                        isActiveRoute(route, item.path) ?"bg-yellow text-black" :"border border-paper/10 bg-paper/[0.03] text-paper/68 hover:border-yellow/32 hover:text-yellow"
                      }`}
                      href={item.path}
                      key={item.path}
                      aria-current={isActiveRoute(route, item.path) ?"page" : undefined}
                    >
                      <span>{item.label}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${isActiveRoute(route, item.path) ?"bg-black/70" :"bg-yellow/56"}`} />
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
