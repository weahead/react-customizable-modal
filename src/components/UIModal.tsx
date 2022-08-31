import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react'

export type ModalProps = PropsWithChildren & {
  role: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
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
