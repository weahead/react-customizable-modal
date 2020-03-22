import React from 'react';

export const Overlay: React.FC = ({ children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
      }}
    >
      {children}
    </div>
  );
};
