const authentication_controller = require("./api/authentication_controller");
const task_controller = require("./api/tasks/task_controller");
const group_controller = require("./api/group/group_controller");
const notification_controller = require("./api/notification/notification_controller");

module.exports = {
  authentication_controller,
  task_controller,
  group_controller,
  notification_controller
};
