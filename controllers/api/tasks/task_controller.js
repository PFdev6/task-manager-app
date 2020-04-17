const db = require("../../../models");
const mailer = require("../../../services/mailer");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");

const createTask = (req, res) => {
  console.log(req.body);
  let { tasks, userId, groupId } = req.body.params;
  console.log(tasks[0]);
  let mainTask = { ...tasks[0], ...{ type_task: db.Task.MAIN_TASK } };
  mainTask.end_date = mainTask.endDate;
  const taskOwner = mainTask.taskOwner === "Own" ? { user_id: userId } : { group_id: groupId };
  tasks.reverse().pop();
  const subTasks = tasks;

  db.Task.create({...mainTask, ...taskOwner})
    .then(async task => {
      console.log("new Task!!!");
      console.log(task);
      if (subTasks.length !== 0) {
        console.log("new subTasks!!!");
        
        await subTasks.forEach(subTask => {
          subTask.end_date = subTask.endDate;
          console.log(subTasks)
          db.Task.create({
            ...subTask,
            ...taskOwner,
            ...{ parent_task_id: task.id, type_task: db.Task.SUB_TASK }
          })
          console.log("new subTask!!!!!!!");
        });
      }

      if (taskOwner.user_id) {
        await db.User.findOne({ where: { id: taskOwner.user_id } }).then(user => {
          sendMailNotifications([user], task);
        });
      } else {
        await db.Group.findOne({ where: { id: taskOwner.group_id } }).then(group => {
          sendMailNotifications(group.users, task);
        });
      }
      return task;
    })
    .then(task => res.status(200).send(task))
    .catch(error => res.status(400).send(error));
};

const sendMailNotifications = (users, mainTask) => {
  const date = new Date(mainTask.end_date);
  console.log(date);
  users.forEach(user => {
    schedule.scheduleJob(date, () => {
      mailer.notifyToTask(user, mainTask);
    });
  });
};

module.exports.create = createTask;
