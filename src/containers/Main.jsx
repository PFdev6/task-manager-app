import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TaskPanel from "./TaskPanel";
import GroupPanel from "./GroupPanel";
import UserPanel from "./UserPanel";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { authContext } from "../contexts/AuthContext";

const Main = () => {
  const { auth, setUnauthStatus } = React.useContext(authContext);
  const style = {
    overflowY: "scroll",
    border: "2px solid red",
    padding: "30px",
    height: "900px",
    borderRadius: "15px"
  };

  return (
    <div style={style}>
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
                <i className="fa fa-fw fa-at" style={{ fontSize: "0.75em" }} />
              </NavIcon>
              <NavText style={{ fontSize: "0.75em" }}>
                Hello, {auth.username} | {auth.email}
              </NavText>
            </NavItem>
            <NavItem eventKey="tasks">
              <NavIcon>
                <Link to="/">
                  <i
                    className="fa fa-fw fa-home"
                    style={{ fontSize: "1.75em" }}
                  />
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/"> Tasks </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="groups">
              <NavIcon>
                <Link to="/groups">
                  <i
                    className="fa fa-fw fa-object-group"
                    style={{ fontSize: "1.75em" }}
                  />
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/groups"> Group </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="users">
              <NavIcon>
                <Link to="/users">
                  <i
                    className="fa fa-fw fa-users"
                    style={{ fontSize: "1.75em" }}
                  />
                </Link>
              </NavIcon>
              <NavText>
                <Link to="/users"> User </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="logout">
              <NavIcon>
                <i
                  className="fa fa-fw fa-sign-out"
                  style={{ fontSize: "1.75em" }}
                />
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
    </div>
  );
};

export default Main;
