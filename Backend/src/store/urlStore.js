// In-memory store for URLs and stats
const store = {};

module.exports = {
  save(shortcode, url, expiry) {
    store[shortcode] = {
      url,
      expiry,
      createdAt: new Date().toISOString(),
      clicks: [],
    };
  },
  exists(shortcode) {
    return !!store[shortcode];
  },
  get(shortcode) {
    return store[shortcode];
  },
  logClick(shortcode, req) {
    if (!store[shortcode]) return;
    store[shortcode].clicks.push({
      timestamp: new Date().toISOString(),
      referrer: req.get("referer") || "",
      geo: req.ip, // For demo, just IP
    });
  },
  getStats(shortcode) {
    const entry = store[shortcode];
    if (!entry) return null;
    return {
      url: entry.url,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      totalClicks: entry.clicks.length,
      clicks: entry.clicks,
    };
  },
};
