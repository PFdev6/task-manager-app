import * as React from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardFooter,
  CardBody,
  Toast,
  ToastBody,
  ToastHeader
} from "reactstrap";
import { apiRequest } from "../utils/Helpers";
import { authContext } from "../contexts/AuthContext";
import { taskContext } from "../contexts/TaskContext";

const Task = props => {
  const { auth } = React.useContext(authContext);
  const isOwner = true;
  const [data, setData] = React.useState(props.data);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const { tasks, setTasks } = React.useContext(taskContext);
  const isFinished = end_date => {
    return new Date(end_date) <= new Date();
  };

  const taskDone = e => {
    apiRequest(
      `/api/tasks/done`,
      "post",
      { taskId: e.target.value },
      auth.token
    ).then(dataRes => {
      toggle();
      setTimeout(() => {
        setTasks({ type: "update", newTask: dataRes });
      }, 1000);
    });
  };
  const deleteTask = e => {
    const taskId = e.target.value;
    apiRequest(
      `/api/tasks/delete`,
      "delete",
      { taskId: taskId },
      auth.token
    ).then(dataRes => {
      setTasks({ type: "delete", taskId: taskId });
    });
  };

  return (
    <Card
      inverse={isFinished(data.end_date)}
      color={isFinished(data.end_date) ? "success" : null}
      style={{ margin: 5 }}
    >
      <CardBody>
        <CardHeader>{data.header}</CardHeader>
        <CardText>{data.content}</CardText>
        {isOwner ? (
          <Button style={{ margin: 5 }} value={data.id} onClick={deleteTask}>
            Delete
          </Button>
        ) : null}
        <Button style={{ margin: 5 }} onClick={toggle}>
          More...
        </Button>
      </CardBody>
      <CardFooter> End Date: {data.end_date}</CardFooter>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{data.header}</ModalHeader>
        <ModalBody>
          {data.subTasks.length === 0 ? (
            <div className="p-3 bg-primary my-2 rounded">
              <Toast>
                <ToastHeader>{data.header}</ToastHeader>
                <ToastBody>{data.content}</ToastBody>
              </Toast>
            </div>
          ) : null}
          {data.subTasks.map((subTask, key) => {
            return (
              <div key={key} className="p-3 bg-primary my-2 rounded">
                <Toast>
                  <ToastHeader>{subTask.header}</ToastHeader>
                  <ToastBody>{subTask.content}</ToastBody>
                  <Button
                    color="primary"
                    disabled={isFinished(subTask.end_date)}
                    value={subTask.id}
                    onClick={taskDone}
                  >
                    +
                  </Button>
                </Toast>
              </div>
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            disabled={isFinished(data.end_date)}
            value={data.id}
            onClick={taskDone}
          >
            Done
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default Task;
