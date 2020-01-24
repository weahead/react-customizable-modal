import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useTrapFocus } from '../useTrapFocus';
// import "@testing-library/jest-dom/extend-expect";

describe('useTrapFocus', () => {
  it('should focus on the container element if it is focusable', () => {
    function TestComponent() {
      const elementRef = useTrapFocus();
      return (
        <div ref={elementRef} id={'container'} tabIndex={-1}>
          <input id={'first-input'} type={'text'} />
          <button>submit</button>
        </div>
      );
    }
    render(<TestComponent></TestComponent>);
    const activeElement = document.activeElement as HTMLElement;
    expect(activeElement.getAttribute('id')).toEqual('container');
  });
});
it('should loop focus back to the first element on tab', () => {
  function TestComponent2() {
    const elementRef = useTrapFocus();
    return (
      <div
        ref={elementRef}
        id={'container'}
        data-testId={'container'}
        tabIndex={-1}
      >
        <input id={'first-input'} type={'text'} />
        <button>submit</button>
      </div>
    );
  }
  const { getByTestId } = render(<TestComponent2></TestComponent2>);
  const container = getByTestId('container');
  fireEvent.keyDown(container, { key: 'Tab', code: 9 });
  fireEvent.keyDown(container, { key: 'Tab', code: 9 });
  const activeElement = document.activeElement as HTMLElement;
  expect(activeElement.getAttribute('id')).toEqual('container');
});
