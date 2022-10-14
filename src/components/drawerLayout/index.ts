/* eslint-disable vue/require-default-prop */
import { defineComponent, onMounted, computed, ref, watch } from '@lincy-vue/core';
import { defaultDuration, handledEvents, supportsTouchDetector, supportsPassiveDetector, supportsTransitionsDetector } from './helper';
// https://github.com/hjl19911127/vue-drawer-layout
export default defineComponent({
  components: {
  },
  props: {
    drawerWidth: {
      type: Number
    },
    drawableDistance: {
      type: Number
    },
    zIndex: {
      type: Number,
      default: 999999
    },
    contentDrawable: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    backdropOpacityRange: {
      type: Array,
      default: () => {
        return [0, 0.4];
      },
      validator: (value: any) => {
        const [min, max] = value;
        return min < max && min >= 0 && max <= 1;
      }
    },
    enable: {
      type: Boolean,
      default: true
    },
    animatable: {
      type: Boolean,
      default: true
    },
    reverse: {
      type: Boolean,
      default: false
    },
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'mask-click': null,
    'slide-start': null,
    'slide-move': null,
    'slide-end': null
  },
  setup (props: any, context: any) {
    const { emit } = context;
    const refContainer = ref();
    const pos: any = ref(0);
    const width: any = ref(props.drawerWidth);
    const distance: any = ref(props.drawableDistance);
    const doc: any = document;
    let visible = false;
    let canAnimate = false;
    let moving = false;
    let willChange = false;

    const toggle = (isVisible: boolean) => {
      if (isVisible === undefined) isVisible = !visible;
      visible = isVisible;
      pos.value = visible ? width.value : 0;
      if (canAnimate) moving = true;
    };

    const onMaskClick = () => {
      // if (moving) return;
      emit('mask-click');
    };

    const animateStyle = computed(() => {
      return { moving: moving, 'will-change': willChange };
    });
    const drawerStyle = computed(() => {
      const initialOffset = Math.ceil(width.value * moveRate.value);
      const nowPosition = Math.ceil(pos.value * moveRate.value);
      return {
        zIndex: props.zIndex,
        width: `${width.value}px`,
        [props.reverse ? 'right' : 'left']: (initialOffset || 0) && `-${initialOffset}px`,
        transform: `translate3d(${(nowPosition || 0) && `${props.reverse ? '-' : ''}${nowPosition}px`},0,0)`
      };
    });
    const contentStyle = computed(() => {
      return { transform: `translate3d(${(pos.value || 0) && `${props.reverse ? '-' : ''}${pos.value}px`},0,0)` };
    });
    const backdropOpacity = computed(() => {
      const min: number = props.backdropOpacityRange[0];
      const max: number = props.backdropOpacityRange[1];
      return min + max * (pos.value / width.value) || 0;
    });
    const moveRate = computed(() => {
      return distance.value / width.value;
    });

    watch(() => props.showDrawer, (value) => {
      toggle(value);
    });

    onMounted(() => {
      const supportsTouch = supportsTouchDetector();
      const supportsTransitions = supportsTransitionsDetector();
      const supportsPassive = supportsPassiveDetector();
      canAnimate = props.animatable && supportsTransitions;

      // Get initial drawer size from its parentNode
      if (typeof width.value === 'undefined' || typeof distance.value === 'undefined') {
        const containerWidth = parseInt(window.getComputedStyle(refContainer.value.parentNode).width);
        const defaultWidth = containerWidth * 0.8;
        width.value = typeof width.value === 'undefined' ? defaultWidth : width.value;
        distance.value = typeof distance.value === 'undefined' ? defaultWidth : distance.value;
      }
      let t1, t2: number, speed: number, startX: number, startY: number, nowX: number, nowY, lastX, startPos: number, isVertical: boolean | undefined;
      // Start dragging handler
      const initDrag = function (e: any) {
        if (!props.enable) return;
        willChange = true;
        isVertical = undefined;
        nowX = startX = supportsTouch ? e.changedTouches[0].clientX : e.clientX;
        startY = supportsTouch ? e.changedTouches[0].clientY : e.clientY;
        t2 = +new Date();
        startPos = pos.value;
        doc.addEventListener(handledEvents.move, drag, supportsTouch && supportsPassive ? { passive: true } : false);
        doc.addEventListener(handledEvents.up, removeDrag, supportsTouch && supportsPassive ? { passive: true } : false);
        emit('slide-start');
      };
      // During dragging handler
      const drag = function (e: any) {
        t1 = t2;
        t2 = +new Date();
        lastX = nowX;
        nowX = supportsTouch ? e.changedTouches[0].clientX : e.clientX;
        nowY = supportsTouch ? e.changedTouches[0].clientY : e.clientY;
        speed = [1, -1][+props.reverse] * (nowX - lastX) / (t2 - t1);
        let _pos = startPos + [1, -1][+props.reverse] * (nowX - startX);
        _pos = Math.min(width.value, _pos);
        _pos = Math.max(0, _pos);
        if (isVertical === undefined) {
          const absX = Math.abs(nowX - startX); const absY = Math.abs(nowY - startY);
          if (absX) {
            if (absY) {
              isVertical = Math.abs(nowX - startX) / Math.abs(nowY - startY) < Math.sqrt(3);
            } else {
              isVertical = false;
            }
          }
        }
        if (!isVertical) {
          if (!(supportsTouch && supportsPassive)) e.preventDefault();
          pos.value = _pos;
          emit('slide-move', _pos);
        }
      };
      // Stop dragging handler
      const removeDrag = function () {
        if (isVertical !== undefined) {
          if (!isVertical) {
            const _pos = pos.value;
            if (speed > 0) {
              visible = (width.value - _pos) / speed < defaultDuration || _pos > width.value * 3 / 5;
            } else {
              visible = !((0 - _pos) / speed < defaultDuration || _pos < width.value * 3 / 5);
            }
            if (pos.value > 0 && pos.value < width.value && canAnimate) {
              moving = true;
            }
          }
          pos.value = visible ? width.value : 0;
        }
        if (!moving) {
          willChange = false;
          emit('slide-end', visible);
        }
        isVertical = undefined;
        doc.removeEventListener(handledEvents.move, drag, supportsTouch && supportsPassive ? { passive: true } : false);
        doc.removeEventListener(handledEvents.up, removeDrag, supportsTouch && supportsPassive ? { passive: true } : false);
      };
      // Check transitionend and stop
      'transitionend webkitTransitionEnd msTransitionEnd otransitionend oTransitionEnd'.split(' ').forEach((e) => {
        refContainer.value.addEventListener(e, () => {
          if (moving) {
            moving = false;
            willChange = false;
            pos.value = visible ? width.value : 0;
            emit('slide-end', visible);
          }
        }, false);
      });
      refContainer.value.addEventListener(handledEvents.down, initDrag, supportsTouch && supportsPassive ? { passive: true } : false);
    });

    return {
      toggle,
      onMaskClick,
      refContainer,
      pos,
      animateStyle,
      drawerStyle,
      contentStyle,
      backdropOpacity
    };
  }
});
