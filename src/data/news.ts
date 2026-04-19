import { assets } from"./club";
import type { NewsArticle, NewsItem } from"../types";

type PartialNewsItem = Omit<NewsItem, "article"> & { article?: NewsArticle };

function createFallbackArticle(item: Pick<NewsItem, "image" | "excerpt" | "category" | "date">): NewsArticle {
  return {
    heroImage: item.image,
    inlineImage: item.image,
    lead: item.excerpt,
    paragraphs: ["Esta matéria existe para fechar o padrão editorial da notícia individual. O texto final pode mudar, mas a estrutura precisa sustentar hero forte, leitura limpa e fluxo claro entre contexto, serviço e próximo passo.","O Amazonas ganha mais quando a página de notícia explica o fato, organiza a informação e usa imagem com peso. O objetivo é tratar cada publicação como peça de marca e de cobertura ao mesmo tempo.","Com isso, mesmo um conteúdo simples deixa de parecer postagem solta. A experiência fica mais próxima de revista esportiva de clube do que de CMS antigo.",
    ],
    quote:"A forma da notícia também comunica o tamanho do clube.",
    quoteSource:"Direção editorial",
    stats: [
      { label:"Categoria", value: item.category },
      { label:"Data", value: item.date },
      { label:"Formato", value:"Matéria oficial" },
    ],
    nextSteps: ["Completar a matéria com texto final do clube.","Substituir a imagem por foto específica do fato.","Adicionar relacionados com jogo, elenco e serviço.",
    ],
  };
}

