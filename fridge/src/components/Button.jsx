import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 15rem;
  height: 3rem;
  margin: 1rem;
  background-color: #9f89b3;
  color: #fff;
  border-width: 0px;
  border-radius: 5px;
  box-shadow: 5px 2px 20px 0px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: #564466;
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = ({ onClick, text }) => {
  return (
    <StyledButton onClick={onClick}>
      <StyledInnerContainer>{text}</StyledInnerContainer>
    </StyledButton>
  );
};
