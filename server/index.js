require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const bodyParser = require("body-parser");
const routes = require("../routes/index");

console.log(process.env.AUTH_TYPE);
require(`./auth/${process.env.AUTH_TYPE}`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(DIST_DIR));

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

routes(app);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
