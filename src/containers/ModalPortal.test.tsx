import { screen, render } from '@testing-library/react';

import { ModalPortal } from './ModalPortal'

describe('ModalPortal', () => {
  it('should mount a modal', async () => {
    function TestComponent() {
      return (
        <ModalPortal id="test-modal">
          <p>Hello there!</p>
        </ModalPortal>
      )
    }

    render(<TestComponent />)

    const p = screen.getByText('Hello there!')

    expect(p).toBeInTheDocument()
  })
});