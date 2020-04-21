import * as React from "react";
import { Form, Button, FormGroup as FG, Label, Input } from "reactstrap";
import ErrorMessage from "./ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateGroupForm } from "../utils/Helpers";
import { Header } from "../components/Styles";

const FormGroup = () => {
  const { auth, setAuthStatus } = React.useContext(authContext);
  const [groupName, setGroupName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { error, showError } = useErrorHandler(null);
  const createGroupHandler = params => {
    setLoading(true);
    apiRequest(
      "/api/groups/create",
      "post",
      {
        params
      },
      auth.token
    )
      .then(data => {
        showError("The group was created successfully.");
        setTimeout(
          groupId => {
            let newAuth = auth;
            newAuth.group_id = groupId;
            setAuthStatus(newAuth);
          },
          2000,
          data.id
        );
      })
      .catch(err => {
        setLoading(false);
        showError(err.message);
      });
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        const params = { admin_id: auth.id };

        Array.from(e.target.elements).forEach(el => {
          const typeField = el.name;
          params[typeField] = el.value;
        });

        if (validateGroupForm()) {
          createGroupHandler(params);
        }
      }}
    >
      <Header> Add Group </Header>
      <br />
      <FG>
        <Label for="taskOwnerSelect">Task Owner</Label>
        <Input
          required={true}
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          name="name"
        />
      </FG>
      <Button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Create"}
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
};

export default FormGroup;
