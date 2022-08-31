import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { useCloseOnEsc } from './useCloseOnEsc'

describe('useCloseOnEsc', () => {
  it('should run callback on ESC', async () => {
    const user = userEvent.setup()

    const callback = vi.fn()
    function TestComponent() {
      useCloseOnEsc(callback)
      return (
        <div />
      )
    }

    render(<TestComponent />)

    await user.keyboard('{Escape}')
    await user.keyboard('{Escape}')
    await user.keyboard('{Escape}')
    await user.keyboard('{Escape}')

    expect(callback).toHaveBeenCalledTimes(4)

  })
});