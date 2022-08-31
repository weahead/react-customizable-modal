import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { useHandleKeyPress } from './useHandleKeyPress'

describe('useHandleKeyPress', () => {
  it('should run callback on key down', async () => {
    const user = userEvent.setup()

    const callback = vi.fn()
    function TestComponent() {
      useHandleKeyPress(callback)
      return (
        <div />
      )
    }

    render(<TestComponent />)

    await user.keyboard('Testing')

    expect(callback).toHaveBeenCalledTimes(7)

  })
});