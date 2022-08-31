import type { PropsWithChildren } from "react";

export type OverlayProps = PropsWithChildren & {
  onClick: (event: MouseEvent | TouchEvent) => void
}

export function Overlay({ children }: OverlayProps) {
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
