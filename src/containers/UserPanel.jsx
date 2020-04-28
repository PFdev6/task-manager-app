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
  CardText
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

  const deleteGroupButton = auth.group_id ? (
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
    </Row>
  ) : null;

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
      <Header> Your Notifications </Header>
      {toCompact(notifications).map(note => {
        return node.id;
      })}
    </Container>
  );
};

export default UserPanel;
