// polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
(function() {
  if (typeof window === "undefined") return;

  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export function fireEvent(action, data = {}) {
  var gaData = {
    route: {
      url: "",
      name: document.title
    }
  };

  if (typeof ga_data !== "undefined") gaData = clone(ga_data);
  gaData.route.url = window.location.href;

  var detail = {
    action,
    data,
    route: gaData.route,
    name: gaData.name
  };

  window.dispatchEvent(
    new CustomEvent("ga-event", {
      detail
    })
  );
  if (process.env.NODE_ENV === "development") console.log("ga-event", detail);
}

export function firePageView() {
  var gaData = {
    route: {
      url: "",
      name: document.title
    }
  };
  if (typeof ga_data !== "undefined") gaData = clone(ga_data);
  gaData.route.url = window.location.href;
  // TODO get the SSTS for this
  // gaData.route.ssts = 'news/politics/elections/elections-quiz-2018';

  var detail = {
    route: gaData.route,
    name: gaData.name
  };

  window.dispatchEvent(
    new CustomEvent("ga-page-view", {
      detail: detail
    })
  );

  if (process.env.NODE_ENV === "development")
    console.log("ga-page-view", detail);
}
