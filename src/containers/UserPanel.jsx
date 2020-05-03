import * as React from "react";
import {
  Row,
  Col,
  Container,
  Label,
  Badge,
  Button,
  Card,
  CardTitle,
  Input,
  CardBody,
  CardHeader,
  CardText,
  Jumbotron
} from "reactstrap";
import ErrorMessage from "../components/ErrorMessage";
import useErrorHandler from "../utils/custom-hooks/ErrorHandler";
import { authContext } from "../contexts/AuthContext";
import { apiRequest, validateNewTaskForm } from "../utils/Helpers";
import { Header } from "../components/Styles";

const UserPanel = () => {
  const { auth, setAuthStatus } = React.useContext(authContext);
  const [notifications, setNotification] = React.useState([]);
  const { error, showError } = useErrorHandler(null);

  const deleteGroup = e => {
    let group_id = e.target.name;
    apiRequest(
      `/api/groups/${group_id}/delete`,
      "delete",
      null,
      auth.token
    ).then(() => {
      let newAuth = auth;
      newAuth.group_id = null;
      setAuthStatus(newAuth);
    });
  };

  const deleteGroupButton = auth.isAdminGroup ? (
    <Row>
      <Col>
        <Button
          style={{ margin: 10 }}
          name={auth.group_id}
          onClick={deleteGroup}
        >
          Delete Group
        </Button>
      </Col>
      <Col>
        <h3>
          You are admin in group ->
          <Badge color="secondary">{auth.group_id}</Badge>
        </h3>
      </Col>
    </Row>
  ) : (
    <Row>
      <Col>
        <h3>
          {auth.group_id ? (
            <div>
              You are member of group ->
              <Badge color="secondary">{auth.group_id}</Badge>
            </div>
          ) : (
            "You're not a member of the group"
          )}
        </h3>
      </Col>
    </Row>
  );

  const confirmInvite = e => {
    let token = e.target.value;
    let id = e.target.name;
    apiRequest(
      "/api/groups/confirmInvite",
      "post",
      { token: token, id: id },
      auth.token
    ).then(data => {
      if (data.message) {
        showError(data.message);
      } else {
        let newNotes = notifications.filter(note => note.id !== Number(id));
        showError("Confirmed");
        let newAuth = auth;
        newAuth.group_id = data;
        setNotification(newNotes);
        setAuthStatus(newAuth);
      }
    });
  };

  const toCompact = notifArray => {
    let result = [];
    for (let i = 0; i < notifArray.length; i += 3) {
      let chunk = notifArray.slice(i, i + 3);
      result.push(chunk);
    }
    return result;
  };

  const getNotifications = async () => {
    let response = await apiRequest(
      `/api/user/${auth.id}/notifications`,
      "get",
      null,
      auth.token
    );
    setNotification(response);
  };

  React.useEffect(() => {
    getNotifications();
  }, []);

  return (
    <Container>
      {deleteGroupButton}
      {error && <ErrorMessage errorMessage={error} />}
      <Header> Your Notifications </Header>
      {toCompact(notifications).map((noteTriad, ind) => {
        return (
          <Row key={ind}>
            {noteTriad.map((note, ind) => {
              return (
                <Col key={ind}>
                  <Card style={{ margin: 5 }}>
                    <CardBody>
                      <CardHeader>
                        {note.type.split("_").join(" ")} note
                      </CardHeader>
                      <CardText>
                        {note.type !== "invite" ? note.message : "Invitaion"}
                      </CardText>
                      <CardBody>
                        {note.type === "invite"
                          ? "Invitation will be deleted after confirmation"
                          : null}
                      </CardBody>
                      {note.type === "invite" ? (
                        <Button
                          style={{ margin: 5 }}
                          value={note.message}
                          name={note.id}
                          onClick={confirmInvite}
                        >
                          Confirm
                        </Button>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
      {notifications.length === 0 ? (
        <Jumbotron>
          <h1 className="display-3"> Empty </h1>
        </Jumbotron>
      ) : null}
    </Container>
  );
};

export default UserPanel;
