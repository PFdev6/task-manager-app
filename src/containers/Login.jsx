import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ErrorMessage from "../components/ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateLoginForm } from "../utils/Helpers";
import { Header } from "../components/Styles";

const Login = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  const authHandler = () => {
    setLoading(true);
    apiRequest("/api/login", "post", {
      email: userEmail,
      password: userPassword
    })
      .then(userData => {
        const { id, email, token, username, group_id } = userData;
        if (token) {
          auth.setAuthStatus({ id, email, token, username, group_id });
        }
        if (userData.messages) {
          showError(userData.messages.join(", "));
        }
        setLoading(false);
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
        if (validateLoginForm(userEmail, userPassword, showError)) {
          authHandler();
        }
      }}
    >
      <Header>Sign in</Header>
      <br />
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={userEmail}
          placeholder="john@mail.com"
          onChange={e => setUserEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          value={userPassword}
          placeholder="Password"
          onChange={e => setUserPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Sign In"}
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
};

export default Login;
