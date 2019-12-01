import React from "react";
import { useSpring, animated, config } from "react-spring";
import { useTrapFocus, useBodyScrollLock } from "react-customizable-modal";

export default function WobblyModal({ onClose }) {
  useBodyScrollLock();
  const modalRef = useTrapFocus();
  const overlayProps = useSpring({
    backgroundColor: "rgba(0,0,0,0.6)",
    from: { backgroundColor: "rgba(0,0,0,0)" }
  });
  const modalProps = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0)" },
    config: config.wobbly
  });
  return (
    <animated.div
      style={{
        ...overlayProps,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <animated.div
        ref={modalRef}
        style={{
          ...modalProps,
          width: 500,
          height: 400,
          backgroundColor: "#fff",
          padding: 20,
          position: "absolute"
        }}
      >
        <button onClick={onClose}>close modal</button>
      </animated.div>
    </animated.div>
  );
}
