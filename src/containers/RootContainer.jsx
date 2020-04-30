import * as React from "react";
import { authContext } from "../contexts/AuthContext";
import { Wrapper } from "../components/Styles";
import Entry from "./Entry";
import Main from "./Main";
import { DEFAULT_USER_AUTH } from "../utils/Consts";
import useSocket from "../utils/custom-hooks/SocketHandler";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

const RootContainer = () => {
  const url = "localhost:8000";
  const { auth } = React.useContext(authContext);
  const { note, isConnected } =
    auth.id !== DEFAULT_USER_AUTH.id
      ? useSocket(url, auth.id)
      : { note: {}, isConnected: false };

  React.useEffect(() => {
    store.addNotification({
      title: "Task Update",
      message: note.message || "test",
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  });

  return (
    <Wrapper>
      <ReactNotification />
      {auth.id === DEFAULT_USER_AUTH.id ? <Entry /> : <Main />}
    </Wrapper>
  );
};

export default RootContainer;
