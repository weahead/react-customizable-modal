import { useCallback } from 'react';
import { useHandleKeyPress } from './useHandleKeyPress';

const ESC = 27;
type onEscapeType = Function;

export function useCloseOnEsc(onEscape: onEscapeType) {
  const handleOnEsc = useCallback(
    event => {
      const { keyCode } = event;
      if (keyCode === ESC) {
        onEscape();
      }
    },
    [onEscape]
  );
  useHandleKeyPress(handleOnEsc);
}
