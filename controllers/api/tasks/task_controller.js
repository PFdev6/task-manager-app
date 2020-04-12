const db = require("../../../models");
const mailer = require("../../../services/mailer");
const jwt = require("jsonwebtoken");

const createTask = (req, res) => {
  console.log(req.body);
  let { tasks, userId, groupId } = req.body;
  const mainTask = { ...tasks[0], ...{ type_task: db.Task.MAIN_TASK } };
  const taskOwner =
    mainTask.taskOwner === "Own" ? { user_id: userId } : { group_id: groupId };
  tasks.pop();
  const subTasks = tasks;

  db.Task.create(...mainTask, ...taskOwner)
    .then(task => {
      if (subTasks.length !== 0) {
        subTasks.forEach(subTask => {
          db.Task.create(
            ...subTask,
            ...taskOwner,
            ...{ parent_task_id: task.id, type_task: db.Task.SUB_TASK }
          );
        });
      }
      res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
};

module.exports.create = createTask;
