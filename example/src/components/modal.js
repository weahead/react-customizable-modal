import React from "react";
import { useTrapFocus } from "react-customizable-modal";

export default function Modal({ onClose }) {
  const trapRef = useTrapFocus();
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#000000"
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
    </div>
  );
}
