// Custom Logging Middleware for AffordMed URL Shortener
// Sends logs to the evaluation Log API as per requirements
const axios = require("axios");

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

// Allowed values
const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const PACKAGES = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
];

function log(stack, level, pkg, message) {
  // Validate fields
  if (!STACKS.includes(stack)) throw new Error("Invalid stack");
  if (!LEVELS.includes(level)) throw new Error("Invalid level");
  if (!PACKAGES.includes(pkg)) throw new Error("Invalid package");
  if (typeof message !== "string" || !message.trim())
    throw new Error("Invalid message");
  // Send log
  axios
    .post(LOG_API_URL, {
      stack,
      level,
      package: pkg,
      message,
    })
    .catch(() => {}); // Ignore errors for logging
}

// Express middleware to log each request
function loggingMiddleware(req, res, next) {
  log("backend", "info", "route", `Incoming ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = log;
module.exports.loggingMiddleware = loggingMiddleware;
