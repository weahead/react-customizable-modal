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

function visible(element: HTMLElement) {
  let parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidesContents(parentElement)) return false;
    // @ts-expect-error elm.parentNode is of type ParentNode and not HTMLElement
    parentElement = parentElement.parentNode
  }
  return true;
}

export function focusable(element: HTMLElement, isTabIndexNotNaN: boolean) {
  const nodeName = element.nodeName.toLowerCase();
  const res =
    // @ts-expect-error .disable is not part of HTMLElement
    (tabbableNode.test(nodeName) && !element.disabled) ||
    // @ts-expect-error .href is only applicable on anchor tags
    (nodeName === 'a' ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

export function tabbable(element: HTMLElement) {
  let tabIndex: string | number | null | undefined = element.getAttribute('tabindex');
  if (tabIndex === null) tabIndex = undefined;
  tabIndex = Number(tabIndex)
  const isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

export default function findTabbableDescendants(
  element: HTMLElement
): HTMLElement[] {
  return [].slice.call(element.querySelectorAll('*'), 0).filter(tabbable);
}
