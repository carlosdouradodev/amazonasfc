import logo from "../../assets/logo-amazonas.png";
import heroTraining from "../../assets/news-player.jpg";
import trainingWide from "../../assets/hero-arena.jpg";
import coachPhoto from "../../assets/news-coach.jpg";
import joaoPhoto from "../../assets/player-joao.jpg";
import renanPhoto from "../../assets/player-renan.jpg";
import erickPhoto from "../../assets/player-erick.jpg";
import diegoPhoto from "../../assets/player-diego.jpg";

export const assets = {
  logo,
  heroTraining,
  trainingWide,
  coachPhoto,
};

export const navItems = [
  { label: "Início", path: "/" },
  { label: "Matchday", path: "/matchday" },
  { label: "Notícias", path: "/noticias" },
  { label: "Elenco", path: "/elenco" },
  { label: "Sócio", path: "/socio" },
  { label: "Loja", path: "/loja" },
  { label: "História", path: "/historia" },
];

export const socialLinks = [
  { label: "X", href: "https://x.com/oficialamfc" },
  { label: "Facebook", href: "https://web.facebook.com/oficialamfc/" },
  { label: "Instagram", href: "https://www.instagram.com/amazonasfcoficial/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCmbbvZoJZeZWPEFXAoWmrjw" },
  { label: "Flickr", href: "https://www.flickr.com/photos/amazonasfc/" },
];

export const officialLinks = {
  socio: "https://socioamazonas.com.br/",
  loja: "https://www.lojadaonca.com.br/",
  site: "https://amazonasfc.com.br/site/",
};

export const stats = [
  { label: "Fundação", value: "2019" },
  { label: "Campeão brasileiro", value: "Série C 2023" },
  { label: "Bicampeão estadual", value: "2023 e 2025" },
  { label: "Ranking CBF", value: "40º" },
];

export const honors = [
  {
    id: "serie-c",
    count: "1",
    title: "Campeonato Brasileiro",
    subtitle: "Série C 2023",
    years: "2023",
    image: trainingWide,
    tone: "Nacional",
  },
  {
    id: "amazonense",
    count: "2",
    title: "Campeonato Amazonense",
    subtitle: "Barezão",
    years: "2023 e 2025",
    image: coachPhoto,
    tone: "Estadual",
  },
];

export const matches = [
  {
    id: "barezao-1",
    competition: "Barezão 2026",
    round: "1ª rodada",
    home: "Amazonas",
    away: "São Raimundo",
    date: "10/01",
    time: "18h30",
    venue: "Arena da Amazônia",
    status: "Finalizado",
    channel: "TV Onça",
    ticket: "Arquivo do jogo",
  },
  {
    id: "barezao-2",
    competition: "Barezão 2026",
    round: "3ª rodada",
    home: "Amazonas",
    away: "Manaus",
    date: "24/01",
    time: "17h",
    venue: "Carlos Zamith",
    status: "Finalizado",
    channel: "TV Onça",
    ticket: "Bilheteria",
  },
  {
    id: "copa-brasil",
    competition: "Copa do Brasil 2026",
    round: "3ª fase",
    home: "Amazonas",
    away: "Figueirense",
    date: "12/03",
    time: "19h",
    venue: "Arena da Amazônia",
    status: "Jogo único",
    channel: "TV Onça",
    ticket: "Lojas da Onça",
  },
];

export const serieCStatus = {
  updatedAt: "17 abr 2026",
  position: "1º",
  points: 6,
  record: "2V 0E 0D",
  goals: "4:0",
  goalDiff: "+4",
};

