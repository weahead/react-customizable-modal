import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useTrapFocus } from "react-customizable-modal";
import Modal from "./components/modal";
import AnimatedModal from "./components/animatedModal";
import WobblyModal from "./components/wobblyModal";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Open modal
        </button>
        <button
          onClick={() => {
            setIsOpen2(true);
          }}
        >
          Open Animated modal
        </button>
        <button
          onClick={() => {
            setIsOpen3(true);
          }}
        >
          Open wobbly modal
        </button>
        {isOpen && (
          <Modal
            onClose={() => {
              setIsOpen(false);
            }}
          ></Modal>
        )}
        {isOpen2 && (
          <AnimatedModal
            onClose={() => {
              setIsOpen2(false);
            }}
          ></AnimatedModal>
        )}
        {isOpen3 && (
          <WobblyModal
            onClose={() => {
              setIsOpen3(false);
            }}
          ></WobblyModal>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </header>
    </div>
  );
}

export default App;
