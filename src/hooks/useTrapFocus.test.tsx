import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { useTrapFocus } from './useTrapFocus';

describe('useTrapFocus', () => {
  it('should focus on the container element if it is focusable', () => {
    function TestComponent() {
      const ref = useTrapFocus<HTMLDivElement>();
      return (
        <div ref={ref} id={'container'} data-testid='container' tabIndex={1}>
          <label>
            first <input type={'text'} />
          </label>
          <button>submit</button>
        </div>
      );
    }

    render(<TestComponent></TestComponent>);

    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument()
    expect(container).toHaveFocus()
  });

  it('should not focus on the container element if it is not focusable', () => {
    function TestComponent() {
      const ref = useTrapFocus<HTMLDivElement>();
      return (
        <div ref={ref} id={'container'} data-testid='container' tabIndex={-1}>
          <label>
            first <input type={'text'} />
          </label>
          <button>submit</button>
        </div>
      );
    }

    render(<TestComponent></TestComponent>);

    const container = screen.getByTestId('container');
    const input = screen.getByRole('textbox', { name: 'first'})

    expect(container).toBeInTheDocument()
    expect(container).not.toHaveFocus()
    expect(input).toBeInTheDocument()
    expect(input).not.toHaveFocus()
    expect(document.body).toHaveFocus()
  });

  it('should loop focus back to the first element on tab', async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const ref = useTrapFocus<HTMLDivElement>();
      return (
        <div
          ref={ref}
          id={'container'}
          data-testid={'container'}
          tabIndex={-1}
        >
          <label>
            first <input type={'text'} />
          </label>
          <button>submit</button>
        </div>
      );
    }

    render(<TestComponent />);

    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()

    const input = screen.getByRole('textbox', { name: 'first'});

    expect(input).toBeInTheDocument()
    expect(input).toHaveFocus()
  });

  it('should loop focus back to the last element on shift+tab', async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const ref = useTrapFocus<HTMLDivElement>();
      return (
        <div
          ref={ref}
          id={'container'}
          data-testid={'container'}
          tabIndex={-1}
        >
          <label>
            first <input type={'text'} />
          </label>
          <button>submit</button>
        </div>
      );
    }

    render(<TestComponent />);

    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})

    const button = screen.getByRole('button', { name: 'submit'});

    expect(button).toBeInTheDocument()
    expect(button).toHaveFocus()
  });

  it('should loop focus back to the last element on shift+tab scoped to the ref', async () => {
    const user = userEvent.setup()

    function TestComponent() {
      const ref = useTrapFocus<HTMLDivElement>();
      return (
        <>
          <div
            ref={ref}
            id={'container'}
            data-testid={'container'}
            tabIndex={-1}
          >
            <label>
              first <input type={'text'} />
            </label>
            <button>submit</button>
          </div>
          <label>
            second
            <input type="text" />
          </label>
          <label>
            third
            <input type="text" />
          </label>
        </>
      );
    }

    render(<TestComponent />);

    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})
    await user.tab({shift: true})

    const button = screen.getByRole('button', { name: 'submit'});

    expect(button).toBeInTheDocument()
    expect(button).toHaveFocus()
  });

});