import logo from "../../assets/logo-amazonas.png";
import heroTraining from "../../assets/news-player.jpg";
import trainingWide from "../../assets/hero-arena.jpg";
import coachPhoto from "../../assets/news-coach.jpg";
import historyHero from "../../onca.png";
import alysonPhoto from "../../assets/player-official-alyson.jpg";
import diegoPhoto from "../../assets/player-official-diego-torres.jpg";
import erickPhoto from "../../assets/player-official-erick-varao.jpg";
import fabianoPhoto from "../../assets/player-official-fabiano.jpg";
import gabrielPhoto from "../../assets/player-official-gabriel-domingos.jpg";
import ivertonPhoto from "../../assets/player-official-iverton.jpg";
import joaoPhoto from "../../assets/player-official-joao-lopes.jpg";
import leoPhoto from "../../assets/player-official-leo-coelho.jpg";
import phPhoto from "../../assets/player-official-ph.jpg";
import rafaelTavaresPhoto from "../../assets/player-official-rafael-tavares.jpg";
import rafaelVitorPhoto from "../../assets/player-official-rafael-vitor.jpg";
import renanPhoto from "../../assets/player-official-renan.jpg";
import williamBarbioPhoto from "../../assets/player-official-william-barbio.jpg";
import nicolasCustomPhoto from "../../assets/player-nicolas-custom.png";
import ronaldoCustomPhoto from "../../assets/player-ronaldo-custom.png";

export const assets = {
  logo,
  heroTraining,
  trainingWide,
  coachPhoto,
  historyHero,
  nicolasCustomPhoto,
  ronaldoCustomPhoto,
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
  ingressos: "https://amazonasfc.com.br/site/",
};

export const stats = [
  { label: "Fundação", value: "2019", mark: "19" },
  { label: "Campeão brasileiro", value: "Série C 2023", mark: "C", featured: true },
  { label: "Bicampeão estadual", value: "2023 e 2025", mark: "AM" },
  { label: "Ranking CBF", value: "40º", mark: "CBF" },
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
    path: "/noticias/tecnico",
    date: "15/03/2026",
    category: "Profissional",
    title: "Cristian de Souza assume o comando",
    excerpt: "Novo técnico chega para a sequência da temporada 2026.",
    image: coachPhoto,
    href: "https://amazonasfc.com.br/site/noticia/cristian-de-souza-e-o-novo-tecnico-do-amazonas-fc/",
  },
  {
    id: "copa",
    path: "/noticias/copa",
    date: "12/03/2026",
    category: "Copa do Brasil",
    title: "Amazonas recebe Figueirense na Arena",
    excerpt: "Duelo único vale vaga para a quarta fase da competição.",
    image: trainingWide,
    href: "https://amazonasfc.com.br/site/noticia/pela-copa-do-brasil--amazonas-fc-recebe-figueirense-na-arena/",
  },
  {
    id: "reforco",
    path: "/noticias/reforco",
    date: "10/03/2026",
    category: "Mercado",
    title: "Alison Matheus reforça o ataque",
    excerpt: "Clube adiciona opção ofensiva ao elenco aurinegro.",
    image: heroTraining,
    href: "https://amazonasfc.com.br/site/noticia/amazonas-fc-oficializa-a-contratacao-do-atacante-alison-matheus/",
  },
  {
    id: "ingressos",
    path: "/noticias/ingressos",
    date: "10/03/2026",
    category: "Ingresso",
    title: "Venda para Amazonas x Figueirense",
    excerpt: "Ingressos em lojas oficiais, WhatsApp e bilheteria da Arena.",
    image: trainingWide,
    href: "https://amazonasfc.com.br/site/noticia/ingressos-para-amazonas-x-figueirense-pela-copa-do-brasil-ja-estao-a-venda/",
  },
  {
    id: "base",
    path: "/noticias/base",
    date: "20/11/2025",
    category: "Base",
    title: "Melhor base do futebol amazonense",
    excerpt: "Reconhecimento estadual coroa o trabalho do Sub-7 ao Sub-20.",
    image: heroTraining,
    href: "https://www.amazonasfc.com.br/site/noticia/amazonas-fc-tem-a-melhor-base-do-futebol-amazonense-em-2025/",
  },
];

