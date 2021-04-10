import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${(props) => props.width}rem;
  height: 3rem;
  margin: 0.5rem;
  background-color: ${(props) =>
    props.primary && (props.disabled ? "#b4a6bf" : "#564466")};
  background-color: ${(props) =>
    props.secondary && (props.disabled ? "#BEA69F" : "#A07163")};
  background-color: ${(props) =>
    props.remove && (props.disabled ? "#dba7a7" : "#ff3b3b")};
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
    background-color: ${(props) => !props.disabled && props.primary && "#9f89b3"};
    background-color: ${(props) => !props.disabled && props.secondary && "#9f89b3"};
    background-color: ${(props) => !props.disabled && props.remove && "#fc9595"};
  }
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = ({
  onClick,
  text,
  disabled,
  width,
  primary,
  secondary,
  remove
}) => {
  return (
    <StyledButton
      onClick={onClick}
      primary={primary}
      secondary={secondary}
      remove={remove}
      disabled={disabled}
      width={width || 5}
    >
      <StyledInnerContainer>{text}</StyledInnerContainer>
    </StyledButton>
  );
};
