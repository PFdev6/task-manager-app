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

  // Groups
  app.post("/api/groups/create", secureRoute(), c.group_controller.create);
  app.get("/api/groups/:id/users", secureRoute(), c.group_controller.getUsers);
  app.post(
    "/api/groups/confirmInvite",
    secureRoute(),
    c.group_controller.confirmInvite
  );
  app.delete(
    "/api/groups/:id/users/:user_id/kick",
    secureRoute(),
    c.group_controller.kick
  );
  app.post(
    "/api/groups/:id/users/invite",
    secureRoute(),
    c.group_controller.invite
  );
  app.delete(
    "/api/groups/:id/delete",
    secureRoute(),
    c.group_controller.delete
  );

  // Notifications
  app.get(
    "/api/user/:userId/notifications/",
    secureRoute(),
    c.notification_controller.get
  );
  app.get(
    "/api/task/:taskId/notifications/",
    secureRoute(),
    c.notification_controller.get
  );
};
