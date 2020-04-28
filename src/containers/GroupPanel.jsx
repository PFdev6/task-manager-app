import * as React from "react";
import FormGroup from "../components/FormGroup";
import { authContext } from "../contexts/AuthContext";
import GroupContainer from "./GroupContainer";

const GroupPanel = () => {
  const auth = React.useContext(authContext).auth;
  return auth.group_id ? <GroupContainer /> : <FormGroup />;
};

export default GroupPanel;
