import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TaskPanel from "./TaskPanel";
import GroupPanel from "./GroupPanel";
import UserPanel from "./UserPanel";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { authContext } from "../contexts/AuthContext";

const Main = () => {
  const { auth, setUnauthStatus } = React.useContext(authContext);

  return (
    <Router>
      <SideNav
        onSelect={selected => {
          if (selected === "logout") {
            setUnauthStatus();
          }
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="">
          <NavItem eventKey="userInfo">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "0.75em" }} />
            </NavIcon>

            <NavText style={{ fontSize: "1.0em" }}>
              Hello, {auth.username} | {auth.email}
            </NavText>
          </NavItem>
          <NavItem eventKey="tasks">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>
              <Link to="/"> Tasks </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="groups">
            <NavIcon>
              <i
                className="fa fa-fw fa-device"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>
              <Link to="/groups"> Group </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="users">
            <NavIcon>
              <i
                className="fa fa-fw fa-device"
                style={{ fontSize: "1.75em" }}
              />
            </NavIcon>
            <NavText>
              <Link to="/users"> User </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="logout">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText> Logout </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
      <Switch>
        <Route exact path="/" component={TaskPanel} />
        <Route exact path="/groups" component={GroupPanel} />
        <Route exact path="/users" component={UserPanel} />
      </Switch>
    </Router>
  );
};

export default Main;
