import * as React from "react";
import { authContext } from "../contexts/AuthContext";
import { Wrapper } from "../components/Styles";
import Entry from "./Entry";
import Main from "./Main";

const RootContainer = () => {
  const { auth } = React.useContext(authContext);

  return <Wrapper>{auth.id ? <Main /> : <Entry />}</Wrapper>;
};

export default RootContainer;
