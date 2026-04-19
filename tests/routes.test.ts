import test from"node:test";
import assert from"node:assert/strict";
import { buildRouteUrl, normalizeLegacyHash, normalizeRoute, routeFromLocation } from"../src/lib/routes";

test("normalizeRoute normalizes clean pathnames and legacy hashes", () => {
  assert.equal(normalizeRoute("matchday/"),"/matchday");
  assert.equal(normalizeRoute("/noticias/tecnico/"),"/noticias/tecnico");
  assert.equal(normalizeRoute("#/elenco"),"/elenco");
});

test("normalizeLegacyHash only accepts legacy route hashes", () => {
  assert.equal(normalizeLegacyHash("#/loja"),"/loja");
  assert.equal(normalizeLegacyHash("#main-content"), null);
});

test("routeFromLocation prioritizes redirect query and legacy hash", () => {
  const redirected = new URL("https://amazonasfc.com.br/?route=/matchday&debug=1");
  const legacy = new URL("https://amazonasfc.com.br/#/noticias/tecnico");

  assert.equal(routeFromLocation(redirected),"/matchday");
  assert.equal(routeFromLocation(legacy),"/noticias/tecnico");
});

test("buildRouteUrl removes legacy redirect query", () => {
  assert.equal(buildRouteUrl("/matchday","?route=/elenco&debug=1"),"/matchday?debug=1");
});
