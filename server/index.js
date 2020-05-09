require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const DIST_DIR = path.join(__dirname, "../dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const bodyParser = require("body-parser");
const routes = require("../routes/index");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const wsRoutes = require("./ws-index");
const multer = require('multer');

console.log(process.env.AUTH_TYPE);
require(`./auth/${process.env.AUTH_TYPE}`);

// File Storage
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, "./Images");
  },
  filename: (req, file, callback) => {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
app.use((req, res, next) => {
  req.uploadFile = multer({
    storage: Storage
  }).array("imgUploader", 3);
  
  next()
})

// HTTP APP
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(DIST_DIR));
app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});
routes(app);

// WEBSOCKET APP
wsRoutes(io);

http.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
