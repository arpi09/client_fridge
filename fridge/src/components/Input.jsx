import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 5px;
  height: 2rem;
  width: 20rem;
  margin: 1rem;
  padding: 1rem;
  border-width: 1px;
  border-color: #92b39e;
`;

export const Input = ({ type, name, value, placeholder, id, onChange }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
    />
  );
};