export const serieCStandings = [
  { rank: 1, team: "Amazonas", played: 2, wins: 2, draws: 0, losses: 0, diff: "+4", points: 6 },
  { rank: 2, team: "Maringá", played: 2, wins: 2, draws: 0, losses: 0, diff: "+3", points: 6 },
  { rank: 3, team: "Botafogo-PB", played: 2, wins: 2, draws: 0, losses: 0, diff: "+3", points: 6 },
  { rank: 4, team: "Guarani", played: 2, wins: 1, draws: 1, losses: 0, diff: "+2", points: 4 },
  { rank: 5, team: "Floresta", played: 2, wins: 1, draws: 1, losses: 0, diff: "+1", points: 4 },
  { rank: 6, team: "Brusque", played: 2, wins: 1, draws: 1, losses: 0, diff: "+1", points: 4 },
  { rank: 7, team: "Ypiranga-RS", played: 2, wins: 1, draws: 1, losses: 0, diff: "+1", points: 4 },
  { rank: 8, team: "Santa Cruz", played: 2, wins: 1, draws: 1, losses: 0, diff: "+1", points: 4 },
];

export const upcomingSerieC = [
  {
    id: "serie-c-3",
    round: "3ª rodada",
    date: "18 abr",
    day: "sábado",
    time: "20h30",
    home: "Amazonas",
    away: "Maranhão",
    venue: "Carlos Zamith",
    city: "Manaus",
  },
  {
    id: "serie-c-4",
    round: "4ª rodada",
    date: "26 abr",
    day: "domingo",
    time: "19h",
    home: "Santa Cruz",
    away: "Amazonas",
    venue: "Arena de Pernambuco",
    city: "São Lourenço da Mata",
  },
  {
    id: "serie-c-5",
    round: "5ª rodada",
    date: "03 mai",
    day: "domingo",
    time: "17h",
    home: "Amazonas",
    away: "Caxias",
    venue: "Arena da Amazônia",
    city: "Manaus",
  },
  {
    id: "serie-c-6",
    round: "6ª rodada",
    date: "09 mai",
    day: "sábado",
    time: "A definir",
    home: "Amazonas",
    away: "Figueirense",
    venue: "A definir",
    city: "Manaus",
  },
  {
    id: "serie-c-7",
    round: "7ª rodada",
    date: "16 mai",
    day: "sábado",
    time: "A definir",
    home: "Floresta",
    away: "Amazonas",
    venue: "A definir",
    city: "Fortaleza",
  },
  {
    id: "serie-c-8",
    round: "8ª rodada",
    date: "23 mai",
    day: "sábado",
    time: "A definir",
    home: "Amazonas",
    away: "Ferroviária",
    venue: "A definir",
    city: "Manaus",
  },
];

export const news = [
  {
    id: "tecnico",
    date: "15/03/2026",
    category: "Profissional",
    title: "Cristian de Souza assume o comando",
    excerpt: "Novo técnico chega para a sequência da temporada 2026.",
    image: coachPhoto,
    href: "https://amazonasfc.com.br/site/noticia/cristian-de-souza-e-o-novo-tecnico-do-amazonas-fc/",
  },
  {
    id: "copa",
    date: "12/03/2026",
    category: "Copa do Brasil",
    title: "Amazonas recebe Figueirense na Arena",
    excerpt: "Duelo único vale vaga para a quarta fase da competição.",
    image: trainingWide,
    href: "https://amazonasfc.com.br/site/noticia/pela-copa-do-brasil--amazonas-fc-recebe-figueirense-na-arena/",
  },
  {
    id: "reforco",
    date: "10/03/2026",
    category: "Mercado",
    title: "Alison Matheus reforça o ataque",
    excerpt: "Clube adiciona opção ofensiva ao elenco aurinegro.",
    image: heroTraining,
    href: "https://amazonasfc.com.br/site/noticia/amazonas-fc-oficializa-a-contratacao-do-atacante-alison-matheus/",
  },
  {
    id: "ingressos",
    date: "10/03/2026",
    category: "Ingresso",
    title: "Venda para Amazonas x Figueirense",
    excerpt: "Ingressos em lojas oficiais, WhatsApp e bilheteria da Arena.",
    image: trainingWide,
    href: "https://amazonasfc.com.br/site/noticia/ingressos-para-amazonas-x-figueirense-pela-copa-do-brasil-ja-estao-a-venda/",
  },
  {
    id: "base",
    date: "20/11/2025",
    category: "Base",
    title: "Melhor base do futebol amazonense",
    excerpt: "Reconhecimento estadual coroa o trabalho do Sub-7 ao Sub-20.",
    image: heroTraining,
    href: "https://www.amazonasfc.com.br/site/noticia/amazonas-fc-tem-a-melhor-base-do-futebol-amazonense-em-2025/",
  },
];

