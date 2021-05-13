import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 15rem;
  height: 3rem;
  margin: 1rem;
  background-color: #564466;
  color: #fff;
  border-width: 0px;
  border-radius: 5px;
  box-shadow: 5px 2px 20px 0px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: #9f89b3;
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .sigInloader {
    display: flex;
    justify-content: center;
  }

  .sigInloader::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 4px solid transparent;
    border-top-color: #fff;
    border-radius: 100%;
    animation: loader 1.5s ease infinite;
  }

  @keyframes sigInloader {
    to {
      transform: rotate(2turn);
    }
  }
`;

export const SignInButton = ({ onClick, loading }) => {
  return (
    <StyledButton onClick={onClick} title="Login">
      <StyledInnerContainer>
        {loading ? <div className="sigInloader"></div> : "Login"}
      </StyledInnerContainer>
    </StyledButton>
  );
};
