import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 10px;
  color: #ff0000;
`;

const ErrorMessageContainer = ({ errorMessage }) => {
  return React.createElement(ErrorMessage, null, errorMessage);
};

export default ErrorMessageContainer;
