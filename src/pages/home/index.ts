import { defineComponent, ref, onMounted, reactive, toRefs, useRouter, useEmitter } from '@lincy-vue/core';
import HomeSwiper from './swiper';
import HomeHeader from './header';
import { LoadMoreBottomStatus, LoadMoreTopStatus, GlobalEvents } from '@/model/consts';
import Api from '@/api';
import { IRouterService, Emitter } from '@lincy-vue/core/types';

const CategoryList = [
  {
    name: 'XX超市',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
    categoryId: 100001
  }, {
    name: 'XX服饰',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
    categoryId: 100003
  }, {
    name: '全球购',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
    categoryId: 100002
  }, {
    name: 'XX生鲜',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
    categoryId: 100004
  }, {
    name: 'XX到家',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
    categoryId: 100005
  }, {
    name: '充值缴费',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
    categoryId: 100006
  }, {
    name: '9.9元拼',
    imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
    categoryId: 100007
  }, {
    name: '领劵',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
    categoryId: 100008
  }, {
    name: '省钱',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
    categoryId: 100009
  }, {
    name: '全部',
    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
    categoryId: 100010
  }
];

export default defineComponent({
  components: {
    HomeSwiper,
    HomeHeader
  },
  setup (props, context) {
    const showNavBar = ref(false);
    const showHeader = ref(true);
    const router: IRouterService = useRouter();
    const state = reactive({
      swiperList: [], // 轮播图列表
      hots: [],
      categoryList: CategoryList,
      newGoodses: [],
      recommends: [],
      loading: false,
      bottomStatus: LoadMoreBottomStatus.Default,
      topStatus: LoadMoreTopStatus.Default
    });

    const showMenu = () => {
      const emitter: Emitter = useEmitter();
      emitter.emit(GlobalEvents.OnToggleDrawer);
    };

    const onLogin = () => {
      router.push('login');
    };

    const goToDetail = (item: any) => {
      router.push({
        name: 'goodDetail',
        params: {
          id: item.goodsId
        }
      });
    };

    const loadData = () => {
      state.loading = true;
      Api.Home.getHome().then((res: any) => {
        const { data } = res;
        setData(data);
        state.loading = false;
      }).catch((_err: any) => {
        state.loading = false;
      });
    };

    const setData = (data: any) => {
      state.swiperList = data.data.carousels;
      state.newGoodses = data.data.newGoodses;
      state.hots = data.data.hotGoodses;
      state.recommends = data.data.recommendGoodses;
    };

    const onTopLoad = () => {
      state.topStatus = LoadMoreTopStatus.Loading;
      state.bottomStatus = LoadMoreBottomStatus.Default;
      state.loading = true;
      Api.Home.getHome().then((res: any) => {
        const { data } = res;
        setData(data);
        state.loading = false;
        state.topStatus = LoadMoreTopStatus.Loaded;
      }).catch((_err: any) => {
        state.topStatus = LoadMoreTopStatus.Default;
        state.loading = false;
      });
    };

    const onBottomLoad = () => {
      state.bottomStatus = LoadMoreBottomStatus.Loading;
      Api.Home.getHome().then((res: any) => {
        const { data } = res;
        setData(data);
        state.bottomStatus = LoadMoreBottomStatus.Loaded;
        // 没有更多数据
        if (state.newGoodses.length === 1000) {
          state.bottomStatus = LoadMoreBottomStatus.Nodata;
        }
      }).catch((_err: any) => {
        state.bottomStatus = LoadMoreBottomStatus.Error;
      });
    };

    const onMoreScroll = (dom: any) => {
      const scrollTop = dom.scrollTop;
      if (scrollTop > 100) {
        showNavBar.value = true;
        showHeader.value = false;
      } else {
        showNavBar.value = false;
        showHeader.value = true;
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      showNavBar,
      showHeader,
      ...toRefs(state),
      showMenu,
      onBottomLoad,
      onTopLoad,
      onMoreScroll,
      goToDetail,
      onLogin
    };
  }
});
