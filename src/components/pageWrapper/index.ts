import { defineComponent, ref, watch, computed, useRem } from '@lincy-vue/core';
import { BottomStatus, TopStatus } from '@/components/loadMore/status';
import LoadMore from '@/components/loadMore';

// slots: nav-left,nav-right,nav-title
export default defineComponent({
  components: {
    LoadMore
  },
  props: {
    showNavBar: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    leftArrow: {
      type: Boolean,
      default: true
    },
    // 顶部下拉刷新状态: TopStatus.Loading/Loaded
    topStatus: {
      type: String,
      default: TopStatus.Default
    },
    // 底部上拉加载更多状态: BottomStatus.Loading/Loaded/Nodata/Error
    bottomStatus: {
      type: String,
      default: BottomStatus.Default
    },
    // 不启用loadMore功能（上拉、下拉更新）
    disableLoadMore: {
      type: Boolean,
      default: false
    },
    // 加载更多组件的显示文本、距离属性设置
    loadMoreOptions: {
      type: Object,
      default: () => {
        return {

        };
      }
    },
    // 头的高度 px,下拉位置会头下面
    headerHeight: {
      type: Number,
      default: 0
    },
    // 底部高度 px，上拉位置在底部之上
    footerHeight: {
      type: Number,
      default: 0
    },
    // 覆盖默认回退事件
    onBack: {
      type: Function,
      default: null
    }
  },
  emits: {
    'click-left': null,
    'click-right': null,
    'top-load': null,
    'bottom-load': null,
    'more-scroll': null
  },
  setup (props: any, context: any) {
    const { emit, slots } = context;
    const navBarSlotNames: any[] = [];
    const freshLoading = ref(props.pullFreshLoading);
    const loading = ref(props.loadingMore);

    const loadMoreProps = {
      ...props.loadMoreOptions
    };

    const onClickLeft = (e: any) => {
      if (props.onBack) {
        props.onBack();
      } else if (Object.keys(slots).includes('nav-left')) {
        emit('click-left', e);
      } else {
        window.history.back();
      }
    };

    const onClickRight = (e: any) => {
      emit('click-right', e);
    };

    const onTopLoad = () => {
      emit('top-load');
    };

    const onBottomLoad = () => {
      emit('bottom-load');
    };

    const onMoreScroll = (dom: any) => {
      emit('more-scroll', dom);
    };

    Object.keys(slots).forEach(k => {
      if (k === 'nav-title') {
        navBarSlotNames.push('title');
      } else if (k === 'nav-left') {
        navBarSlotNames.push('left');
      } else if (k === 'nav-right') {
        navBarSlotNames.push('right');
      }
    });

    watch(() => props.pullFreshLoading, (value) => {
      freshLoading.value = value;
    });

    watch(() => props.loadingMore, (value) => {
      loading.value = value;
    });

    const headerStyle = computed(() => {
      return `position:absolute;left:0;right:0;top:${useRem(props.showNavBar ? 46 : 0).toString()};height:${useRem(props.headerHeight).toString()};`;
    });

    const footerStyle = computed(() => {
      return `position:fixed;left:0;right:0;bottom:0;height:${useRem(props.footerHeight).toString()};`;
    });

    const contentStyle = computed(() => {
      const topValue = props.showNavBar ? 46 + props.headerHeight : props.headerHeight;
      return `position:absolute;left:0;right:0;bottom:${useRem(props.footerHeight).toString()};top:${useRem(topValue).toString()};`;
    });

    return {
      navBarSlotNames,
      freshLoading,
      loading,
      loadMoreProps,
      headerStyle,
      footerStyle,
      contentStyle,
      onTopLoad,
      onBottomLoad,
      onMoreScroll,
      onClickLeft,
      onClickRight
    };
  }
});
