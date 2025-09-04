const express = require("express");
const router = express.Router();
const shortUrlController = require("../controllers/shortUrlController");
const statsController = require("../controllers/statsController");

// Create short URL
router.post("/", shortUrlController.createShortUrl);

// Get statistics for a short URL
router.get("/:shortcode", statsController.getShortUrlStats);

module.exports = router;
