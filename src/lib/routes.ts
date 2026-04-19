const LEGACY_ROUTE_PARAM ="route";

export function normalizeRoute(value) {
  if (value instanceof URL) {
    return normalizeRoute(value.pathname);
  }

  let route = String(value ??"").trim();

  if (!route || route ==="/") {
    return"/";
  }

  if (/^https?:\/\//i.test(route)) {
    return normalizeRoute(new URL(route).pathname);
  }

  if (route.startsWith("#/")) {
    route = route.slice(1);
  }

  if (!route.startsWith("/")) {
    route = `/${route}`;
  }

  route = route.replace(/\/{2,}/g,"/");

  if (route.length > 1) {
    route = route.replace(/\/+$/,"");
  }

  return route ||"/";
}

export function normalizeLegacyHash(hash) {
  if (!hash?.startsWith("#/")) {
    return null;
  }

  return normalizeRoute(hash.slice(1));
}

export function routeFromLocation(location) {
  const redirectedRoute = new URLSearchParams(location.search).get(LEGACY_ROUTE_PARAM);
  const legacyRoute = normalizeLegacyHash(location.hash);
  return normalizeRoute(redirectedRoute ?? legacyRoute ?? location.pathname);
}

export function buildRouteUrl(route, search ="") {
  const params = new URLSearchParams(search);
  params.delete(LEGACY_ROUTE_PARAM);
  const normalizedRoute = normalizeRoute(route);
  const query = params.toString();
  return `${normalizedRoute}${query ? `?${query}` :""}`;
}

export function buildCanonicalUrl(route, origin) {
  return new URL(normalizeRoute(route), origin).href;
}

export function canHandleClientNavigation(anchor, origin) {
  const href = anchor.getAttribute("href");

  if (!href || href.startsWith("#") || anchor.target ==="_blank" || anchor.hasAttribute("download")) {
    return false;
  }

  try {
    const url = new URL(anchor.href, origin);
    return url.origin === origin;
  } catch {
    return false;
  }
}

export function routeFromHref(href, origin) {
  const url = new URL(href, origin);
  return routeFromLocation(url);
}
