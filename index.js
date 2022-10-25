//config inicial
const express = require(`express`);
const tokensRoutes = require("./routes/tokensRoutes");
const app = express();
src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/tokens", tokensRoutes);

module.exports = app;
