import React from "react";

export const Modal = ({ display, content, title, onClose }) => {
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
        <div>{content}</div>
      </div>
    </div>
  );
};
