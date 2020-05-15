import * as React from "react";
import { taskContext } from "../contexts/TaskContext";
import { authContext } from "../contexts/AuthContext";
import Task from "../components/Task";
import { Container, Button, Row, Col, Input } from "reactstrap";
import { apiRequest } from "../utils/Helpers";

const TaskContainer = () => {
  const { auth } = React.useContext(authContext);
  const { tasks, setTasks } = React.useContext(taskContext);
  const [loading, setLoading] = React.useState(false);
  const [typeTask, setTypeTask] = React.useState(true);
  const [changeButtonLabel, setChangeButtonLabel] = React.useState(
    "Group Tasks"
  );
  const toCompact = tsks => {
    let result = [];
    for (let i = 0; i < tsks.length; i += 3) {
      let chunk = tsks.slice(i, i + 3);
      result.push(chunk);
    }
    return result;
  };

  const getUserTasks = async find => {
    setLoading(true);
    let response = await apiRequest(
      `/api/tasks?${find.by}=${find.id}`,
      "get",
      null,
      auth.token
    );
    setLoading(false);
    setTasks({ type: "add", init: true, newTasks: response });
  };

  const changeTask = () => {
    if (typeTask) {
      getUserTasks({ by: "group_id", id: auth.group_id });
      setChangeButtonLabel("User Tasks");
    } else {
      getUserTasks({ by: "user_id", id: auth.id });
      setChangeButtonLabel("Group Tasks");
    }
    setTypeTask(!typeTask);
  };

  const changeSearchText = (e) => {
    const searchText = e.target.value;

    if(searchText === "") {
      getUserTasks({ by: "user_id", id: auth.id });
    } else {
      apiRequest(
        `/api/tasks/search?text=${searchText}`,
        "get",
        null,
        auth.token
      ).then((tasks) => {
        setTasks({ type: "add", init: true, newTasks: tasks });
      });
    }
  };

  React.useEffect(() => {
    getUserTasks({ by: "user_id", id: auth.id });
  }, []);

  return (
    <Container>
      {auth.group_id ? (
        <Row>
          <Col>
            <Button onClick={changeTask}>{changeButtonLabel}</Button>
          </Col>
        </Row>
      ) : null}
        <Row>
          <Col>
            <Input placeholder="Search" type="text" onChange={changeSearchText}/>
          </Col>
        </Row>
      {toCompact(tasks).map((taskChunk, key) => {
        return (
          <Row key={key}>
            {taskChunk.map(task => {
              return (
                <Col key={task.id}>
                  <Task data={task} />
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default TaskContainer;
