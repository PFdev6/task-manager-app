import * as React from "react";
import { taskContext } from "../contexts/TaskContext";
import { authContext } from "../contexts/AuthContext";
import Task from "../components/Task";
import { Container, Row, Col } from "reactstrap";
import { apiRequest } from "../utils/Helpers";

const TaskContainer = () => {
  const { auth } = React.useContext(authContext);
  const { tasks, setTasks } = React.useContext(taskContext);
  const [loading, setLoading] = React.useState(false);

  const toCompact = (tsks) => {
    let result = [];
    for (let i = 0; i < tsks.length; i += 3) {
      let chunk = tsks.slice(i, i + 3);
      result.push(chunk);
    }
    return result
  }
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

  React.useEffect(() => {
    getUserTasks({ by: "user_id", id: auth.id });
  }, []);

  return (
    <Container>
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
