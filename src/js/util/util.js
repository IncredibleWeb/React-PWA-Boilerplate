export function toQueryString(obj) {
  let str = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
  let timeout;
  return () => {
    let context = this;
    let args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// function returns a universally unique identifier (note this is not RFC4122 compliant)
export function getUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

// retrieves a parameter from the query string by name
export function getParameterByName(name, string) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  let results = regex.exec(string || location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (
    match != null &&
    match.length > 2 &&
    typeof match[2] === "string" &&
    match[2].length > 0
  ) {
    return match[2];
  } else {
    return "";
  }
}

// append key=value to query string
export function updateQueryStringParameter(uri, key, value) {
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

export function removeQueryParameter(uri, key) {
  // prefer to use l.search if you have a location/link object
  let prefix = encodeURIComponent(key) + "=";
  let pars = uri.split(/[&;]/g);
  // reverse iteration as may be destructive
  for (let i = pars.length; i-- > 0; ) {
    // idiom for string.startsWith
    if (pars[i].lastIndexOf(prefix) !== -1) {
      pars.splice(i, 1);
    }
  }
  uri = pars.length > 0 ? pars.join("&") : "";
  return uri;
}
