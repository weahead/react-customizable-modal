# react-customizable-modal

A fully customizable and accessable react modal with hook primitives.

<!-- ## Build status -->

## Motivation

There are several modal implementations in react, but none of them offered the flexibility to have total control of the components being rendered so that you could use whichever animation library you want.

<!-- ## Screenshots -->

## Features

- Easy out of the box Modal component.
- Exposes the underlying hooks to make it possible to compose them as you see fit.

## Demos

- [Default builtin Modal](https://codesandbox.io/s/currying-moon-2251f)
- [Animated modal with react-spring](https://codesandbox.io/s/solitary-pond-b5kw3)
- [Swipe up from below ](https://codesandbox.io/s/bold-murdock-86ysz)

## Code Examples

### Basic Modal

```jsx
import { Modal } from '@weahead/react-customizable-modal'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open modal
      </button>
      <Modal
        isOpen={isOpen}
        onEscape={() => {
          setIsOpen(false)
        }}
        onOverlayClick={() => {
          setIsOpen(false)
        }}
      >
        <button
          onClick={() => {
            setIsOpen(false)
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}
```

### Custom Modal with custom overlay

`CustomModal.jsx`

```jsx
import React from 'react'
import {
  useTrapFocus,
  useBodyScrollLock,
  useCloseOnEsc,
  ModalPortal,
} from 'react-customizable-modal'

function Overlay({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {children}
    </div>
  )
}

function ModalWrapper({ children }) {
  useBodyScrollLock()
  useCloseOnEsc(onClose)
  return <>{children}</>
}

export default function CustomModal({ isOpen, onClose, children }) {
  const modalRef = useTrapFocus()
  return (
    isOpen && (
      <ModalPortal id={`customModal`}>
        <ModalWrapper>
          <Overlay>
            <div
              ref={modalRef}
              style={{
                width: 500,
                height: 400,
                backgroundColor: '#fff',
                padding: 20,
                position: 'absolute',
              }}
            >
              <button onClick={onClose}>Close modal</button>
              {children}
            </div>
          </Overlay>
        </ModalWrapper>
      </ModalPortal>
    )
  )
}
```

`App.jsx`

```jsx
import CustomModal from 'CustomModal.jsx'
function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open modal
      </button>

      <CustomModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        This is a custom modal
      </CustomModal>
    </div>
  )
}
```

## Installation

```
npm i @weahead/react-customizable-modal

OR

yarn add @weahead/react-customizable-modal
```

## API Reference

### Components

#### ModalPortal

a simple wrapper around `React.createPortal` function, but it also removes the div from the DOM on unmount

##### Props

| Prop     | Required | Description                                                                                                                                                    |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id       | yes      | this will give the DOMnode that is created to hold the modal content an `id` if there already is a DOMnode with that `id` it will reuse that for the new modal |
| children | yes      | This is the content of the portal, usually the entire modal, including the overlay                                                                             |

#### Modal

A basic Modal component ready for use, if you dont want to implement your own. it uses only the hooks and components from this package

##### Props

| Prop                        | Required | Description                                                                                                                                                           |
| --------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                          | no       | this will give the DOMnode that is created to hold the modal content an `id` if there already is a DOMnode with that `id` it will reuse that for the new modal        |
| isOpen                      | yes      | this will be used to create the portal for the modal and mount the modal                                                                                              |
| role                        | no       | for a11y purposes we can set the role for our modal, it defaults to `dialog`                                                                                          |
| ariaHideApp                 | no       | sets a aria hide on the div with id of 'root'                                                                                                                         |
| shouldFocusAfterRender      | no       | defaults to `true` and sets the focus on the modal div                                                                                                                |
| onOverlayClick              | no       | lets you pass in a function that is triggered when clicking on the overlay, you might want to pass a function that sets the isOpen prop to false IE closing the modal |
| shouldReturnFocusAfterClose | no       | defaults to `true`, will return focus to last focus element before the modal was opened                                                                               |
| onEscape                    | no       | lets you pass a function to that is triggered if you press the `ESC` key while the modal is active, often you want to close the modal                                 |
| children                    | yes      | the content of the modal                                                                                                                                              |

### Hooks

#### useTrapFocus

`import {useTrapFocus} from '@weahead/react-customizable-modal'`

used to trap focus inside of the modal component

```jsx
const modalRef = useTrapFocus(options)
// returns a ref that needs to be given to the element that you want to trap focus within
;<div ref={modalRef}>focus will be trapped in this div</div>
```

| option        | required | description                                                                                                   |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| focusOnRender | no       | defaults to `true`, will focus the modal container                                                            |
| returnFocus   | no       | defaults to `true`, will return focus to last focused element when the component that uses this hook unmounts |

#### useAriaHide

`import {useAriaHide} from '@weahead/react-customizable-modal'`

sets the `aria-hidden` attribute on the element with the id passed in and removes it when the component that uses this hook is unmounted

```jsx
useAriaHide(id) //often `id` would be 'root'
```

| argument | required | description                                              |
| -------- | -------- | -------------------------------------------------------- |
| id       | yes      | add the `aria-hide` attribute to the element with the id |

#### useBodyScrollLock

`import {useBodyScrollLock} from '@weahead/react-customizable-modal'`

this is taken from [usehooks](https://usehooks.com/useLockBodyScroll/) all credit goes to them.
it locks the body from scrolling while the component that uses this hook is rendered.

```jsx
useBodyScrollLock()
```

#### useHandleKeyPress

`import {useHandleKeyPress} from '@weahead/react-customizable-modal'`

this hook is used by the `useCloseOnEsc` hook and other internal components
it lets you provide a function that is executed on every keypress while the component that uses this hook is mounted

```jsx
useHandleKeyPress((e) => {
  console.log(e.key)
})
```

| argument | required | description                     |
| -------- | -------- | ------------------------------- |
| callback | yes      | gets called with every keypress |

#### useCloseOnEsc

`import {useCloseOnEsc} from '@weahead/react-customizable-modal'`

this hook is used by the `useHandleKeyPress` hook but only triggers the callback if the escape key is pressed

```jsx
useCloseOnEsc(() => {
  console.log('ESC key was pressed')
})
```

| argument | required | description                        |
| -------- | -------- | ---------------------------------- |
| callback | yes      | gets called when escape is pressed |

#### useOnClickOutside

`import {useOnClickOutside} from '@weahead/react-customizable-modal'`

this hook is used by the `useOnClickOutside` hook but only triggers the callback if the escape key is pressed

```jsx
useOnClickOutside(ref, () => {
  console.log('you pressed outside of the desired element')
})
```

| argument | required | description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| ref      | yes      | the refrence to the element that when a click outside of that element is triggered, the callback will fire |
| callback | yes      | the callback to be triggered, when a click event outside of the referenced element happens                 |

<!-- ## Tests -->

<!-- ## How to use? -->

<!-- ## Contribute -->

<!-- ## Credits -->

https://github.com/reactjs/react-modal
https://github.com/davidtheclark/tabbable/blob/master/index.js
https://github.com/davidtheclark/focus-trap#focustrap--createfocustrapelement-createoptions

<!-- ## License -->
