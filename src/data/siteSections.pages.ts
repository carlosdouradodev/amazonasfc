import { assets, honors, officialLinks, squad } from"./club";
import { serieCStatus, serieCTopScorers, upcomingSerieC } from"./competition.generated";

const goalkeepers = squad.filter((player) => player.position ==="Goleiro");
const defenders = squad.filter((player) => ["Zagueiro","Lateral"].includes(player.position));
const midfielders = squad.filter((player) => ["Volante","Meio-campista"].includes(player.position));
const attackers = squad.filter((player) => player.position ==="Atacante");
const nextProfessionalMatch = upcomingSerieC[0];
const leadScorer = serieCTopScorers[0];
const currentPosition = String(serieCStatus.position);

const baseStaff = [
  { title:"Diretor", text:"Leonardo Bueno" },
  { title:"Gerente", text:"Julyanne Strapasson" },
  { title:"Coordenadora administrativa", text:"Juliana Silva" },
  { title:"Psicologa", text:"Iris Barbara" },
  { title:"Assistente social", text:"Creusa Prata" },
  { title:"Coordenadora pedagogica", text:"Camilly Murrieta" },
  { title:"Coordenador tecnico", text:"Igor Oliveira" },
  { title:"Monitor", text:"Jailton Oliveira" },
  { title:"Tecnico", text:"Renato Abrantes" },
  { title:"Auxiliar tecnico", text:"Juan Forero" },
  { title:"Analista de dados", text:"Felipe Monteiro" },
  { title:"Logistica", text:"Juan Pevas" },
];

