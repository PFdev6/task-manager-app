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

  const getUserTasks = async find => {
    setLoading(true);
    let response = await apiRequest(
      `/api/tasks?${find.by}=${find.id}`,
      "get",
      null,
      auth.token
    );
    setLoading(false);
    let result = [];
    for (let i = 0; i < response.length; i += 3) {
      let chunk = response.slice(i, i + 3);
      result.push(chunk);
    }
    setTasks({ type: "add", newTasks: result });
  };

  React.useEffect(() => {
    getUserTasks({ by: "user_id", id: auth.id });
  }, []);

  return (
    <Container>
      {tasks.map((taskChunk, key) => {
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
