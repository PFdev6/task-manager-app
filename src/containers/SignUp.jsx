import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ErrorMessage from "../components/ErrorMessage";
import { Header } from "../components/Styles";
import { apiRequest, validateSingUpForm } from "../utils/Helpers";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";

const SignUp = (props) => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userConfirmPassword, setUserConfirmPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { error, showError } = useErrorHandler(null);

  const singUpHandler = async () => {
    try {
      setLoading(true);
      apiRequest("/api/singUp", "post", {
        email: userEmail,
        name: userName,
        password: userPassword,
      }).then((data) => {
        if (data.id) {
          showError("Confirm account via email");
        }
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      showError(err.message);
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          validateSingUpForm(
            userEmail,
            userName,
            userPassword,
            userConfirmPassword,
            showError
          )
        ) {
          singUpHandler();
        }
      }}
    >
      <Header>Sign Up</Header>
      <br />
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={userEmail}
          placeholder="john@mail.com"
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          name="userName"
          value={userName}
          placeholder="john"
          onChange={(e) => setUserName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          value={userPassword}
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="confirmPassword"
          value={userConfirmPassword}
          placeholder="Confirm Password"
          onChange={(e) => setUserConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" disabled={loading} block={true}>
        {loading ? "Loading..." : "Sign Up"}
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
};
export default SignUp;
