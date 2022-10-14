/* eslint-disable getter-return */
export const defaultDuration = 500;
export const cacheFunctionWrapper = (func: any): any => {
  let result: any;
  return function () {
    if (typeof result === 'undefined') {
      result = func();
    }
    return result;
  };
};
export const supportsTouchDetector = cacheFunctionWrapper(() => 'ontouchstart' in window);
export const handledEvents = supportsTouchDetector()
  ? { down: 'touchstart', move: 'touchmove', up: 'touchend' }
  : { down: 'mousedown', move: 'mousemove', up: 'mouseup' };
export const supportsPassiveDetector = cacheFunctionWrapper(() => {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      }
    });
    const win: any = window;
    win.addEventListener('test', null, opts);
  } catch (e) {
  }
  return supportsPassive;
});
export const supportsTransitionsDetector = cacheFunctionWrapper(() => {
  const b = document.body ?? document.documentElement;
  const s: any = b.style;
  let p: string = 'transition';
  if (typeof s[p] === 'string') {
    return true;
  }
  // Tests for vendor specific prop
  const v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
  p = p.charAt(0).toUpperCase() + p.substr(1);
  for (let i = 0; i < v.length; i++) {
    if (typeof s[v[i] + p] === 'string') {
      return true;
    }
  }
  return false;
});
