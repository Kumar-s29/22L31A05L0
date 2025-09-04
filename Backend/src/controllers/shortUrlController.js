// Handles creation of short URLs

const {
  generateShortcode,
  isValidShortcode,
} = require("../utils/shortcodeUtils");
const urlStore = require("../store/urlStore");
const log = require("../LogginMiddlewares/loggingMiddleware");

exports.createShortUrl = (req, res) => {
  const { url, validity = 30, shortcode } = req.body;
  // Validate URL
  if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
    log("backend", "error", "handler", "received string, expected valid URL");
    return res.status(400).json({ error: "Invalid or missing URL." });
  }
  // Validate validity
  if (isNaN(validity) || validity <= 0) {
    log(
      "backend",
      "error",
      "handler",
      "received invalid validity, expected positive integer"
    );
    return res
      .status(400)
      .json({ error: "Validity must be a positive integer (minutes)." });
  }
  // Handle shortcode
  let code = shortcode;
  if (code) {
    if (!isValidShortcode(code)) {
      log("backend", "error", "handler", "received invalid shortcode format");
      return res.status(400).json({ error: "Invalid shortcode format." });
    }
    if (urlStore.exists(code)) {
      log("backend", "error", "handler", "shortcode already exists");
      return res.status(409).json({ error: "Shortcode already exists." });
    }
  } else {
    code = generateShortcode();
    while (urlStore.exists(code)) {
      code = generateShortcode();
    }
  }
  // Store URL
  const expiry = new Date(Date.now() + validity * 60000).toISOString();
  urlStore.save(code, url, expiry);
  log("backend", "info", "handler", `short URL created: ${code}`);
  return res.status(201).json({
    shortLink: `${req.protocol}://${req.get("host")}/${code}`,
    expiry,
  });
};
