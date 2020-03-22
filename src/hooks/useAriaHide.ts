import { useRef, useEffect } from 'react';

/**
 * set aria-hidden attribute on element with id
 * @param {string} appElementId
 */
export function useAriaHide(appElementId: string) {
  const appElementRef = useRef(document.getElementById(appElementId));
  useEffect(() => {
    const { current: appElement } = appElementRef;
    if (appElement) {
      appElement.setAttribute('aria-hidden', 'true');
    }
    return () => {
      if (appElement) {
        appElement.removeAttribute('aria-hidden');
      }
    };
  }, []);
}
