import * as React from "react";
import {
  Row,
  Col,
  Container,
  Label,
  Button,
  Card,
  CardTitle,
  Input,
  CardText,
  Badge
} from "reactstrap";
import ErrorMessage from "../components/ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateNewTaskForm } from "../utils/Helpers";

const GroupContainer = () => {
  const { auth } = React.useContext(authContext);
  const [users, setUsers] = React.useState([]);
  const [invitedUser, setInvitedUser] = React.useState("");
  const { error, showError } = useErrorHandler(null);

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
    setUsers(response);
  };

  const kickUser = e => {
    let user_id = e.target.name;
    apiRequest(
      `/api/groups/${auth.group_id}/users/${user_id}/kick`,
      "delete",
      null,
      auth.token
    ).then(() => {
      let newUsers = users.filter(user => user.id !== Number(user_id));
      setUsers(newUsers);
    });
  };

  const inviteUser = () => {
    if (invitedUser.replace(/\s/g, "") === "") {
      return showError("Empty text");
    }

    apiRequest(
      `/api/groups/${auth.group_id}/users/invite`,
      "post",
      { email: invitedUser },
      auth.token
    ).then(data => {
      if (data.notification) {
        showError("User was invited");
      }
      if (data.message) {
        showError(data.message);
      }
    });
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
      </Row>
      <Row>
        <Col>{error && <ErrorMessage errorMessage={error} />} </Col>
      </Row>
      <Row>
        <Col>
          <Button style={{ margin: 10 }} onClick={inviteUser} block={true}>
            Invite
          </Button>
        </Col>
      </Row>
      <Row>
      <Label>
        Users

        <Badge style={{ margin: 10 }} color="secondary">
          In Group {auth.groupName}
        </Badge>
      </Label>
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
                    {auth.isAdminGroup && auth.id !== user.id ? (
                      <Button onClick={kickUser} name={user.id}>
                        Kick
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
