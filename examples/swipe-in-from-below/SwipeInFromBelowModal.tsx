import { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import { useTrapFocus, useBodyScrollLock, useCloseOnEsc } from '../../.'

const overlayStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const modalStyle = {
  position: 'absolute',
  right: 0,
  left: 0,
  height: '200px',
  textAlign: 'center',
  overflow: 'auto',
  borderRadius: '30px 30px 0 0',
  backgroundColor: '#f5f5f5',

  // just visual when modal is bouncing,
  // to not see transparent background at bottom
  // should both have the same value
  bottom: '-30px',
  paddingBottom: '30px',
}

function SwipeInFromBelowModal() {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  useBodyScrollLock()
  useCloseOnEsc(onClose)

  const modalRef = useTrapFocus<HTMLDivElement>()

  const overlayProps = useSpring({
    backgroundColor: isOpen ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
  })

  const modalProps = useSpring({
    from: { y: '100%' },
    to: { y: isOpen ? '0%' : '100%' },
    config: { mass: 2, tension: 180, friction: 28 },
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
            ...modalStyle,
            ...modalProps,
          }}
        >
          <button onClick={onClose}>close modal</button>
        </animated.div>

        <button onClick={() => setIsOpen(true)}>Open modal</button>
      </animated.div>
    </>
  )
}

export default SwipeInFromBelowModal
