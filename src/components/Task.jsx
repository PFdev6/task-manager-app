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
  ToastHeader,
  Badge
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
    return new Date(end_date) < new Date();
  };

  const taskDone = e => {
    let id = e.target.value;
    let type = e.target.name;

    apiRequest(`/api/tasks/done`, "post", { taskId: id }, auth.token).then(
      dataRes => {
        toggle();
        let newData = dataRes;
        if (type === "subTask") {
          let subtasks = data.subTasks.map(task => {
            if (task.id === Number(id)) {
              task.end_date = new Date();
            }
            return task;
          });
          newData = data;
          newData.subTasks = subtasks;
          setData(newData);
        }

        setTimeout(() => {
          setTasks({ type: "update", newTask: newData });
        }, 1000);
      }
    );
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
      <CardFooter>
        <Badge color="warning" style={{ margin: 3 }}>
          Expire In: {new Date(data.end_date).toLocaleString()}
        </Badge>
      </CardFooter>
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
                  <ToastHeader>
                    {subTask.header}
                    {isFinished(subTask.end_date) ? (
                      <Badge style={{ marginLeft: 5 }} color="success" pill>
                        Done
                      </Badge>
                    ) : null}
                  </ToastHeader>
                  <ToastBody>{subTask.content}</ToastBody>
                  <ToastBody>
                    <Button
                      size="sm"
                      outline
                      color="primary"
                      disabled={isFinished(subTask.end_date)}
                      value={subTask.id}
                      name="subTask"
                      onClick={taskDone}
                    >
                      SubDone
                    </Button>
                    <Badge color="warning" style={{ margin: 3 }}>
                      Expire In: {new Date(subTask.end_date).toLocaleString()}
                    </Badge>
                  </ToastBody>
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
