import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 6rem;
  height: 2rem;
  margin: 1rem;
  background-color: #564466;
  color: #fff;
  border-width: 0px;
  border-radius: 5px;
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
`;

export const SignOutButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <StyledInnerContainer>Sign out</StyledInnerContainer>
    </StyledButton>
  );
};
