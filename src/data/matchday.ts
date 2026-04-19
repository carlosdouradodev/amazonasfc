import { recentSerieCResults, upcomingSerieC } from"./competition.generated";

const DEFAULT_CHANNEL ="TV Onça";

function buildTicketLabel(match) {
  if (match.home ==="Amazonas") {
    return"Site oficial";
  }

  return"Informações do mandante";
}

function buildUpcomingMatch(match) {
  return {
    ...match,
    status:"Próximo jogo",
    ticket: buildTicketLabel(match),
    channel: DEFAULT_CHANNEL,
  };
}

function buildRecentResult(match) {
  return {
    ...match,
    status:"Finalizado",
    ticket:"Arquivo do jogo",
    channel: DEFAULT_CHANNEL,
    venue: match.venue ||"A confirmar",
    city: match.city ||"",
    time: match.time ||"Encerrado",
  };
}

export const featuredMatchdayMatch = upcomingSerieC[0] ? buildUpcomingMatch(upcomingSerieC[0]) : null;

export const recentMatchdayResults = recentSerieCResults.map(buildRecentResult);

export const matchdayMatches = [featuredMatchdayMatch, ...recentMatchdayResults].filter(Boolean);
