import * as React from "react";
import { authContext } from "../contexts/AuthContext";
import { Wrapper } from "../components/Styles";
import Entry from "./Entry";
import Main from "./Main";
import { DEFAULT_USER_AUTH } from "../utils/Consts";

const RootContainer = () => {
  const { auth } = React.useContext(authContext);

  return (
    <Wrapper>{auth.id == DEFAULT_USER_AUTH.id ? <Entry /> : <Main />}</Wrapper>
  );
};

export default RootContainer;