export const squad = [
  { id: "joao", name: "João Lopes", position: "Goleiro", number: 1, foot: "Direito", image: joaoPhoto },
  { id: "renan", name: "Renan", position: "Goleiro", number: 12, foot: "Direito", image: renanPhoto },
  { id: "fabiano", name: "Fabiano", position: "Zagueiro", number: 3, foot: "Direito", image: trainingWide },
  { id: "iverton", name: "Iverton", position: "Zagueiro", number: 4, foot: "Direito", image: trainingWide },
  { id: "leo", name: "Léo Coelho", position: "Zagueiro", number: 14, foot: "Esquerdo", image: trainingWide },
  { id: "rafael-vitor", name: "Rafael Vitor", position: "Zagueiro", number: 29, foot: "Direito", image: trainingWide },
  { id: "alyson", name: "Alyson", position: "Lateral", number: 30, foot: "Esquerdo", image: trainingWide },
  { id: "ph", name: "PH", position: "Volante", number: 8, foot: "Direito", image: trainingWide },
  { id: "gabriel", name: "Gabriel Domingos", position: "Volante", number: 32, foot: "Direito", image: trainingWide },
  { id: "erick", name: "Erick Varão", position: "Volante", number: 33, foot: "Direito", image: erickPhoto },
  { id: "tavares", name: "Rafael Tavares", position: "Meio-campista", number: 10, foot: "Direito", image: trainingWide },
  { id: "barbio", name: "William Barbio", position: "Atacante", number: 35, foot: "Direito", image: trainingWide },
  { id: "diego", name: "Diego Torres", position: "Atacante", number: 36, foot: "Esquerdo", image: diegoPhoto },
];

export const plans = [
  {
    id: "onca",
    name: "Onça",
    price: 29.9,
    priority: "Prioridade 3",
    benefits: ["Check-in digital", "Desconto na loja", "Rede de parceiros"],
  },
  {
    id: "arena",
    name: "Arena",
    price: 69.9,
    priority: "Prioridade 2",
    benefits: ["Check-in digital", "Prioridade de ingresso", "Experiências de matchday"],
  },
  {
    id: "aurinegro",
    name: "Aurinegro",
    price: 119.9,
    priority: "Prioridade 1",
    benefits: ["Check-in digital", "Prioridade máxima", "Experiências e loja com maior desconto"],
  },
];

export const products = [
  { id: "home", name: "Camisa aurinegra", price: 299.9, tag: "Jogo", image: heroTraining },
  { id: "training", name: "Camisa treino", price: 189.9, tag: "Treino", image: trainingWide },
  { id: "cap", name: "Boné Onça", price: 89.9, tag: "Acessório", image: coachPhoto },
  { id: "kids", name: "Kit base", price: 159.9, tag: "Infantil", image: heroTraining },
];

export const timeline = [
  { year: "2019", title: "Fundação", text: "O clube nasce em Manaus e inicia a subida competitiva." },
  { year: "2019", title: "Série B estadual", text: "Primeiro título e acesso no futebol amazonense." },
  { year: "2023", title: "Série C", text: "Primeiro título brasileiro de um clube amazonense." },
  { year: "2023", title: "Barezão", text: "Primeiro título estadual da Onça-pintada." },
  { year: "2025", title: "Bicampeonato estadual", text: "Consolidação regional e calendário nacional cheio." },
];