const baseNews: PartialNewsItem[] = [
  {
    id:"tecnico",
    path:"/noticias/tecnico",
    date:"15/03/2026",
    category:"Profissional",
    title:"Cristian de Souza assume o comando",
    excerpt:"Novo técnico chega para a sequência da temporada 2026.",
    image: assets.coachPhoto,
    href:"https://amazonasfc.com.br/site/noticia/cristian-de-souza-e-o-novo-tecnico-do-amazonas-fc/",
    article: {
      heroImage: assets.trainingWide,
      inlineImage: assets.coachPhoto,
      lead:"O Amazonas define o comando para a sequência da temporada e abre um novo ciclo com foco em consistência competitiva, rotina forte de trabalho e resposta imediata na Série C.",
      paragraphs: ["A definição do novo técnico encerra uma semana de reuniões, análise de perfil e alinhamento entre diretoria, departamento de futebol e comissão permanente. A leitura interna foi objetiva. O clube precisava de um nome capaz de sustentar rotina intensa de treino, organização curta entre jogos e repertório competitivo para um calendário apertado.","Cristian de Souza chega com a tarefa de transformar o bom início de campeonato em estabilidade de desempenho. A avaliação considerou capacidade de ajustar bloco sem a bola, encurtar distâncias no meio e dar mais clareza ao último terço. O ponto central é identidade. O Amazonas quer um time reconhecível em casa e fora.","Nos primeiros contatos com o elenco, o discurso foi direto. Intensidade, concentração e compromisso de execução. A preparação da semana inclui sessões mais curtas, campo reduzido para pressão pós-perda e trabalho específico de bola parada. O objetivo é controlar o jogo sem perder agressividade.","A chegada do treinador também reorganiza a comunicação do vestiário. Lideranças do elenco participam da construção desse novo momento, e a cobertura do clube acompanha essa virada com mais contexto de treino, bastidor e decisão técnica.",
      ],
      quote:"Vejo no Amazonas um clube pronto para crescer.",
      quoteSource:"Cristian de Souza, em fala de apresentação",
      stats: [
        { label:"Temporada", value:"2026" },
        { label:"Posição", value:"1º na Série C" },
        { label:"Momento", value:"2 vitórias seguidas" },
      ],
      nextSteps: ["Apresentação oficial e primeira coletiva no CT.","Semana com treino tático, ajuste de bola parada e observação individual.","Estreia em casa com serviço completo de pré-jogo e cobertura editorial.",
      ],
    },
  },
  {
    id:"copa",
    path:"/noticias/copa",
    date:"12/03/2026",
    category:"Copa do Brasil",
    title:"Amazonas recebe Figueirense na Arena",
    excerpt:"Duelo único vale vaga para a quarta fase da competição.",
    image: assets.trainingWide,
    href:"https://amazonasfc.com.br/site/noticia/pela-copa-do-brasil--amazonas-fc-recebe-figueirense-na-arena/",
    article: {
      heroImage: assets.trainingWide,
      inlineImage: assets.heroTraining,
      lead:"A partida vale vaga para a quarta fase da Copa do Brasil e recoloca o Amazonas em uma noite de alta atenção competitiva, serviço forte ao torcedor e carga máxima de ambiente.",
      paragraphs: ["A preparação para o confronto trata o jogo como corte de temporada. O Amazonas quer transformar a partida em casa em noite de controle emocional, pressão sustentada e ocupação inteligente do campo ofensivo. A comissão trabalha o contexto inteiro. Bola, estádio, rival e resposta de arquibancada.","O duelo com o Figueirense exige precisão de comportamento. O clube sabe que mata-mata pune erro curto e desorganização de segunda bola. Por isso a semana foi desenhada com ênfase em encaixe de pressão, recuperação rápida e circulação limpa perto da área adversária.","Fora do campo, a operação de jogo também ganha peso. Ingresso, acesso, estádio, conteúdo e transmissão precisam estar no mesmo fluxo. Esse tipo de partida cobra coerência editorial. O torcedor que entra para ler a matéria normalmente também quer saber como chegar, quando abrir portão e o que esperar da noite.","A ideia da cobertura é tratar o evento como peça central da rodada, com linguagem de clube profissional e leitura mais próxima de transmissão premium do que de mural institucional.",
      ],
      quote:"Jogo de copa pede precisão. Cada detalhe pesa mais.",
      quoteSource:"Comissão técnica, relatório interno de preparação",
      stats: [
        { label:"Competição", value:"Copa do Brasil" },
        { label:"Formato", value:"Jogo único" },
        { label:"Palco", value:"Arena da Amazônia" },
      ],
      nextSteps: ["Abrir serviço completo de partida com estádio, horário e acesso.","Soltar conteúdo de vestiário e chegada da delegação no dia do jogo.","Publicar pós-jogo com placar, melhores momentos e fala curta da comissão.",
      ],
    },
  },
  {
    id:"reforco",
    path:"/noticias/reforco",
    date:"10/03/2026",
    category:"Mercado",
    title:"Alison Matheus reforça o ataque",
    excerpt:"Clube adiciona opção ofensiva ao elenco aurinegro.",
    image: assets.heroTraining,
    href:"https://amazonasfc.com.br/site/noticia/amazonas-fc-oficializa-a-contratacao-do-atacante-alison-matheus/",
    article: {
      heroImage: assets.heroTraining,
      inlineImage: assets.trainingWide,
      lead:"O Amazonas adiciona opção ofensiva ao elenco e amplia repertório de profundidade, ataque ao espaço e rotação de frente para a sequência do calendário nacional.",
      paragraphs: ["A contratação de Alison Matheus responde a uma necessidade objetiva do grupo. O clube queria mais uma peça para acelerar transição, sustentar ataque vertical e abrir cenários diferentes de jogo quando o adversário fecha corredor central.","O departamento de futebol avaliou encaixe físico, comportamento sem bola e margem de adaptação ao modelo atual. O nome avança por função, não por manchete. O Amazonas está montando elenco com leitura de necessidade, não com acúmulo aleatório de peças.","A chegada do atacante também aumenta a concorrência interna. Isso tende a melhorar intensidade de treino e ampliar alternativas para segundo tempo, rotação de lado e ajuste de profundidade. Em calendário comprimido, banco útil deixa de ser detalhe e vira estrutura.","Na comunicação, a notícia precisa mostrar mais do que assinatura de contrato. O torcedor quer entender o porquê da escolha, onde o atleta encaixa e o que muda no time a partir dessa entrada.",
      ],
      quote:"A ideia é aumentar repertório sem perder coordenação coletiva.",
      quoteSource:"Departamento de futebol, análise de elenco",
      stats: [
        { label:"Setor", value:"Ataque" },
        { label:"Objetivo", value:"Mais profundidade" },
        { label:"Uso", value:"Rotação e pressão" },
      ],
      nextSteps: ["Integração imediata ao treino com o grupo principal.","Carga física monitorada para entrada gradual na sequência de jogos.","Apresentação editorial com vídeo, fala curta e contexto tático.",
      ],
    },
  },
  {
    id:"ingressos",
    path:"/noticias/ingressos",
    date:"10/03/2026",
    category:"Ingresso",
    title:"Venda para Amazonas x Figueirense",
    excerpt:"Ingressos em lojas oficiais, WhatsApp e bilheteria da Arena.",
    image: assets.trainingWide,
    href:"https://amazonasfc.com.br/site/noticia/ingressos-para-amazonas-x-figueirense-pela-copa-do-brasil-ja-estao-a-venda/",
  },
  {
    id:"base",
    path:"/noticias/base",
    date:"20/11/2025",
    category:"Base",
    title:"Melhor base do futebol amazonense",
    excerpt:"Reconhecimento estadual coroa o trabalho do Sub-7 ao Sub-20.",
    image: assets.heroTraining,
    href:"https://amazonasfc.com.br/site/noticia/amazonas-fc-tem-a-melhor-base-do-futebol-amazonense-em-2025/",
  },
];

export const news: NewsItem[] = baseNews.map((item) => ({
  ...item,
  article: item.article ?? createFallbackArticle(item),
}));

export function getNewsArticle(articleId: string | null): NewsItem {
  return news.find((item) => item.id === articleId) ?? news[0];
}
