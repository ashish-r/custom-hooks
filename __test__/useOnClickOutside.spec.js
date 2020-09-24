import { renderHook } from '@testing-library/react-hooks';

import useOnClickOutside from '../useOnClickOutside';

const element = document.createElement('div');
element.innerHTML = `<div id="parent">
<div id="sibling-a">sibling-a</div>
<div id="sibling-b" />sibling-b</div>
</div>`;
document.body.appendChild(element);

const triggerClick = (target) => {
  const event = new Event('click', { bubbles: true });
  document.getElementById(target).dispatchEvent(event);
};

describe('useOnClickOutside hook', () => {
  it('should call the callback passed when click outside the passed ref', () => {
    const callbackFunc = jest.fn();
    const ref = { current: document.getElementById('sibling-a') };
    renderHook(({ callback }) => useOnClickOutside(ref, callback), {
      initialProps: { callback: callbackFunc },
    });
    triggerClick('sibling-b');
    expect(callbackFunc).toHaveBeenCalled();
  });
  it('should not call the callback passed when click inside the passed ref', () => {
    const callback = jest.fn();
    const ref = { current: document.getElementById('parent') };
    renderHook(() => useOnClickOutside(ref, callback));
    triggerClick('sibling-b');
    expect(callback).not.toHaveBeenCalled();
  });
  it('should call the updated callback passed in last render', () => {
    const callbackFuncA = jest.fn();
    const ref = { current: document.getElementById('sibling-a') };

    const { rerender } = renderHook(({ elRef, callback }) => useOnClickOutside(elRef, callback), {
      initialProps: { callback: callbackFuncA, elRef: ref },
    });
    const callbackFuncB = jest.fn();
    rerender({ elRef: ref, callback: callbackFuncB });
    triggerClick('sibling-b');
    expect(callbackFuncA).not.toHaveBeenCalled();
    expect(callbackFuncB).toHaveBeenCalled();
  });
});
