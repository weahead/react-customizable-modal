import React, { ReactNode } from 'react';
interface Props {
  role: string;
  children: ReactNode;
}

export const Modal = React.forwardRef<HTMLDivElement, Props>(
  ({ role, children }, ref) => {
    return (
      <div
        role={role}
        ref={ref}
        tabIndex={-1}
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        }}
      >
        {children}
      </div>
    );
  }
);
