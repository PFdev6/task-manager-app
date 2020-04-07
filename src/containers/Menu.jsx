import * as React from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

const Menu = () => {
  return (
    <SideNav onSelect={selected => {}}>
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="">
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
            <i className="fa fa-fw fa-device" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to="/groups"> Group </Link>
          </NavText>
        </NavItem>
        <NavItem eventKey="users">
          <NavIcon>
            <i className="fa fa-fw fa-device" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <Link to="/users"> User </Link>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Menu;
