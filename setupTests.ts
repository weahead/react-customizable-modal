// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

vi.mock('tabbable', async (): Promise<typeof import('tabbable')> => {
  const mod = await vi.importActual<typeof import('tabbable')>('tabbable')
  return {
    ...mod,
    tabbable: (node, options) => mod.tabbable(node, { ...options, displayCheck: 'none' }),
    focusable: (node, options) => mod.focusable(node, { ...options, displayCheck: 'none' }),
    isFocusable: (node, options) => mod.isFocusable(node, { ...options, displayCheck: 'none' }),
    isTabbable: (node, options) => mod.isTabbable(node, { ...options, displayCheck: 'none' }),
  }
})
