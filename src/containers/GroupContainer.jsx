import * as React from "react";
import { Label, Button, Card, CardTitle, Input, CardText } from "reactstrap";
import ErrorMessage from "../components/ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateNewTaskForm } from "../utils/Helpers";
import { Header } from "../components/Styles";

const GroupContainer = () => {
  const { auth } = React.useContext(authContext);
  const [users, setUsers] = React.useState([]);
  const [invitedUser, setInvitedUser] = React.useState("");

  const toCompact = listUsers => {
    let result = [];
    for (let i = 0; i < listUsers.length; i += 3) {
      let chunk = listUsers.slice(i, i + 3);
      result.push(chunk);
    }
    return result;
  };

  const getUsers = async () => {
    let response = await apiRequest(
      `/api/groups/${auth.group_id}/users`,
      "get",
      null,
      auth.token
    );
    setLoading(false);
    setUsers(response);
  };

  const kickUser = e => {
    let user_id = e.target.name;
    apiRequest(
      `/api/groups/${auth.group_id}/users/${user_id}/kick`,
      "delete",
      null,
      auth.token
    );
  };

  const inviteUser = () => {
    apiRequest(
      `/api/groups/${auth.group_id}/users/inviteUser`,
      "post",
      { email: invitedUser },
      auth.token
    );
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Label>Invite</Label>
          <Input
            required={true}
            type="email"
            placeholder="User Email"
            value={invitedUser}
            onChange={e => setInvitedUser(e.target.value)}
            name="email"
          />
        </Col>
        <Button onClick={inviteUser} block={true}>
          {" "}
          Invite{" "}
        </Button>
      </Row>
      {toCompact(users).map((usersChunk, key) => {
        return (
          <Row key={key}>
            {usersChunk.map(user => {
              return (
                <Col key={user.id}>
                  <Card body>
                    <CardTitle>{user.username}</CardTitle>
                    <CardText> {user.email}</CardText>
                    {user.id !== auth.id ? (
                      <Button onClick={kickUser} name={user.id}>
                        {" "}
                        Kick{" "}
                      </Button>
                    ) : null}
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Container>
  );
};

export default GroupContainer;
