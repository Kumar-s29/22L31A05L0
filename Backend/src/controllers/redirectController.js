// Handles redirection for short URLs

const urlStore = require("../store/urlStore");
const log = require("../LogginMiddlewares/loggingMiddleware");

module.exports = (req, res) => {
  const { shortcode } = req.params;
  const entry = urlStore.get(shortcode);
  if (!entry) {
    log("backend", "error", "handler", "shortcode not found for redirection");
    return res.status(404).json({ error: "Shortcode not found." });
  }
  // Check expiry
  if (new Date() > new Date(entry.expiry)) {
    log("backend", "warn", "handler", "short link expired during redirection");
    return res.status(410).json({ error: "Short link expired." });
  }
  // Log click
  urlStore.logClick(shortcode, req);
  log(
    "backend",
    "info",
    "handler",
    `redirected to original URL for shortcode: ${shortcode}`
  );
  return res.redirect(entry.url);
};
