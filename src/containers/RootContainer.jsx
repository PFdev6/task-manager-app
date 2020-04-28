import * as React from "react";
import { authContext } from "../contexts/AuthContext";
import { Wrapper } from "../components/Styles";
import Entry from "./Entry";
import Main from "./Main";
import { DEFAULT_USER_AUTH } from "../utils/Consts";
import useSocket from "../utils/custom-hooks/SocketHandler";

const RootContainer = () => {
  const url = "localhost:8000";
  const { auth } = React.useContext(authContext);
  const { note, isConnected } =
    auth.id !== DEFAULT_USER_AUTH.id
      ? useSocket(url, auth.id)
      : { note: {}, isConnected: false };

  return (
    <Wrapper>{auth.id === DEFAULT_USER_AUTH.id ? <Entry /> : <Main />}</Wrapper>
  );
};

export default RootContainer;
