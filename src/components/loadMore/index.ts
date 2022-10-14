import { defineComponent, toRefs, reactive, computed, ref, onMounted, nextTick, watch, onBeforeUnmount } from '@lincy-vue/core';

const TOPSTATUS = {
  Wait: 'wait', // 等待
  Pulling: 'pulling', // 下拉
  Limit: 'limit', // 超过触发值
  Loading: 'loading', // 正在加载
  Loaded: 'loaded' // 刷新完成
};
const BOTTOMSTATUS = {
  Wait: 'wait', // 等待
  Loading: 'loading', // 正在加载
  Nodata: 'nodata', // 暂无数据
  Error: 'error', // 错误
  Loaded: 'loaded' // 加载完毕
};

export default defineComponent({
  components: {
  },
  props: {
    // 顶部下拉刷新状态: TopStatus.Loading/Loaded
    topStatus: {
      type: String,
      default: TOPSTATUS.Wait
    },
    // 底部上拉加载更多状态: BottomStatus.Loading/Loaded/Nodata/Error
    bottomStatus: {
      type: String,
      default: BOTTOMSTATUS.Wait
    },
    // 不启用loadMore功能（上拉、下拉更新）
    disableLoadMore: {
      type: Boolean,
      default: false
    },
    // 禁止下拉刷新
    disableTop: {
      type: Boolean,
      default: false
    },
    // 禁止上拉加载
    disableBottom: {
      type: Boolean,
      default: false
    },
    // 下拉移动比例
    distanceIndex: {
      type: Number,
      default: 2
    },
    // 触发上拉无限滚动距离
    bottomDistance: {
      type: Number,
      default: 20
    },
    // 下拉距离触发值
    topDistance: {
      type: Number,
      default: 100
    },
    // 下拉刷新状态提示:
    topChangeText: {
      type: Object,
      default () {
        return {
          pulling: '下拉刷新...',
          limit: '释放刷新',
          loading: '正在加载...',
          loaded: '加载完成'
        };
      }
    },
    // 上拉加载状态提示
    bottomChangeText: {
      type: Object,
      default: () => {
        return {
          loading: '正在加载...',
          loaded: '加载完成',
          nodata: '暂无更多数据',
          error: '请求数据出错，请点击重试'
        };
      }
    }
  },
  emits: {
    // 刷新事件
    'top-load': null,
    // 下拉加载更多事件
    'bottom-load': null,
    // 滚动事件
    'more-scroll': null
  },
  setup (props: any, context: any) {
    const { emit } = context;
    const state: any = reactive({
      startPositionTop: null,
      startScreenY: 0,
      endScreenY: 0,
      topStatus: TOPSTATUS.Wait,
      bottomOverflow: 'auto',
      bottomStatus: BOTTOMSTATUS.Wait
    });
    const refContent = ref();
    const refThis = ref();

    const handleScroll = () => {
      emit('more-scroll', refThis.value);
      if (props.disableBottom) {
        return;
      }
      if (state.bottomStatus !== BOTTOMSTATUS.Wait) {
        return;
      }
      const bDistance = refThis.value.scrollHeight - refThis.value.scrollTop - refThis.value.clientHeight;
      if (bDistance <= props.bottomDistance && bDistance > 0) {
        const ret: any = nextTick(() => {
          // 移动端某些浏览器初始化控制台报错，不影响使用
          try {
            refThis.value.scrollTo(0, refThis.value.scrollHeight);
          } catch (e) {}
          // this.$el.scrollTop = this.$el.scrollHeight
        });
        emit('bottom-load');
        return ret;
      }
    };

    const handleTouchStart = (e: any) => {
      // 只有没滚动时才触发事件
      if (
        refContent.value.getBoundingClientRect().top < state.startPositionTop
      ) {
        return;
      }
      if (state.topStatus === TOPSTATUS.Loading) {
        return;
      }
      const screenY = e.touches[0].screenY;
      state.startScreenY = screenY;
    };

    const handleTouchMove = (e: any) => {
      // 只有没滚动时才触发事件
      if (
        refContent.value.getBoundingClientRect().top < state.startPositionTop
      ) {
        return;
      }
      if (state.topStatus === TOPSTATUS.Loading) {
        return;
      }
      const screenY = e.touches[0].screenY;
      const moveDistance = (screenY - state.startScreenY) / props.distanceIndex;
      if (
        refContent.value.getBoundingClientRect().top > state.startPositionTop
      ) {
        state.topStatus = TOPSTATUS.Pulling;
      }
      if (moveDistance >= props.topDistance) {
        state.topStatus = TOPSTATUS.Limit;
      }
      if (moveDistance > 0) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchEnd = (e: any) => {
      // 只有没滚动时才触发事件
      if (
        refContent.value.getBoundingClientRect().top < state.startPositionTop
      ) {
        return;
      }
      if (
        state.topStatus === TOPSTATUS.Pulling ||
        state.topStatus === TOPSTATUS.Limit
      ) {
        e.stopPropagation();
        e.preventDefault();
      }
      if (state.topStatus === 'loading') {
        return;
      }
      const screenY = e.changedTouches[0].screenY;
      if (
        (screenY - state.startScreenY) / props.distanceIndex >= props.topDistance
      ) {
        state.topStatus = TOPSTATUS.Loading;
        // 下拉刷新触发方法
        emit('top-load');
        if (!props.disableBottom) {
          state.bottomStatus = BOTTOMSTATUS.Wait;
        }
      } else {
        state.topStatus = TOPSTATUS.Wait;
        state.startScreenY = 0;
      }
    };

    // 出错时，点击重新加载数据
    const onBottomErrorClick = () => {
      if (state.bottomStatus === BOTTOMSTATUS.Error) {
        emit('bottom-load');
      }
    };

    const bindTouchEvents = () => {
      refContent.value.addEventListener('touchstart', handleTouchStart);
      refContent.value.addEventListener('touchmove', handleTouchMove);
      refContent.value.addEventListener('touchend', handleTouchEnd);
    };

    const init = () => {
      state.startPositionTop = refContent.value.getBoundingClientRect().top;
      if (!props.disableLoadMore && !props.disableTop) {
        bindTouchEvents();
      }
      if (!props.disableLoadMore && !props.disableBottom) {
        refThis.value.addEventListener('scroll', handleScroll);
      }
    };

    const topText = computed(() => {
      switch (state.topStatus) {
        case TOPSTATUS.Pulling:
          return props.topChangeText.pulling;
        case TOPSTATUS.Limit:
          return props.topChangeText.limit;
        case TOPSTATUS.Loading:
          return props.topChangeText.loading;
        case TOPSTATUS.Loaded:
          return props.topChangeText.loaded;
        default:
          return '';
      }
    });

    const bottomText = computed(() => {
      switch (state.bottomStatus) {
        case BOTTOMSTATUS.Loading:
          return props.bottomChangeText.loading;
        case BOTTOMSTATUS.Loaded:
          return props.bottomChangeText.loaded;
        case BOTTOMSTATUS.Nodata:
          return props.bottomChangeText.nodata;
        case BOTTOMSTATUS.Error:
          return props.bottomChangeText.error;
        default:
          return '';
      }
    });

    if (!props.disableLoadMore && !props.disableTop) {
      watch(() => props.topStatus, (value) => {
        state.topStatus = value;
      });
      watch(() => state.topStatus, (value) => {
        if (value === TOPSTATUS.Loaded) {
          const timer = setTimeout(() => {
            state.topStatus = TOPSTATUS.Wait;
            clearTimeout(timer);
          }, 300);
        }
      });
    }

    if (!props.disableLoadMore && !props.disableBottom) {
      watch(() => props.bottomStatus, (value) => {
        state.bottomStatus = value;
      });
      watch(() => state.bottomStatus, (value) => {
        if (value === BOTTOMSTATUS.Loaded) {
          const timer = setTimeout(() => {
            state.bottomStatus = BOTTOMSTATUS.Wait;
            clearTimeout(timer);
          }, 1000);
        }
      });
    }

    onMounted(() => {
      init();
    });

    onBeforeUnmount(() => {
      if (!state.disableBottom) {
        refThis.value.removeEventListener('scroll', handleScroll);
      }
      if (!state.disableTop) {
        refContent.value.removeEventListener('touchstart', handleTouchStart);
        refContent.value.removeEventListener('touchmove', handleTouchMove);
        refContent.value.removeEventListener('touchend', handleTouchEnd);
      }
    });

    return {
      ...toRefs(state),
      topText,
      bottomText,
      refContent,
      refThis,
      handleScroll,
      onBottomErrorClick
    };
  }
});
