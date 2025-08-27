import { useCallback } from 'react';
import { useHandleKeyPress } from './useHandleKeyPress';

const ESC = 'Escape';
type onEscapeType = () => void;

export function useCloseOnEsc(onEscape: onEscapeType) {
  const handleOnEsc = useCallback(
    (event: KeyboardEvent) => {
      const { code } = event;
      if (code === ESC) {
        onEscape();
      }
    },
    [onEscape]
  );
  useHandleKeyPress(handleOnEsc);
}
