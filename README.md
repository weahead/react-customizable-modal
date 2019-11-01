# react-customizable-modal

A fully customizable and accessable react modal with hook primitives.

# WIP

Not ready

<!-- ## Build status -->

## Motivation

There are several modal implementations in react, but none of them offered the flexibility to have total controll of the components being rendered so that you could use what ever animation library we wanted.

<!-- ## Screenshots -->

## Features

- Easy out of the box Modal component with sane defaults.
- Exposes the underlying hooks to make it possible to compose them as you see fit.

## Code Examples

### Basic Modal

```
import {Modal} from '@weahead/react-customizable-modal'

function App(){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div>
            <button onClick={()=>{setIsOpen(true)}}>Open modal</button>
            <Modal onClose={()=>{setIsOpen(false)}} closeOnEsc domNodeId={`modal-root`}}>
                this is my modal
            </Modal>
        </div>
    )
}

```

### Custom Modal with custom overlay

```jsx
import {
  useTrapFocus,
  useAriaHide,
  ModalPortal
} from "@weahead/react-customizable-modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
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
        />
      )}
    </div>
  );
}

function Modal({ onClose }) {
  return (
    <ModalPortal>
      <div>
        This is my modal
        <button onClick={onClose}>Close</button>
      </div>
    </ModalPortal>
  );
}
```

<!-- ## Installation -->

<!-- ## API Reference -->

<!-- ## Tests -->

<!-- ## How to use? -->

<!-- ## Contribute -->

<!-- ## Credits -->

https://github.com/reactjs/react-modal
https://github.com/davidtheclark/tabbable/blob/master/index.js
https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions

<!-- ## License -->
