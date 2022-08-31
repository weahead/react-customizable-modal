import { useRef } from 'react'
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { useOnClickOutside } from './useOnClickOutside'

describe('useOnClickOutside', () => {
  it('should run callback on mouse down and touch', async () => {
    const user = userEvent.setup()

    const callback = vi.fn()
    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null)
      useOnClickOutside(ref, callback)
      return (
        <div data-testid='el' ref={ref}/>
      )
    }

    render(<TestComponent />)

    const div = screen.getByTestId('el');
    await user.click(document.body)
    await user.click(div)
    await user.click(document.body)
    await user.click(document.body)
    await user.click(div)

    expect(callback).toHaveBeenCalledTimes(3)

  })
});