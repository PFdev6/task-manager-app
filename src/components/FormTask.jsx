import * as React from "react";
import { Label, Button, Form, FormGroup, Input } from "reactstrap";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateNewTaskForm } from "../utils/Helpers";
import { Header } from "../components/Styles";
import NewTask from "./NewTask";

const FormTask = () => {
  const [subTasks, setSubTasks] = React.useState([]);
  const [taskOwner, setTaskOwner] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(authContext).auth;
  const { error, showError } = useErrorHandler(null);
  const formOptions = auth.group_id ? ["Own", "Group"] : ["Own"];
  const createTaskHandler = async params => {
    setLoading(true);
    let res = await apiRequest(
      "/api/tasks/create",
      "post",
      {
        params
      },
      auth.token
    )
    showError("The task was created successfully.");
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const files = params.files;
    files.append('id', res.id);
    const isFile = true;
    apiRequest(
      "/api/tasks/create/files",
      "post",
      files,
      auth.token,
      isFile
    ).then(res => {

    });
  };

  return (
    <Form
      id="taskForm"
      onSubmit={e => {
        e.preventDefault();
        const params = { tasks: [], files: new FormData };
        Array.from(e.target.elements).forEach(el => {
          const typeField = el.name.split("_")[0];
          if (typeField === "header") {
            params.tasks.push({});
          }
          if (typeField === "file") {
            params.files.append(el.name, el.files[0]);
          }
          params.tasks[params.tasks.length - 1][typeField] = el.value;
        });
        params.userId = auth.id;
        params.groupId = auth.group_id;
        if (validateNewTaskForm(params.tasks, showError)) {
          createTaskHandler(params);
        }
      }}
    >
      <Header> Create Task </Header>
      <br />
      <NewTask id="main" />
      <FormGroup>
        <Label for="taskOwnerSelect">Task Owner</Label>
        <Input
          required={true}
          id="taskOwnerSelect"
          type="select"
          placeholder="Task Owner"
          value={taskOwner}
          onChange={e => setTaskOwner(e.target.value)}
          name="taskOwner"
        >
          {formOptions.map((el, ind) => {
            return <option key={ind}> {el} </option>;
          })}
        </Input>
      </FormGroup>
      {subTasks.map(subTask => subTask)}
      <Button
        onClick={e => {
          setSubTasks([
            ...subTasks,
            <div
              style={{ display: "flex", margin: 10, padding: 10 }}
              key={subTasks.length}
            >
              <Header style={{ margin: 5 }}>
                {`Subtask ${subTasks.length + 1}`}
              </Header>
              <NewTask id={subTasks.length} typeTask="Subtask" />
            </div>
          ]);
        }}
        disabled={loading}
        block={true}
      >
        Add Subtask
      </Button>

      <Button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Create"}
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
};

export default FormTask;
