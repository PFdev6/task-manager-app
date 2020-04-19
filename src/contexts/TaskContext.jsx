import * as React from "react";

export const DEFAULT_TASKS_CONTEXT = [];

const initialState = DEFAULT_TASKS_CONTEXT;

const reducer = (tasks, action) => {
  switch (action.type) {
    case "add":
      if (action.init) {
        return action.newTasks;
      }
      return [...tasks, ...action.newTasks];
    case "update":
      let result = tasks.filter(task => task.id != Number(action.newTask.id));
      return [...result, action.newTask];
    case "delete":
      return tasks.filter(task => task.id != Number(action.taskId));
    default:
      throw new Error();
  }
};

export const taskContext = React.createContext({
  tasks: [],
  setTasks: () => { }
});

const { Provider } = taskContext;
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = React.useReducer(reducer, initialState);
  return <Provider value={{ tasks, setTasks }}>{children}</Provider>;
};

export default TaskProvider;
