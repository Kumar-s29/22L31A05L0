// Utilities for shortcode generation and validation
const ALPHANUM =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateShortcode(length = 6) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  return code;
}

function isValidShortcode(code) {
  return typeof code === "string" && /^[a-zA-Z0-9]{4,}$/.test(code);
}

module.exports = { generateShortcode, isValidShortcode };
