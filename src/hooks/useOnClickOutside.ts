import { useEffect } from 'react';

import type { RefObject } from 'react'

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
      throw new Error(`Node expected`);
  }
}

// from https://usehooks.com/useOnClickOutside/
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        assertIsNode(event.target)
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },

    // Add ref and handler to effect dependencies

    // It's worth noting that because passed in handler is a new ...

    // ... function on every render that will cause this effect ...

    // ... callback/cleanup to run every render. It's not a big deal ...

    // ... but to optimize you can wrap handler in useCallback before ...

    // ... passing it into this hook.

    [ref, handler]
  );
}
