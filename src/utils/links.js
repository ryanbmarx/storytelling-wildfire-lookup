/* link utilities */

const SLUG = "wildfires-lookup"; // TODO define SLUG somewhere else
const GIT_BRANCH = process.env.GIT_BRANCH || "dev";
const CDN_HOST = "https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps";
const DEFAULT_ASSET_PATH = `${CDN_HOST}/${GIT_BRANCH}/${SLUG}/`;

export function urlFor(path, base) {
  base = base || undefined;
  const url = new URL(path, base);
  return url.toString();
}

export function base(domain = "usatoday") {
  let ASSET_PATH = process.env.ASSET_PATH || DEFAULT_ASSET_PATH;
  let BASE_URL;

  if (typeof window === "undefined") {
    BASE_URL = `https://${domain}/${SLUG}/`;

    return {
      BASE_URL,
      ASSET_PATH
    };
  }

  if (!ASSET_PATH) ASSET_PATH = `${window.location.origin}/`;

  switch (window.location.hostname) {
    case "localhost":
    case "0.0.0.0":
      BASE_URL = ASSET_PATH = `${window.location.origin}/`;
      break;

    case "www.gannett-cdn.com":
      BASE_URL = ASSET_PATH;
      break;

    case `dev-uw.${domain}.com`:
      BASE_URL = `https://dev-uw.${domain}.com/${SLUG}/`;
      break;

    default:
      BASE_URL = `https://${window.location.hostname}/${SLUG}/`;
  }

  return {
    BASE_URL,
    ASSET_PATH
  };
}