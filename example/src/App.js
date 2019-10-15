import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useTrapFocus } from "react-customizable-modal";
import Modal from "./components/modal";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open modal
        </button>
        {isOpen && (
          <Modal
            onClose={() => {
              setIsOpen(false);
            }}
          ></Modal>
        )}
      </header>
    </div>
  );
}

export default App;
