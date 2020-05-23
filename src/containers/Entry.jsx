import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Container,
} from "reactstrap";
import classnames from "classnames";
import { Wrapper } from "../components/Styles";

import Login from "./Login";
import SignUp from "./SignUp";

const Entry = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Wrapper>
      <Container className="themed-container">
        <Row>
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
        </Row>
        <br />
        <Row>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col>
                  <Login />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col>
                  <SignUp />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Entry;
