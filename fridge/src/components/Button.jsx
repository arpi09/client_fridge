import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 8rem;
  height: 3rem;
  margin: 0.5rem;
  background-color: ${(props) =>
    props.primary && (props.disabled ? "#b4a6bf" : "#564466")};
  background-color: ${(props) =>
    props.secondary && (props.disabled ? "#BEA69F" : "#A07163")};
  background-color: ${(props) =>
    props.delete && (props.disabled ? "#e09b96" : "#e84c41")};
  color: #fff;
  border-width: 0px;
  border-radius: 5px;
  box-shadow: ${(props) =>
    !props.disabled && "5px 2px 20px 0px rgba(0, 0, 0, 0.2)"};
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => !props.disabled && "pointer"};
  transition: 0.4s;

  &:hover {
    background-color: "#564466";
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = ({ onClick, text, disabled, primary, secondary }) => {
  return (
    <StyledButton
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      disabled={disabled}
    >
      <StyledInnerContainer>{text}</StyledInnerContainer>
    </StyledButton>
  );
};
