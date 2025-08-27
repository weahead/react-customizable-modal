import { useCallback, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useTrapFocus, useBodyScrollLock, useCloseOnEsc } from '@weahead/react-customizable-modal';

const wrapperStyle = {
  display: 'flex',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0,0,0,0.6)',
};

const modalStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  left: 0,
  height: '80vh',
  overflow: 'auto',
  borderRadius: '30px 30px 0 0',
  backgroundColor: '#fff',
  paddingBottom: '500px', // just visual when modal is bouncing, to not see transparent background at bottom
};

const contentWrapperStyle = {
  padding: 20,
};

export default function SwipeInFromBelowModal({ handleOnClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const trapFocusRef = useTrapFocus();
  useBodyScrollLock();
  useCloseOnEsc(handleOnClose);

  const { x } = useSpring({
    x: isOpen ? 1 : 0,
    config: { mass: 2, tension: 180, friction: 28 },
    onRest: () => (isMounted && !isOpen ? handleOnClose() : null), // if mounted and modal is closed call HOC that the user has closed the modal and the animation has finished
  });

  // run once
  useEffect(() => {
    setIsOpen(true);
    setIsMounted(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  return (
    <div style={wrapperStyle}>
      <animated.div
        style={{
          ...overlayStyle,
          opacity: x,
        }}
        onClick={onClose}
      />
      <animated.div
        ref={trapFocusRef}
        style={{
          ...modalStyle,
          transform: x
            .interpolate({
              range: [0, 1],
              output: [0, 80],
            })
            .interpolate(x => `translateY(-${x}vh)`),
        }}
      >
        <div style={contentWrapperStyle}>
          <button onClick={onClose}>close modal</button>
        </div>
      </animated.div>
    </div>
  );
}
