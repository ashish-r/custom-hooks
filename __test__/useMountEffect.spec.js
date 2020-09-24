import { renderHook } from '@testing-library/react-hooks';

import useMountEffect from '../useMountEffect';

describe('useMountEffect hook', () => {
  it('should call the call the func provided for mount only once', () => {
    const funcForMount = jest.fn();
    const { rerender } = renderHook(() => useMountEffect(funcForMount));
    expect(funcForMount).toHaveBeenCalledTimes(1);
    rerender();
    expect(funcForMount).toHaveBeenCalledTimes(1);
  });
  it('should call the call the func provided for unmount only once', () => {
    const funcForUnmount = jest.fn();
    const { rerender, unmount } = renderHook(() => useMountEffect(() => {}, funcForUnmount));
    expect(funcForUnmount).toHaveBeenCalledTimes(0);
    rerender();
    expect(funcForUnmount).toHaveBeenCalledTimes(0);
    unmount();
    expect(funcForUnmount).toHaveBeenCalledTimes(1);
  });

  it('should call the call the latest unmount func to avoid stale closure', () => {
    const funcForUnmnountA = jest.fn();
    const { rerender, unmount } = renderHook(
      ({ mountFunc, unmountFunc }) => useMountEffect(mountFunc, unmountFunc),
      {
        initialProps: { mountFunc: () => {}, unmountFunc: funcForUnmnountA },
      },
    );
    const funcForUnmnountB = jest.fn();
    rerender({ mountFunc: () => {}, unmountFunc: funcForUnmnountB });
    expect(funcForUnmnountA).toHaveBeenCalledTimes(0);
    expect(funcForUnmnountB).toHaveBeenCalledTimes(0);
    unmount();
    expect(funcForUnmnountA).toHaveBeenCalledTimes(0);
    expect(funcForUnmnountB).toHaveBeenCalledTimes(1);
  });
});
