import React, { useState } from 'react'
import { Modal } from '../../.'

function StandardModal() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Modal
        id="standard"
        isOpen={isOpen}
        onEscape={() => {
          setIsOpen(false)
        }}
        onOverlayClick={() => {
          setIsOpen(false)
        }}
      >
        <p>Modal content goes here</p>
      </Modal>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open modal
      </button>
    </>
  )
}

export default StandardModal
