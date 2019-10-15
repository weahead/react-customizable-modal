import React from "react";
import ReactDOM from "react-dom";
import { useTrapFocus } from "react-customizable-modal";

export default function Modal({ onClose }) {
  const domNode = document.getElementById("modal-root");
  const trapRef = useTrapFocus();
  return ReactDOM.createPortal(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.6)"
      }}
    >
      <div
        style={{
          width: 500,
          height: 400,
          backgroundColor: "#fff",
          padding: 20,
          position: "absolute"
        }}
        ref={trapRef}
      >
        <h1>Example modal</h1>
        <input></input>
        <input></input>
        <input></input>
        <button onClick={onClose}>Close modal</button>
      </div>
    </div>,
    domNode
  );
}
