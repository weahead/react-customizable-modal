/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

const tabbableNode = /input|select|textarea|button|object/;

function hidesContents(element: HTMLElement) {
  const zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  // Otherwise we need to check some styles
  const style = window.getComputedStyle(element);
  return zeroSize
    ? style.getPropertyValue('overflow') !== 'visible'
    : style.getPropertyValue('display') === 'none';
}

function visible(element: any) {
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidesContents(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

export function focusable(element: HTMLElement, isTabIndexNotNaN: boolean) {
  const nodeName = element.nodeName.toLowerCase();
  const res =
    //@ts-ignore
    (tabbableNode.test(nodeName) && !element.disabled) ||
    //@ts-ignore
    (nodeName === 'a' ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

export function tabbable(element: HTMLElement) {
  let tabIndex = element.getAttribute('tabindex');
  //@ts-ignore
  if (tabIndex === null) tabIndex = undefined;
  //@ts-ignore
  const isTabIndexNaN = isNaN(tabIndex);
  //@ts-ignore
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

export default function findTabbableDescendants(
  element: HTMLElement
): HTMLElement[] {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(tabbable);
}
