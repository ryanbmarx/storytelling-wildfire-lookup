export function isStandalone() {
  return window.location.href.indexOf("/in-depth/") < 0 && window.location.href.indexOf("/preview/") < 0;
}
