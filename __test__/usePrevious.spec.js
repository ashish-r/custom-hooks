import { renderHook } from '@testing-library/react-hooks';

import usePrevious from '../hooks/usePrevious';

describe('usePrevious hook', () => {
  it('should return the value set in previous render', () => {
    const { rerender, result } = renderHook((prop) => usePrevious(prop), {
      initialProps: 10,
    });
    expect(result.current).toBe(null);
    rerender(11);
    expect(result.current).toBe(10);
    rerender(12);
    expect(result.current).toBe(11);
  });
});
