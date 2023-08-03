import React, { PropsWithChildren } from 'react';
interface Props {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Overlay: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
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
