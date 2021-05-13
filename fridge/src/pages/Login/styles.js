import styled, { keyframes } from "styled-components";

export const StyledLoginMainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  background-color: #92b39e;

  .loader {
    display: flex;
    justify-content: center;
  }

  .loader::after {
    content: "";
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-top-color: #564466;
    border-radius: 100%;
    animation: loader 1.5s ease infinite;
  }

  @keyframes loader {
    to {
      transform: rotate(2turn);
    }
  }
`;

export const StyledLoginHeaderText = styled.h1`
  margin-bottom: 5rem;
`;

export const StyledErrorDiv = styled.div`
  background-color: #ff3b3b;
  border-radius: 5px;
  padding: 8px;
  color: #fff;
`;
