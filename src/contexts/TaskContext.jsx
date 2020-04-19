import * as React from "react";

export const DEFAULT_TASKS_CONTEXT = [];

const initialState = DEFAULT_TASKS_CONTEXT;

const reducer = (tasks, action) => {
  switch (action.type) {
    case "add":
      return [...tasks, ...action.newTasks];
    case "update":
      return tasks.map(task => {
        if (task.id === action.newTask.id) {
          task = action.newTask;
        }
        return task;
      });
    case "delete":
      return tasks.filter(task => task.id != action.taskId);
    default:
      throw new Error();
  }
};

export const taskContext = React.createContext({
  tasks: [],
  setTasks: () => {}
});

const { Provider } = taskContext;
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = React.useReducer(reducer, initialState);
  return <Provider value={{ tasks, setTasks }}>{children}</Provider>;
};

export default TaskProvider;
