# Amazonas FC Digital

Site experimental do Amazonas FC com foco em matchday, calendario, classificacao, titulos, noticias, socio torcedor, loja, elenco e historia.

O projeto usa React como casca principal, Vue para islands interativas pontuais, Tailwind CSS v4 via Vite e uma rotina Node para gerar dados de calendario, tabela, resultados recentes e escudos a partir do Flashscore.

## Stack

- Vite 8
- React
- Vue
- Tailwind CSS v4
- Framer Motion
- Node.js `^20.19.0 || >=22.12.0`

## Requisitos

- Node.js compativel com Vite 8
- npm
- Acesso de rede para executar a raspagem do Flashscore

## Instalacao

```bash
npm install
```

## Desenvolvimento

Gere os dados esportivos antes de abrir o site:

```bash
npm run scrape:flashscore
```

Suba o servidor local:

```bash
npm run dev
```

Endereco padrao:

```text
http://127.0.0.1:5173/
```

## Scripts

### `npm run dev`

Inicia o Vite em `127.0.0.1`.

### `npm run build`

Gera a versao de producao em `dist`.

### `npm run preview`

Serve a build localmente para validacao.

### `npm run scrape:flashscore`

Executa a raspagem uma vez.

Responsabilidades:

- buscar proximos jogos do Amazonas
- buscar resultados da Serie C
- calcular classificacao da Serie C com base nos resultados raspados
- gerar ultimos resultados do Amazonas
- baixar escudos dos clubes para assets publicos locais
- atualizar o modulo de dados gerado usado pela interface

### `npm run watch:flashscore`

Executa a raspagem imediatamente e repete em intervalo.

Intervalo padrao: 15 minutos.

Para alterar:

PowerShell:

```powershell
$env:FLASHSCORE_INTERVAL_MINUTES = "30"
npm run watch:flashscore
```

Bash:

```bash
FLASHSCORE_INTERVAL_MINUTES=30 npm run watch:flashscore
```

O script aplica minimo de 5 minutos para evitar loop agressivo.

## Estrutura

```text
assets/
  imagens estaticas do projeto

public/
  arquivos servidos diretamente pelo Vite
  team-logos/
    escudos baixados pela raspagem

scripts/
  scrape-flashscore.mjs
  watch-flashscore.mjs

src/
  App.jsx
  main.jsx
  styles.css

  components/
    componentes React reutilizaveis

  data/
    club.js
    competition.generated.js

  pages/
    paginas da aplicacao por rota hash

  vue/
    Vue islands montadas dentro do React
```

## Rotas

A aplicacao usa hash routing simples.

```text
#/          Home
#/matchday  Matchday
#/noticias  Noticias
#/elenco    Elenco
#/socio     Socio
#/loja      Loja
#/historia  Historia
```

## Dados

### Dados editoriais

Os dados editoriais ficam em `src/data/club.js`.

Inclui:

- navegacao
- links oficiais
- estatisticas institucionais
- titulos
- jogos mockados do match center
- noticias
- elenco
- planos de socio
- produtos
- linha do tempo

### Dados gerados

Os dados esportivos gerados ficam em `src/data/competition.generated.js`.

Esse arquivo e sobrescrito por:

```bash
npm run scrape:flashscore
```

Nao edite esse arquivo manualmente. Edicoes manuais serao perdidas na proxima raspagem.

Exports principais:

- `competitionSource`: metadados da raspagem
- `serieCStatus`: resumo da posicao atual do Amazonas
- `serieCStandings`: top 8 da classificacao calculada
- `upcomingSerieC`: proximos jogos exibidos no calendario
- `recentSerieCResults`: resultados recentes do Amazonas

## Raspagem do Flashscore

A raspagem usa os feeds iniciais embutidos no HTML do Flashscore.

Fontes usadas:

- pagina de fixtures do Amazonas
- pagina de resultados da Serie C

O script busca blocos `cjs.initialFeeds`, interpreta os registros do feed, normaliza alguns nomes de clubes e gera dados estruturados para a UI.

Escudos:

- o feed traz nomes de arquivos de escudo
- o script baixa os PNGs para `public/team-logos`
- a UI usa caminhos locais como `/team-logos/<arquivo>.png`
- isso evita depender de hotlink direto para o CDN do Flashscore no navegador

Limites conhecidos:

- o Flashscore nao oferece contrato publico estavel para esse feed
- campos internos podem mudar sem aviso
- estadio e cidade podem vir incompletos, por isso alguns jogos usam `A confirmar`
- a classificacao e calculada pelos resultados raspados, nao por uma API oficial de tabela

Quando a raspagem falhar, cheque nesta ordem:

1. se o Flashscore mudou os nomes dos feeds
2. se os separadores internos do feed mudaram
3. se os campos de time, placar ou escudo mudaram
4. se houve bloqueio temporario de rede

## UI

Principais superficies:

- hero com identidade do clube
- barra de proximo jogo com countdown e ultimo resultado
- faixa de titulos
- calendario, ultimos resultados e classificacao
- match center com servico de jogo
- noticias com hierarquia editorial
- socio torcedor com comparacao de planos
- rodape com navegacao e canais oficiais

React renderiza a estrutura principal. Vue e usado apenas onde ha interacao isolada e local, como match center, comparador de socio e explorador de elenco.

## Estilo

Diretrizes praticas:

- preto e amarelo como base de identidade
- tipografia condensada para chamadas
- informacao esportiva densa, mas escaneavel
- cards apenas quando representam itens reais
- evitar texto explicativo de design dentro da UI
- manter estados ativos visiveis e inequivocos

## Build de producao

```bash
npm run scrape:flashscore
npm run build
```

Antes de publicar:

1. rode a raspagem
2. confirme que `public/team-logos` tem os escudos
3. rode o build
4. teste a build com preview

```bash
npm run preview
```

## Checklist de manutencao

Antes de abrir PR ou publicar:

- `npm run scrape:flashscore`
- `npm run build`
- validar home em desktop
- validar home em mobile
- conferir se a barra de proximo jogo nao quebrou em nomes longos
- conferir se os escudos aparecem nos jogos e na tabela
- conferir se o plano premium do socio esta totalmente visivel
- conferir se noticias mostram titulo sem depender de scroll interno

## Proximas evolucoes

- pagina individual de jogador com numero, posicao, origem, idade e estatisticas
- modo matchday para menos de 48 horas antes do jogo
- escalacao provavel quando houver fonte confiavel
- mini relatorio para resultados recentes
- cache ou endpoint proprio para dados esportivos em producao
