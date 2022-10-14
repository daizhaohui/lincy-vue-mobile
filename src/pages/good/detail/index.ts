/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, reactive, toRefs, useRouter, useRoute, onMounted, nextTick, computed } from '@lincy-vue/core';
import { LoadMoreTopStatus } from '@/model/consts';
import Api from '@/api';
import filters from '@/utils/filters';
import ToastUtil from '@/utils/toast';
import { IRouterService, IRouteLocationNormalized } from '@lincy-vue/core/types';

export default defineComponent({
  components: {
  },
  props: {

  },
  setup (props) {
    const router: IRouterService = useRouter();
    const route: IRouteLocationNormalized = useRoute();
    const state: any = reactive({
      detail: {
        goodsCarouselList: []
      },
      topStatus: LoadMoreTopStatus.Default
    });

    const loadData = async () => {
      const { id } = route.params;
      const result: any = await Api.Good.getDetail({
        pathParams: {
          id
        }
      });
      const { data } = result;
      data.goodsCarouselList = data.goodsCarouselList.map(i => filters.prefix(i));
      state.detail = data;
    };

    const goTo = () => {
      router.push('cart');
    };

    const onTopLoad = () => {
      state.topStatus = LoadMoreTopStatus.Loading;
      loadData();
      state.topStatus = LoadMoreTopStatus.Loaded;
    };

    const handleAddCart = async () => {
      const result: any = await Api.Cart.addCart({ goodsCount: 1, goodsId: state.detail.goodsId });
      const { resultCode } = result;
      if (resultCode === 200) ToastUtil.success('添加成功');
    };

    const goToCart = async () => {
      await Api.Cart.addCart({ goodsCount: 1, goodsId: state.detail.goodsId });
      router.push('cart');
    };

    const count = computed(() => {
      return 3;
    });

    onMounted(() => {
      loadData();
    });

    nextTick(() => {
      // 一些和DOM有关的东西
      const content: any = document.querySelector('.detail-content');
      content.scrollTop = 0;
    });

    return {
      ...toRefs(state),
      count,
      goTo,
      goToCart,
      onTopLoad,
      handleAddCart
    };
  }
});
