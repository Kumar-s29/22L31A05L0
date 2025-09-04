// Entry point for the URL Shortener Microservice
const express = require("express");
const bodyParser = require("body-parser");
const shortUrlRoutes = require("./routes/shortUrlRoutes");

const { loggingMiddleware } = require("./LogginMiddlewares/loggingMiddleware");

const app = express();
app.use(bodyParser.json());
app.use(loggingMiddleware);

app.use("/shorturls", shortUrlRoutes);

// Redirection endpoint
app.get("/:shortcode", require("./controllers/redirectController"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`URL Shortener Microservice running on port ${PORT}`);
});
