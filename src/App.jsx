import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SiteLoader } from "./components/SiteLoader.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { MatchdayPage } from "./pages/MatchdayPage.jsx";
import { NewsPage } from "./pages/NewsPage.jsx";
import { SquadPage } from "./pages/SquadPage.jsx";
import { MembershipPage } from "./pages/MembershipPage.jsx";
import { StorePage } from "./pages/StorePage.jsx";
import { HistoryPage } from "./pages/HistoryPage.jsx";
import { SectionPage } from "./pages/SectionPage.jsx";
import { sectionPageRoutes } from "./data/siteSections.js";

const pages = {
  "/": HomePage,
  "/noticias": NewsPage,
  "/elenco": SquadPage,
  "/socio": MembershipPage,
  "/loja": StorePage,
  "/matchday": MatchdayPage,
  "/historia": HistoryPage,
  "/clube/historia": HistoryPage,
  "/clube/simbolos": SectionPage,
  "/clube/titulos": SectionPage,
  "/clube/curiosidades": SectionPage,
  "/futebol/profissional": SectionPage,
  "/futebol/base": SectionPage,
  "/institucional/estatuto": SectionPage,
  "/institucional/transparencia": SectionPage,
  "/institucional/comercial": SectionPage,
  "/institucional/imprensa": SectionPage,
};

const normalizeHash = () => {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
};

const resolvePage = (route) => {
  if (route.startsWith("/noticias/")) {
    return NewsPage;
  }

  if (sectionPageRoutes.includes(route)) {
    return SectionPage;
  }

  return pages[route] ?? HomePage;
};

export default function App() {
  const [route, setRoute] = useState(normalizeHash);

  useEffect(() => {
    const handleHash = () => setRoute(normalizeHash());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [route]);

  const Page = useMemo(() => resolvePage(route), [route]);

  return (
    <div className="min-h-screen bg-black text-paper selection:bg-yellow selection:text-black">
      <SiteLoader />
      <Header route={route} />
      <Page route={route} />
      <Footer />
    </div>
  );
}
