import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const StyledSelect = styled.select`
  border-radius: 5px;
  height: 2rem;
  width: 22rem;
  margin: 1rem;
  border-width: 1px;
  border-color: #92b39e;
  color: #000;
  background-color: #fff;
`;

const StyledDatePickerContainer = styled.div`
  input {
    border-radius: 5px;
    height: 2rem;
    width: 20rem;
    margin: 1rem;
    padding: 1rem;
    border-width: 1px;
    border-color: #92b39e;
  }
`;

export const AddGroceryModal = ({ display, addFunction, title, onClose }) => {
  const [addModalNameText, setAddModalNameText] = useState("");
  const [addModalFullAmountText, setAddModalFullAmountText] = useState("");
  const [addModalAmountTypetText, setAddModalAmountTypeText] = useState("");
  const [bestBeforeDate, setBestBeforeDate] = useState(new Date());

  const DATE_FORMAT = "yyyy/MM/dd";

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        display: display ? "flex" : "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          zIndex: 1,
          display: display ? "" : "none",
        }}
        onClick={() => onClose()}
      ></div>
      <div
        style={{
          backgroundColor: "#ffffff",
          height: "70vh",
          width: "50vw",
          borderRadius: 5,
          position: "absolute",
          zIndex: 2,
          display: display ? "" : "none",
          overflow: "auto",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            position: "absolute",
            top: 15,
            right: 15,
            margin: 0,
            zIndex: 2,
            fontSize: 22,
            cursor: "pointer",
          }}
          onClick={() => onClose()}
        >
          X
        </p>
        <h2 style={{ margin: 20 }}>{title}</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h4 style={{ margin: "10px 0px 0px 20px" }}>Name</h4>
          <Input
            style={{}}
            name="addNewGroceryNameInput"
            onChange={(event) => setAddModalNameText(event.target.value)}
          />
          <h4 style={{ margin: "10px 0px 0px 20px" }}>Amount type</h4>
          <StyledSelect
            value={addModalAmountTypetText}
            onChange={(event) => setAddModalAmountTypeText(event.target.value)}
          >
            <option>Volume</option>
            <option>Weight</option>
          </StyledSelect>
          <h4 style={{ margin: "10px 0px 0px 20px" }}>Full amount</h4>
          <Input
            name="addNewGroceryNameInput"
            onChange={(event) => setAddModalFullAmountText(event.target.value)}
          />
          <h4 style={{ margin: "10px 0px 0px 20px" }}>BestBefore</h4>
          <StyledDatePickerContainer>
            <DatePicker
              selected={bestBeforeDate}
              onChange={(date) => setBestBeforeDate(date)}
              dateFormat={DATE_FORMAT}
            />
          </StyledDatePickerContainer>
          <Button
            onClick={() =>
              addFunction(
                addModalNameText,
                addModalFullAmountText,
                addModalAmountTypetText,
                bestBeforeDate
              )
            }
            text="Add"
            primary
            disabled={addModalNameText === ""}
          />
        </div>
      </div>
    </div>
  );
};
