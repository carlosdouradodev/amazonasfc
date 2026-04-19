import { Suspense, lazy, useEffect, useMemo, useState } from"react";
import { Header } from"./components/Header";
import { Footer } from"./components/Footer";
import { SiteLoader } from"./components/SiteLoader";
import { news } from"./data/news";
import { defaultRouteMeta, getRouteMeta } from"./data/routeMeta";
import { sectionPageRoutes } from"./data/siteSections";
import { buildCanonicalUrl, buildRouteUrl, canHandleClientNavigation, normalizeLegacyHash, routeFromHref, routeFromLocation } from"./lib/routes";

const lazyPage = (loader, exportName) =>
  lazy(() =>
    loader().then((module) => ({
      default: module[exportName],
    })),
  );

const HomePage = lazyPage(() => import("./pages/HomePage"),"HomePage");
const MatchdayPage = lazyPage(() => import("./pages/MatchdayPage"),"MatchdayPage");
const NewsPage = lazyPage(() => import("./pages/NewsPage"),"NewsPage");
const SquadPage = lazyPage(() => import("./pages/SquadPage"),"SquadPage");
const MembershipPage = lazyPage(() => import("./pages/MembershipPage"),"MembershipPage");
const StorePage = lazyPage(() => import("./pages/StorePage"),"StorePage");
const HistoryPage = lazyPage(() => import("./pages/HistoryPage"),"HistoryPage");
const SectionPage = lazyPage(() => import("./pages/SectionPage"),"SectionPage");
const NotFoundPage = lazyPage(() => import("./pages/NotFoundPage"),"NotFoundPage");

const pages = {"/": HomePage,"/noticias": NewsPage,"/elenco": SquadPage,"/socio": MembershipPage,"/loja": StorePage,"/matchday": MatchdayPage,"/historia": HistoryPage,"/clube/historia": HistoryPage,"/clube/simbolos": SectionPage,"/clube/titulos": SectionPage,"/clube/curiosidades": SectionPage,"/futebol/profissional": SectionPage,"/futebol/base": SectionPage,"/institucional/estatuto": SectionPage,"/institucional/transparencia": SectionPage,"/institucional/comercial": SectionPage,"/institucional/imprensa": SectionPage,
};

const resolvePage = (route) => {
  if (route.startsWith("/noticias/")) {
    return news.some((item) => item.path === route) ? NewsPage : NotFoundPage;
  }

  if (sectionPageRoutes.includes(route)) {
    return SectionPage;
  }

  return pages[route] ?? NotFoundPage;
};

function PageFallback() {
  return (
    <main id="main-content" className="section-shell py-24">
      <div className="overflow-hidden rounded-[8px] border border-paper/10 bg-paper/[0.025] px-6 py-10">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-yellow">Carregando</p>
        <div className="mt-4 h-7 w-48 rounded-full bg-paper/10" />
        <div className="mt-3 h-3 w-full max-w-xl rounded-full bg-paper/[0.06]" />
      </div>
    </main>
  );
}

function updateMetaTag(selector, content) {
  const element = document.head.querySelector(selector);
  if (element && content) {
    element.setAttribute("content", content);
  }
}

function updateLinkTag(selector, href) {
  const element = document.head.querySelector(selector);
  if (element && href) {
    element.setAttribute("href", href);
  }
}

export default function App() {
  const [route, setRoute] = useState(() => routeFromLocation(window.location));

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = routeFromLocation(window.location);
      const cleanUrl = buildRouteUrl(nextRoute, window.location.search);
      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (normalizeLegacyHash(window.location.hash) || currentUrl !== cleanUrl) {
        window.history.replaceState(window.history.state,"", cleanUrl);
      }

      setRoute(nextRoute);
    };

    const handleLegacyHash = () => {
      if (!normalizeLegacyHash(window.location.hash)) return;
      syncRoute();
    };

    syncRoute();
    window.addEventListener("popstate", syncRoute);
    window.addEventListener("hashchange", handleLegacyHash);

    return () => {
      window.removeEventListener("popstate", syncRoute);
      window.removeEventListener("hashchange", handleLegacyHash);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!anchor || !canHandleClientNavigation(anchor, window.location.origin)) {
        return;
      }

      const nextRoute = routeFromHref(anchor.href, window.location.origin);
      const nextUrl = buildRouteUrl(nextRoute, new URL(anchor.href).search);

      if (nextUrl === `${window.location.pathname}${window.location.search}`) {
        return;
      }

      event.preventDefault();
      window.history.pushState({},"", nextUrl);
      setRoute(nextRoute);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [route]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior:"auto" });
  }, [route]);

  useEffect(() => {
    const meta = { ...defaultRouteMeta, ...getRouteMeta(route) };
    const imageUrl = new URL("/favicon.png", window.location.origin).href;
    const canonicalUrl = buildCanonicalUrl(route, window.location.origin);

    document.title = meta.title;
    updateMetaTag('meta[name="description"]', meta.description);
    updateMetaTag('meta[property="og:title"]', meta.title);
    updateMetaTag('meta[property="og:description"]', meta.description);
    updateMetaTag('meta[property="og:type"]', meta.type ?? defaultRouteMeta.type);
    updateMetaTag('meta[property="og:url"]', canonicalUrl);
    updateMetaTag('meta[property="og:image"]', imageUrl);
    updateMetaTag('meta[name="twitter:title"]', meta.title);
    updateMetaTag('meta[name="twitter:description"]', meta.description);
    updateMetaTag('meta[name="twitter:image"]', imageUrl);
    updateLinkTag('link[rel="canonical"]', canonicalUrl);
  }, [route]);

  const Page = useMemo(() => resolvePage(route), [route]);

  return (
    <div className="min-h-screen bg-black text-paper selection:bg-yellow selection:text-black">
      <a
        className="focus-ring absolute left-4 top-4 z-[70] -translate-y-24 rounded-[8px] bg-yellow px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-black transition focus:translate-y-0"
        href="#main-content"
      >
        Pular para o conteúdo
      </a>
      <SiteLoader />
      <Header route={route} />
      <Suspense fallback={<PageFallback />}>
        <Page route={route} />
      </Suspense>
      <Footer route={route} />
    </div>
  );
}
