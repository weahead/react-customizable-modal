import { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useTrapFocus, useBodyScrollLock, useCloseOnEsc } from '../../.'

const overlayStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const modalStyle = {
  width: 500,
  height: 400,
  backgroundColor: '#fff',
  padding: 20,
  position: 'absolute',
}

function AnimatedModal() {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }
  useCloseOnEsc(onClose)

  const modalRef = useTrapFocus<HTMLDivElement>()

  const overlayProps = useSpring({
    backgroundColor: isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
  })

  const modalProps = useSpring({
    transform: isOpen ? 'scale(1)' : 'scale(0)',
    config: { mass: 1, tension: 280, friction: 25 },
  })

  return (
    <>
      <animated.div
        style={{
          ...overlayProps,
          ...overlayStyle,
        }}
      >
        <animated.div
          ref={modalRef}
          style={{
            ...modalProps,
            ...modalStyle,
          }}
        >
          <button onClick={onClose}>close modal</button>
        </animated.div>

        <button onClick={() => setIsOpen(true)}>Open modal</button>
      </animated.div>
    </>
  )
}

export default AnimatedModal
