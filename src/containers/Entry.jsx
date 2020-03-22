import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
/** Context */
// import { authContext } from "../contexts/AuthContext";
/** Presentation */
import { Wrapper } from "../components/Styles";

import Login from "./Login";
import SignUp from "./SignUp";

const Entry = props => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  //const { auth } = React.useContext(authContext);
  return (
    <Wrapper>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Sign Up
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col lg="12">
              <Login />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col lg="12">
              <SignUp />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </Wrapper>
  );
};

export default Entry;
