const models = require("../models");
const c = require("../controllers/index");
const passport = require("passport");
const secureRoute = () => passport.authenticate("jwt", { session: false });

module.exports = app => {
  app.get("/api", secureRoute(), (req, res) => {
    res.status(200).send({
      data: "Welcome Node Sequlize API v1"
    });
  });

  // Authentication
  app.post("/api/login", c.authentication_controller.login);
  app.post("/api/logout", c.authentication_controller.logout);
  app.post("/api/singUp", c.authentication_controller.signUp);
  app.get("/api/confirmUser", c.authentication_controller.confirmUser);

  // Tasks
  app.post("/api/tasks/create", secureRoute(), c.task_controller.create);
  app.post("/api/tasks/done", secureRoute(), c.task_controller.done);
  app.delete("/api/tasks/delete", secureRoute(), c.task_controller.delete);
  app.get("/api/tasks", secureRoute(), c.task_controller.get);
};
