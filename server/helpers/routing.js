// permanent redirect http requests
export function requireHttps(req, res, next) {
  if (/^localhost$/.test(req.hostname)) {
    // skip if localhost
    return next();
  } else if (req.secure) {
    // if already on HTTPS
    return next();
  } else if (req.get("x-arr-ssl")) {
    // https://coderead.wordpress.com/2014/09/05/redirecting-to-https-in-node-js-on-azure-websites/
    return next();
  } else {
    return res.redirect(
      301,
      req.protocol + "s" + "://" + req.headers.host + req.url
    );
  }
}

// permanent redirect to include www
export function requireWww(req, res, next) {
  if (/^localhost$/.test(req.hostname)) {
    // skip if localhost
    return next();
  } else if (/\.azurewebsites.net$/.test(req.hostname)) {
    // skip if azurewebsites
    return next();
  } else if (/^www\./i.test(req.headers.host)) {
    // www. already there
    return next();
  } else {
    return res.redirect(
      301,
      req.protocol + "://www." + req.headers.host + req.url
    );
  }
}
