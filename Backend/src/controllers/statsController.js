// Handles statistics retrieval for short URLs

const urlStore = require("../store/urlStore");
const log = require("../LogginMiddlewares/loggingMiddleware");

exports.getShortUrlStats = (req, res) => {
  const { shortcode } = req.params;
  const data = urlStore.getStats(shortcode);
  if (!data) {
    log(
      "backend",
      "error",
      "handler",
      "shortcode not found for stats retrieval"
    );
    return res.status(404).json({ error: "Shortcode not found." });
  }
  log(
    "backend",
    "info",
    "handler",
    `stats retrieved for shortcode: ${shortcode}`
  );
  return res.json(data);
};
