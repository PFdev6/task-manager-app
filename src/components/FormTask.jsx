import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateNewTaskForm } from "../utils/Helpers";
import { Header } from "../components/Styles";
import NewTask from "./NewTask";

const FormTask = () => {
  const [subTasks, setSubTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const params = {};
        Array.from(e.target.elements).forEach(el => {
          params[el.name] = el.value;
        });

        if (validateNewTaskForm()) {
          setLoading(true);
        }
      }}
    >
      <Header> Create Task </Header>
      <br />
      <NewTask id="main" />
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
