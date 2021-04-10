import React, { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
          height: "60vh",
          width: "40vw",
          borderRadius: 5,
          position: "absolute",
          zIndex: 2,
          display: display ? "" : "none",
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
          <h4 style={{ margin: "50px 0px 0px 20px" }}>Name</h4>
          <Input
            name="addNewGroceryNameInput"
            onChange={(event) => setAddModalNameText(event.target.value)}
          />
          <select>
            <option>Volume</option>
            <option>Weight</option>
          </select>
          <h4 style={{ margin: "50px 0px 0px 20px" }}>Full amount</h4>
          <Input
            name="addNewGroceryNameInput"
            onChange={(event) => setAddModalFullAmountText(event.target.value)}
          />

          <h4 style={{ margin: "15px 0px 0px 20px" }}>BestBefore</h4>
          <DatePicker
            selected={bestBeforeDate}
            onChange={(date) => setBestBeforeDate(date)}
            dateFormat={DATE_FORMAT}
          />
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
