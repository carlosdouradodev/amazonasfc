import { news } from"./news";

const BASE_TITLE ="Amazonas FC";
const BASE_DESCRIPTION ="Projeto conceitual do Amazonas FC com matchday, notícias, elenco, história e vitrine digital.";

const routeMeta = {"/": {
    title: `${BASE_TITLE} | Início`,
    description:"Projeto conceitual do Amazonas FC com destaque para matchday, notícias, sócio, loja e elenco profissional.",
  },"/matchday": {
    title: `${BASE_TITLE} | Matchday`,
    description:"Central do torcedor com horário, estádio, ingresso, transmissão, tabela e simulação da Série C.",
  },"/noticias": {
    title: `${BASE_TITLE} | Notícias`,
    description:"Arquivo editorial com manchetes, matérias e cobertura conceitual do Amazonas FC.",
  },"/elenco": {
    title: `${BASE_TITLE} | Elenco`,
    description:"Elenco profissional do Amazonas FC com setores, retratos oficiais e ficha individual dos atletas.",
  },"/socio": {
    title: `${BASE_TITLE} | Sócio`,
    description:"Comparação de planos do sócio Amazonas com benefícios, prioridade e valor mensal em leitura rápida.",
  },"/loja": {
    title: `${BASE_TITLE} | Loja`,
    description:"Vitrine conceitual da loja do Amazonas FC com produtos, carrinho local e saída para a loja oficial.",
  },"/historia": {
    title: `${BASE_TITLE} | História`,
    description:"Origem, acesso, título nacional e consolidação regional do Amazonas FC em uma linha do tempo editorial.",
  },"/clube/historia": {
    title: `${BASE_TITLE} | História`,
    description:"Origem, acesso, título nacional e consolidação regional do Amazonas FC em uma linha do tempo editorial.",
  },"/clube/simbolos": {
    title: `${BASE_TITLE} | Símbolos`,
    description:"Página institucional sobre escudo, cores, mascote e identidade visual do Amazonas FC.",
  },"/clube/titulos": {
    title: `${BASE_TITLE} | Títulos`,
    description:"Vitrine dos títulos do Amazonas FC, com destaque para a Série C 2023 e os campeonatos amazonenses.",
  },"/clube/curiosidades": {
    title: `${BASE_TITLE} | Curiosidades`,
    description:"Fatos rápidos, pioneirismo e marcos que ajudam a contar a trajetória recente do Amazonas FC.",
  },"/futebol/profissional": {
    title: `${BASE_TITLE} | Futebol Profissional`,
    description:"Resumo do time principal com posição, pontos, próximo jogo, artilharia e acesso rápido ao matchday.",
  },"/futebol/base": {
    title: `${BASE_TITLE} | Futebol de Base`,
    description:"Área institucional da base do Amazonas FC com equipe, setores e linha de formação.",
  },"/institucional/estatuto": {
    title: `${BASE_TITLE} | Estatuto`,
    description:"Área institucional para estatuto, governança e documentos formais do clube.",
  },"/institucional/transparencia": {
    title: `${BASE_TITLE} | Transparência`,
    description:"Estrutura conceitual para publicações, indicadores e prestação de contas do Amazonas FC.",
  },"/institucional/comercial": {
    title: `${BASE_TITLE} | Comercial`,
    description:"Inventário conceitual de ativos comerciais, patrocínio, matchday e propriedades de mídia do clube.",
  },"/institucional/imprensa": {
    title: `${BASE_TITLE} | Imprensa`,
    description:"Área institucional para credenciamento, releases, contato de imprensa e materiais oficiais.",
  },
};

const newsMeta = Object.fromEntries(
  news.map((item) => [
    item.id,
    {
      title: `${item.title} | Notícias`,
      description: item.article?.lead ?? item.excerpt,
      type:"article",
    },
  ]),
);

export function getRouteMeta(route) {
  if (route.startsWith("/noticias/")) {
    const articleId = route.replace("/noticias/","").split("/")[0];
    return newsMeta[articleId] ?? routeMeta["/noticias"];
  }

  return routeMeta[route] ?? routeMeta["/"];
}

export const defaultRouteMeta = {
  title: BASE_TITLE,
  description: BASE_DESCRIPTION,
  type:"website",
};
