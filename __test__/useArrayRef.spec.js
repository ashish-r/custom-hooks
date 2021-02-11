import { renderHook } from '@testing-library/react-hooks';

import useArrayRef from '../hooks/useArrayRef';

describe('useArrayRef hook', () => {
  it('should return an array with ref stored at every index', () => {
    const { rerender, result } = renderHook(({ size }) => useArrayRef(size), {
      initialProps: { size: 3 },
    });
    expect(result.current.length).toBe(3);
    expect(result.current).toEqual(expect.arrayContaining([{ current: null }]));
    rerender({ size: 4 });
    expect(result.current.length).toBe(4);
  });
  it('should return the previous instance after rerender if size is same', () => {
    const { rerender, result } = renderHook(({ size }) => useArrayRef(size), {
      initialProps: { size: 3 },
    });
    const result1 = result.current;
    rerender({ size: 3 });
    expect(result.current).toStrictEqual(result1);
  });
  it('should remove copy the previous refs when size changes after rerender', () => {
    const { rerender, result } = renderHook(({ size }) => useArrayRef(size), {
      initialProps: { size: 3 },
    });
    result.current[0].current = 1;
    rerender({ size: 4 });
    expect(result.current[0].current).toBe(1);
  });
});
