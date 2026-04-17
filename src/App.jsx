import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { MatchdayPage } from "./pages/MatchdayPage.jsx";
import { NewsPage } from "./pages/NewsPage.jsx";
import { SquadPage } from "./pages/SquadPage.jsx";
import { MembershipPage } from "./pages/MembershipPage.jsx";
import { StorePage } from "./pages/StorePage.jsx";
import { HistoryPage } from "./pages/HistoryPage.jsx";

const pages = {
  "/": HomePage,
  "/matchday": MatchdayPage,
  "/noticias": NewsPage,
  "/elenco": SquadPage,
  "/socio": MembershipPage,
  "/loja": StorePage,
  "/historia": HistoryPage,
};

const normalizeHash = () => {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
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

  const Page = useMemo(() => pages[route] ?? HomePage, [route]);

  return (
    <div className="min-h-screen bg-black text-paper selection:bg-yellow selection:text-black">
      <Header route={route} />
      <Page />
      <Footer />
    </div>
  );
}