export const sectionPages = {"/clube/simbolos": {
    eyebrow:"Clube",
    title:"Marca, cor e onca.",
    text:"A pagina organiza o que o torcedor reconhece na primeira leitura: nome, escudo, cores e a Onca-pintada como centro de identidade.",
    image: assets.logo,
    imageFit:"contain",
    imagePanelClassName:"bg-[radial-gradient(circle_at_50%_0%,rgba(242,195,25,0.18),transparent_52%),linear-gradient(180deg,rgba(246,240,223,0.04),rgba(246,240,223,0.02)),rgba(5,4,3,0.86)] p-10",
    introTitle:"Identidade curta e legivel.",
    intro: ["Amazonas FC carrega o nome do estado e usa amarelo e preto para manter leitura imediata. O escudo frontal e a Onca-pintada concentram o reconhecimento da marca.","Essa pagina existe para dar coesao ao discurso do clube. O torcedor precisa entender simbolo, cor e linguagem como sistema, nao como ornamentacao solta.",
    ],
    stats: [
      { label:"Nome", value:"Amazonas FC" },
      { label:"Mascote", value:"Onca-pintada" },
      { label:"Cores", value:"Amarelo e preto" },
      { label:"Base", value:"Manaus AM" },
    ],
    blocks: [
      {
        title:"Elementos centrais",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Marca", title:"Escudo frontal", text:"Leitura limpa, boa aplicacao em digital e presenca forte em materiais de jogo." },
          { kicker:"Mascote", title:"Onca-pintada", text:"Entrega simbolo regional e peso competitivo sem depender de slogan." },
          { kicker:"Paleta", title:"Amarelo e preto", text:"Contraste alto e assinatura imediata em camisa, sinalizacao e interface." },
          { kicker:"Tom", title:"Manaus em foco", text:"O clube se posiciona como representante local com ambicao nacional." },
        ],
      },
    ],
    ctas: [{ label:"Abrir história", href:"/clube/historia", external: false }],
  },"/clube/titulos": {
    eyebrow:"Clube",
    title:"Titulos com peso real.",
    text:"A vitrine de titulos precisa mostrar escala. Um nacional, dois estaduais e a mudanca de patamar que veio junto.",
    image: assets.trainingWide,
    imageFit:"cover",
    imagePosition:"object-[50%_28%]",
    introTitle:"Tres trofeus, uma virada de patamar.",
    intro: ["O clube ainda e novo, mas os trofeus ja definem narrativa competitiva. O titulo da Serie C de 2023 e o primeiro titulo brasileiro de um clube amazonense.","Os estaduais de 2023 e 2025 completam a leitura. O Amazonas deixou de ser projeto de acesso e virou referencia local com calendario nacional continuo.",
    ],
    stats: [
      { label:"Total", value:"3 titulos" },
      { label:"Nacional", value:"1" },
      { label:"Estadual", value:"2" },
      { label:"Artilheiro", value:"Sassa 18" },
    ],
    blocks: [
      {
        title:"Galeria principal",
        type:"cards",
        columns:"md:grid-cols-2",
        items: honors.map((honor) => ({
          kicker: honor.tone,
          title: `${honor.count} ${honor.title}`,
          text: `${honor.subtitle} | ${honor.years}`,
        })),
      },
      {
        title:"Leitura de contexto",
        type:"cards",
        columns:"md:grid-cols-3",
        items: [
          { kicker:"2023", title:"Serie C", text:"Primeiro titulo brasileiro do futebol amazonense." },
          { kicker:"2023", title:"Barezao", text:"Consolidacao estadual no mesmo ano da conquista nacional." },
          { kicker:"2025", title:"Bi amazonense", text:"Confirma continuidade esportiva depois da subida de patamar." },
        ],
      },
    ],
    ctas: [{ label:"Ver elenco", href:"/elenco", external: false }],
  },"/clube/curiosidades": {
    eyebrow:"Clube",
    title:"Fatos que contam o clube.",
    text:"Curiosidade util organiza memoria curta, acesso rapido e argumentos que a torcida repete sem ruido.",
    image: assets.historyHero,
    imageFit:"cover",
    imagePosition:"object-[28%_22%]",
    introTitle:"Curiosidade so serve quando explica algo real.",
    intro: ["Esta secao filtra o que de fato diferencia o Amazonas. O clube nasce em 2019, sobe cedo, conquista titulo nacional em 2023 e vira referencia regional em tempo muito curto.","O ganho aqui e editorial. A pagina ajuda torcida, imprensa e comercial a repetir os mesmos pontos com precisao.",
    ],
    stats: [
      { label:"Fundacao", value:"23 mai 2019" },
      { label:"Acesso local", value:"menos de 6 meses" },
      { label:"Debut nacional", value:"2022" },
      { label:"Bi estadual", value:"2025" },
    ],
    blocks: [
      {
        title:"Curiosidades principais",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Origem", title:"Clube jovem", text:"Fundado em 2019 por um grupo de empresarios em Manaus." },
          { kicker:"Escala", title:"Subida rapida", text:"Acesso local em menos de seis meses de existencia." },
          { kicker:"Pioneirismo", title:"Titulo brasileiro", text:"Primeiro trofeu nacional do futebol amazonense em 2023." },
          { kicker:"Presenca", title:"Calendario cheio", text:"Hoje o clube combina protagonismo local e disputa nacional." },
        ],
      },
    ],
    ctas: [{ label:"Ler história", href:"/clube/historia", external: false }],
  },"/futebol/profissional": {
    eyebrow:"Futebol",
    title:"Profissional com leitura direta.",
    text:"A equipe principal precisa concentrar tabela, proximo jogo, artilharia e elenco em uma navegacao curta.",
    image: assets.heroTraining,
    imageFit:"cover",
    imagePosition:"object-[52%_24%]",
    introTitle:"Servico de time principal.",
    intro: ["A pagina profissional funciona como uma entrada curta para o futebol principal. O torcedor chega aqui para entender momento, proximo jogo e referencias do elenco.","O site ja tem pages mais profundas para Matchday, tabela e elenco. Aqui a funcao e agrupar esse acesso sem virar painel tecnico demais.",
    ],
    stats: [
      { label:"Série C", value: currentPosition },
      { label:"Pontos", value: String(serieCStatus.points) },
      { label:"Saldo", value: serieCStatus.goalDiff },
      { label:"Proximo", value: nextProfessionalMatch ? `${nextProfessionalMatch.home} x ${nextProfessionalMatch.away}` :"A confirmar" },
    ],
    blocks: [
      {
        title:"Recorte atual",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Tabela", title:"Posição atual", text: `${currentPosition} na Série C com ${serieCStatus.points} pontos.` },
          { kicker:"Jogo", title:"Proximo compromisso", text: nextProfessionalMatch ? `${nextProfessionalMatch.date} | ${nextProfessionalMatch.time}` :"Agenda em atualizacao." },
          { kicker:"Artilharia", title: leadScorer?.player ??"Artilheiro", text: leadScorer ? `${leadScorer.goals} gols na competicao.` :"Sem dado." },
          { kicker:"Elenco", title: `${squad.length} atletas`, text:"Base principal do time profissional cadastrada no site." },
        ],
      },
    ],
    ctas: [
      { label:"Abrir matchday", href:"/matchday", external: false },
      { label:"Abrir elenco", href:"/elenco", external: false },
    ],
  },"/futebol/base": {
    eyebrow:"Futebol",
    title:"Base com equipe e rotina.",
    text:"A base precisa existir como area propria. O conteudo inicial pode ser simples, desde que entregue nomes, funcao e linha de formacao.",
    image: assets.trainingWide,
    imageFit:"cover",
    imagePosition:"object-[50%_44%]",
    introTitle:"Formacao com leitura institucional.",
    intro: ["A base nao precisa parecer pagina esquecida. Ela precisa mostrar pessoas, fluxo de trabalho e um argumento claro de desenvolvimento esportivo.","Esse primeiro corte organiza nomes e funcoes. Quando houver mais material, entram calendario, categorias e resultados.",
    ],
    stats: [
      { label:"Goleiros", value: String(goalkeepers.length).padStart(2,"0") },
      { label:"Defesa", value: String(defenders.length).padStart(2,"0") },
      { label:"Meio", value: String(midfielders.length).padStart(2,"0") },
      { label:"Ataque", value: String(attackers.length).padStart(2,"0") },
    ],
    blocks: [
      {
        title:"Equipe da base",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-3",
        items: baseStaff.map((item) => ({
          kicker:"Base",
          title: item.title,
          text: item.text,
        })),
      },
    ],
    ctas: [{ label:"Ver elenco principal", href:"/elenco", external: false }],
  },"/institucional/estatuto": {
    eyebrow:"Institucional",
    title:"Estatuto e governanca.",
    text:"O torcedor nao abre esta area por entretenimento. Ele abre para encontrar regra, estrutura e referencia formal sem ruina visual.",
    image: assets.coachPhoto,
    imageFit:"cover",
    imagePosition:"object-[52%_20%]",
    introTitle:"Documento, regra e acesso rapido.",
    intro: ["Esta pagina organiza a camada formal do clube. O ideal e publicar versao consolidada do estatuto, data de revisao e contato institucional em um fluxo curto.","Enquanto a versao integral nao entra no site, a area precisa ao menos definir onde o documento oficial sera consultado.",
    ],
    blocks: [
      {
        title:"Estrutura minima",
        type:"cards",
        columns:"md:grid-cols-3",
        items: [
          { kicker:"Governanca", title:"Objeto do documento", text:"Regras de organizacao, representacao e funcionamento institucional." },
          { kicker:"Consulta", title:"Versao oficial", text:"Publicacao para leitura integral com data e controle de revisao." },
          { kicker:"Contato", title:"Canal formal", text:"Endereco de referencia para demandas estatutarias e institucionais." },
        ],
      },
    ],
    ctas: [{ label:"Site oficial", href: officialLinks.site, external: true }],
  },"/institucional/transparencia": {
    eyebrow:"Institucional",
    title:"Transparencia e prestacao.",
    text:"A area precisa servir clareza. Publicacao de documentos, parceiros e marcos ESG em um formato legivel.",
    image: assets.historyHero,
    imageFit:"cover",
    imagePosition:"object-[58%_20%]",
    introTitle:"Transparencia sem parede de PDF.",
    intro: ["Transparencia nao pede excesso de texto. Pede indice, datas, arquivos e uma hierarquia clara de leitura.","Quando o clube decidir publicar balancos, contratos padrao ou relatorios ESG, esta estrutura ja fica pronta.",
    ],
    blocks: [
      {
        title:"Publicacoes esperadas",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Financeiro", title:"Prestacao", text:"Balancos, relatorios anuais e notas de fechamento." },
          { kicker:"ESG", title:"Responsabilidade", text:"Projetos sociais, ambientais e indicadores de impacto." },
          { kicker:"Governanca", title:"Politicas", text:"Criterios internos, codigo e fluxos de decisao." },
          { kicker:"Arquivo", title:"Historico", text:"Versoes antigas com data e contexto de publicacao." },
        ],
      },
    ],
    ctas: [{ label:"Site oficial", href: officialLinks.site, external: true }],
  },"/institucional/comercial": {
    eyebrow:"Institucional",
    title:"Comercial e ativos do clube.",
    text:"Pagina comercial precisa falar com marca, patrocinador e parceiro. Inventario de propriedades, ativações e contato direto.",
    image: assets.heroTraining,
    imageFit:"cover",
    imagePosition:"object-[50%_22%]",
    introTitle:"Inventario legivel para patrocinio.",
    intro: ["O clube pode vender melhor quando mostra o que existe. Jogo, camisa, digital, base, conteudo e hospitalidade precisam entrar na mesma leitura.","Aqui o ideal e apresentar propriedades e um canal curto de contato comercial.",
    ],
    blocks: [
      {
        title:"Ativos principais",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Jogo", title:"Matchday", text:"Placas, experiences, ativações e exposicao em servico oficial." },
          { kicker:"Digital", title:"Conteudo", text:"Site, redes sociais, video e cobertura de partida." },
          { kicker:"Camisa", title:"Uniforme", text:"Frente, manga, costas e treinamento." },
          { kicker:"Formacao", title:"Base", text:"Projetos de longo prazo ligados a categorias de formacao." },
        ],
      },
    ],
    ctas: [{ label:"Contato comercial", href: officialLinks.site, external: true }],
  },"/institucional/imprensa": {
    eyebrow:"Institucional",
    title:"Imprensa e acesso oficial.",
    text:"Jornalista precisa de contato, credenciamento e material oficial sem garimpo. A pagina organiza isso.",
    image: assets.coachPhoto,
    imageFit:"cover",
    imagePosition:"object-[54%_18%]",
    introTitle:"Servico de imprensa direto.",
    intro: ["A area de imprensa precisa reduzir friccao. Credenciamento, foto oficial, releases e orientacao de cobertura entram em um mesmo fluxo.","O ganho e operacional. Menos pergunta repetida e menos demanda espalhada em canal errado.",
    ],
    blocks: [
      {
        title:"Servico minimo",
        type:"cards",
        columns:"md:grid-cols-2 xl:grid-cols-4",
        items: [
          { kicker:"Contato", title:"Assessoria", text:"Canal para pauta, pedido de entrevista e informacoes institucionais." },
          { kicker:"Credenciamento", title:"Jogo", text:"Fluxo de aprovacao e janela de pedido para cobertura." },
          { kicker:"Arquivo", title:"Midia", text:"Fotos oficiais, escudo e materiais de apoio para publicacao." },
          { kicker:"Releases", title:"Publicacao", text:"Notas oficiais e atualizacoes com data de envio." },
        ],
      },
    ],
    ctas: [{ label:"Abrir notícias", href:"/noticias", external: false }],
  },
};

export const sectionPageRoutes = Object.keys(sectionPages);
