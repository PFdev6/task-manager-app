import * as React from "react";
import { authContext } from "../contexts/AuthContext";

const TaskContainer = () => {
  const { auth } = React.useContext(authContext).auth;
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getUserTasks = () => {
    setLoading(true);
    apiRequest(
      "/api/tasks",
      "get",
      {
        params
      },
      auth.token
    )
      .then(data => {
        setLoading(false);
        setTasks(data);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.message);
      });
  };

  return <></>;
};

export default TaskContainer;
