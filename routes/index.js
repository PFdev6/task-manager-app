const models = require("../models");
const c = require("../controllers/index");
const passport = require("passport");
const secureRoute = () => passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.get("/api", (req, res) => {
    res.status(200).send({
      data: "Welcome Node Sequlize API v1"
    });
  });

  app.post("/api/login", c.authentication_controller.login);
  app.post("api/logout", c.authentication_controller.logout);
  app.post("/api/singUp", c.authentication_controller.signUp);
  app.get("/api/confirmUser", c.authentication_controller.confirmUser);
};