export const squad = [
  {
    id: "joao",
    name: "João Lopes",
    fullName: "João Vitor Lopes da Silva",
    position: "Goleiro",
    number: 1,
    foot: "Direito",
    birth: "16/01/1996 (29 anos)",
    nationality: "Brasileiro",
    birthplace: "Rio de Janeiro (RJ)",
    height: "1,87 m",
    lastClub: "Barra (SC)",
    history: "Inter de Limeira (SP), Portuguesa (RJ), Guarani (SP), Fluminense (RJ), Santa Clara (POR), Portuguesa (SP) e Flamengo (RJ)",
    image: joaoPhoto,
  },
  {
    id: "renan",
    name: "Renan",
    fullName: "Renan dos Santos",
    position: "Goleiro",
    number: 12,
    foot: "Direito",
    birth: "18/05/1989 (35 anos)",
    nationality: "Brasileiro/Búlgaro",
    birthplace: "Rio de Janeiro (RJ)",
    height: "1,90 m",
    lastClub: "Santos (SP)",
    history: "Juventude (RS), Sport (PE), Atlético Goianiense (GO), Ludogorets Razgrad (BUL), Avaí (SC) e Botafogo (RJ)",
    image: renanPhoto,
  },
  {
    id: "fabiano",
    name: "Fabiano",
    fullName: "Fabiano da Silva Souza",
    position: "Zagueiro",
    number: 3,
    foot: "Direito",
    birth: "17/02/1990 (35 anos)",
    nationality: "Brasileiro",
    birthplace: "Campo Grande (MS)",
    height: "1,83 m",
    lastClub: "no Amazonas desde 2024",
    history:
      "Chapecoense (SC), Confiança (SE), Portuguesa (SP), Operário Ferroviário (PR), Santa Cruz (PE), Coritiba (PR), Vitória (BA), Bragantino (SP), EC Água Santa (SP), Remo (PA), Itumbiara (GO), Mirassol (SP), XV de Piracicaba (SP), São José (RS) e Cene (MS)",
    image: fabianoPhoto,
  },
  {
    id: "iverton",
    name: "Iverton",
    fullName: "Iverton Alves Passos",
    position: "Zagueiro",
    number: 4,
    foot: "Direito",
    birth: "30/3/2001 (24 anos)",
    nationality: "Brasileiro",
    birthplace: "Manaus (AM)",
    height: "1,91 m",
    lastClub: "Porto Velho (RO)",
    history: "Ferroviário (CE), Sul América, Amazonas, Inter de Lages (SC), ASA (AL), Boavista (RJ), Goiás (GO), CSE (AL) e Tiradentes (CE)",
    image: ivertonPhoto,
  },
  {
    id: "leo",
    name: "Léo Coelho",
    fullName: "Leonardo Henriques Coelho",
    position: "Zagueiro",
    number: 14,
    foot: "Esquerdo",
    birth: "17/5/1993 (32 anos)",
    nationality: "Brasileiro",
    birthplace: "Rio de Janeiro (RJ)",
    height: "1,89 m",
    lastClub: "Peñarol (URU)",
    history:
      "Nacional (URU), Atlético San Luis (MEX), Fénix (URU), Comercial (SP), Portuguesa (SP), Santos (SP), Penapolense (SP), Rio Claro (SP), Paraná (PR), Nacional (SP) e Grêmio Barueri (SP)",
    image: leoPhoto,
  },
  {
    id: "rafael-vitor",
    name: "Rafael Vitor",
    fullName: "Rafael Vitor Santos de Freitas",
    position: "Zagueiro",
    number: 29,
    foot: "Direito",
    birth: "5/1/1993 (32 anos)",
    nationality: "Brasileiro",
    birthplace: "Belo Horizonte (MG)",
    height: "1,92 m",
    lastClub: "Penang FC (MAL)",
    history:
      "PBAPP FC (MAL), Amazonas, Nacional, Villa Nova (MG), GE Brasil (RS), Atlético Mineiro (MG), Rio Negro, Mixto (MT), Boa Esporte (MG), América (RN), Grêmio Novorizontino (SP) e Tupi (MG)",
    image: rafaelVitorPhoto,
  },
  {
    id: "alyson",
    name: "Alyson",
    fullName: "Alyson Vinícius Almeida Neves",
    position: "Lateral",
    number: 30,
    foot: "Esquerdo",
    birth: "05/04/1996 (28 anos)",
    nationality: "Brasileiro",
    birthplace: "São Paulo (SP)",
    height: "1,88 m",
    lastClub: "Boavista (RJ)",
    history:
      "Athletic (MG), Boavista (RJ), Sampaio Corrêa (MA), Caldense (MG), ABC (RN), Água Santa (SP), Juventude (RS), Ceará (CE), Atlético (PB), Botafogo (PB), São Bernardo (SP), Atibaia (SP), Tanabi (SP), Cotia (SP) e Guarulhos (SP)",
    image: alysonPhoto,
  },
  {
    id: "ph",
    name: "PH",
    fullName: "Phillipe Guimarães",
    position: "Volante",
    number: 8,
    foot: "Direito",
    birth: "18/03/1991 (34 anos)",
    nationality: "Brasileiro",
    birthplace: "Niterói (RJ)",
    height: "1,77 m",
    lastClub: "no Amazonas desde 2022",
    history:
      "Botafogo (PB), Água Santa (SP), Barra (SC), Ferroviária (SP), Santo André (SP), Paysandu (PA), Boa Esporte (MG), Tombense (MG), Vila Nova (GO), FK Kukesi (ALB), América (RJ), Bangu (RJ), Angra dos Reis (RJ), São Gonçalo (RJ), Legião (DF), Resende (RJ) e Botafogo (RJ)",
    image: phPhoto,
  },
  {
    id: "gabriel",
    name: "Gabriel Domingos",
    fullName: "Gabriel Domingos de Moura",
    position: "Volante",
    number: 32,
    foot: "Direito",
    birth: "09/02/2001 (24 anos)",
    nationality: "Brasileiro",
    birthplace: "São José dos Campos (SP)",
    height: "1,85 m",
    lastClub: "Vila Nova (GO)",
    history: "Bahia (BA), São José (RS), Avaí (SC) e Internacional (RS).",
    image: gabrielPhoto,
  },
  {
    id: "erick",
    name: "Erick Varão",
    fullName: "Erick de Souza Miranda",
    position: "Volante",
    number: 33,
    foot: "Direito",
    birth: "01/03/1996 (29 anos)",
    nationality: "Brasileiro",
    birthplace: "Touros (RN)",
    height: "1,82 m",
    lastClub: "Capital (DF)",
    history:
      "CRB (AL), Amazonas, ABC (RN), Marília (SP), Maringá (PR), Noroeste (SP), América (RN), Globo FC (RN), Pouso Alegre (MG), Uberlândia (MG), EC Água Santa (SP), Portimonense (POR) e Força e Luz (RN)",
    image: erickPhoto,
  },
  {
    id: "tavares",
    name: "Rafael Tavares",
    fullName: "Rafael Aparecido de Paulo Tavares",
    position: "Meio-campista",
    number: 10,
    foot: "Direito",
    birth: "27/12/1990 (34 anos)",
    nationality: "Brasileiro",
    birthplace: "São Manuel (SP)",
    height: "1,79 m",
    lastClub: "no Amazonas desde 2022",
    history:
      "Botafogo (SP), São José (RS), Mirassol (SP), Linense (SP), Rio Claro (SP), ASA (AL), Rio Branco (PR), Avenida (RS), Luverdense (MT), América (RN), Paysandu (PA), Aparecidense (GO), Marília (SP), Sertãozinho (SP) e São Paulo (SP)",
    image: rafaelTavaresPhoto,
  },
  {
    id: "barbio",
    name: "William Barbio",
    fullName: "William Silva Gomes Barbio",
    position: "Atacante",
    number: 35,
    foot: "Direito",
    birth: "22/10/1992 (32 anos)",
    nationality: "Brasileiro",
    birthplace: "Belford Roxo (RJ)",
    height: "1,75 m",
    lastClub: "no Amazonas desde 2024",
    history:
      "Londrina (PR), Ypiranga (RS), Seoul E-Land (COR), Bucheon 1995 (COR), Confiança (SE), CRB (AL), Boa Esporte (MG), Santa Cruz (PE), Joinville (SC), América Mineiro (MG), Vasco (RJ), Chapecoense (SC), Bahia (BA), Atlético Goianiense (GO) e Nova Iguaçu (RJ)",
    image: williamBarbioPhoto,
  },
  {
    id: "diego",
    name: "Diego Torres",
    fullName: "Diego Joel Torres Garcete",
    position: "Atacante",
    number: 36,
    foot: "Esquerdo",
    birth: "14/10/2002 (22 anos)",
    nationality: "Paraguaio",
    birthplace: "Assunção (PAR)",
    height: "1,79 m",
    lastClub: "Sportivo Trinidense (PAR)",
    history: "Olimpia (PAR), Club Celaya (MEX) e Gent (BEL)",
    image: diegoPhoto,
  },
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
