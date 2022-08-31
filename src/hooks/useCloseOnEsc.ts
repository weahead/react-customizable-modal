import { useCallback } from 'react';
import { useHandleKeyPress } from './useHandleKeyPress';

export function useCloseOnEsc(onEscape: () => void) {
  const handleOnEsc = useCallback<(event: KeyboardEvent) => void>(
    event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onEscape();
      }
    },
    [onEscape]
  );

  useHandleKeyPress(handleOnEsc);
}
