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
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

console.log(process.env.AUTH_TYPE);
require(`./auth/${process.env.AUTH_TYPE}`);

// File Upload
app.use(fileUpload({
  createParentPath: true,
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'temp')
}));

// HTTP APP
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(DIST_DIR));
app.use(morgan('dev'));
// files URL/uploads/FILENAME
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});
routes(app);

// WEBSOCKET APP
wsRoutes(io);

http.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
