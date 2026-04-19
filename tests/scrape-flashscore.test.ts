import test from"node:test";
import assert from"node:assert/strict";
import {
  TIME_ZONE,
  buildRecentResults,
  buildStatus,
  competitionLabel,
  roundLabel,
  validateCompetitionPayload,
} from"../scripts/scrape-flashscore.mjs";

test("scraper keeps the project timezone pinned to Manaus", () => {
  assert.equal(TIME_ZONE,"America/Manaus");
});

test("roundLabel and competitionLabel normalize presentation strings", () => {
  assert.equal(roundLabel("Round 12"),"12ª rodada");
  assert.equal(competitionLabel("BRAZIL: Copa Norte"),"Copa Verde");
});

test("buildStatus derives Amazonas status from standings", () => {
  const status = buildStatus(
    [
      { team:"Londrina", rank: 1, points: 11, wins: 3, draws: 2, losses: 0, goalsFor: 8, goalsAgainst: 3, diff:"+5" },
      { team:"Amazonas", rank: 2, points: 10, wins: 3, draws: 1, losses: 1, goalsFor: 7, goalsAgainst: 4, diff:"+3" },
    ],
    new Date("2026-04-18T19:36:20.666Z"),
  );

  assert.equal(status.position,"2º");
  assert.equal(status.points, 10);
  assert.equal(status.record,"3V 1E 1D");
});

test("buildRecentResults enriches match service fields for Amazonas results", () => {
  const [result] = buildRecentResults([
    {
      id:"abc",
      timestamp: 1_744_995_200,
      competition:"Serie C",
      round:"12ª rodada",
      date:"18 abr",
      day:"sábado",
      time:"15h30",
      home:"Amazonas",
      away:"Londrina",
      homeLogo:"/team-logos/amazonas.png",
      awayLogo:"/team-logos/londrina.png",
      venue:"Arena da Amazônia",
      city:"Manaus",
      homeGoals: 2,
      awayGoals: 1,
    },
  ]);

  assert.equal(result.opponent,"Londrina");
  assert.equal(result.side,"Casa");
  assert.equal(result.outcome,"V");
  assert.equal(result.venue,"Arena da Amazônia");
  assert.equal(result.time,"15h30");
});

test("validateCompetitionPayload rejects incomplete generated data", () => {
  assert.throws(
    () =>
      validateCompetitionPayload({
        source: { scrapedAt:"invalid" },
        status: {},
        standings: [],
        fixtures: [],
        simulationFixtures: [],
        topScorers: [],
        recentResults: [],
      }),
    /missing|ISO string|incomplete|empty/i,
  );
});
