import { render } from '@testing-library/react';

import { useBodyScrollLock } from './useBodyScrollLock'

describe('useBodyScrollLock', () => {
  it('should prevent scroll on body on mount and reset on unmount', async () => {
    document.body.style.overflow = 'special'

    function TestComponent() {
      useBodyScrollLock()
      return (
        <div />
      )
    }

    const { unmount } = render(<TestComponent />)

    // we test the style display property, because checking scroll is not reliable
    expect(document.body).toHaveStyle({ overflow: 'hidden'})

    unmount()

    expect(document.body).not.toHaveStyle({ overflow: 'hidden'})
    expect(document.body).toHaveStyle({overflow: 'special'})
  })
});