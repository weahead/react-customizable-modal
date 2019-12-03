import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import AnimatedModal from "./components/animatedModal";
import WobblyModal from "./components/wobblyModal";
import { ModalPortal, Modal } from "@weahead/react-customizable-modal";

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
            isOpen={isOpen}
            onEscape={() => {
              setIsOpen(false);
            }}
            onOverlayClick={() => {
              setIsOpen(false);
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </button>
          </Modal>
        )}
        {isOpen2 && (
          <ModalPortal id={"modal-root"}>
            <AnimatedModal
              onClose={() => {
                setIsOpen2(false);
              }}
            ></AnimatedModal>
          </ModalPortal>
        )}
        {isOpen3 && (
          <ModalPortal id={"modal-root2"}>
            <WobblyModal
              onClose={() => {
                setIsOpen3(false);
              }}
            ></WobblyModal>
          </ModalPortal>
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
