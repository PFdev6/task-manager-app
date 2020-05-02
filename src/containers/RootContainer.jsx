import * as React from "react";
import { authContext } from "../contexts/AuthContext";
import { Wrapper } from "../components/Styles";
import Entry from "./Entry";
import Main from "./Main";
import { DEFAULT_USER_AUTH } from "../utils/Consts";
import useSocket from "../utils/custom-hooks/SocketHandler";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";

const RootContainer = () => {
  const url = "localhost:8000";
  const { auth } = React.useContext(authContext);
  const { note, isConnected, client } = useSocket(url, auth.id);

  React.useEffect(() => {
    if (auth.id === DEFAULT_USER_AUTH.id) {
      client.disconnect();
    }
    if (note !== null) {
      let noteMessage =
        note.type === "invite"
          ? "You've invitation to group. Check notifications in User Panel"
          : note.message;
      store.addNotification({
        title: "Updatting",
        message: noteMessage,
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
    }
  });

  return (
    <Wrapper>
      <ReactNotification />
      {auth.id === DEFAULT_USER_AUTH.id ? <Entry /> : <Main />}
    </Wrapper>
  );
};

export default RootContainer;
