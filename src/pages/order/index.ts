import { defineComponent, reactive, toRefs, onBeforeMount, useRouter } from '@lincy-vue/core';
import ToastUtil from '@/utils/toast';
import { LoadMoreBottomStatus, LoadMoreTopStatus } from '@/model/consts';

let currentCount = 1;
const OrderStatus = ['待付款', '待确认', '待发货', '已发货', '交易完成'];
const GoodImageUrls = [
  'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png',
  'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner1.png',
  'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/banner2.png',
  'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/p40-silver.png',
  '/goods-img/mate30p3.png',
  '/goods-img/23ac3107-6309-40c8-bd28-164eb1186b62.jpg',
  '/goods-img/04949c0e-87df-445b-96dd-29e7fc69f734.jpg',
  '/goods-img/0dc503b2-90a2-4971-9723-c085a1844b76.jpg'
];

const createOrderItems = (total: number) => {
  const list = [];
  let i;
  let j;
  for (i = 0; i < total; i++) {
    currentCount = currentCount + 1;
    const item: any = {
      orderNo: `no_${currentCount}`,
      orderStatusString: OrderStatus[currentCount % 5],
      createTime: Date.now(),
      newMallOrderItems: []
    };
    for (j = 0; j < currentCount % 3; j++) {
      item.newMallOrderItems.push({
        orderId: `${currentCount}_${j}`,
        goodsCount: currentCount * 3 - currentCount % (j + 1),
        sellingPrice: currentCount * 30 - currentCount / (j + 1),
        goodsName: `商品名X${currentCount}Y${j}`,
        goodsCoverImg: GoodImageUrls[currentCount % 8]
      });
    }
    list.push(item);
  }
  return list;
};

export default defineComponent({
  components: {
  },
  props: {
  },
  setup () {
    const router: any = useRouter();
    const state: any = reactive({
      loading: false,
      topStatus: LoadMoreTopStatus.Default,
      bottomStatus: LoadMoreBottomStatus.Default,
      list: []
    });

    const onChangeTab = (name: string) => {
      // 这里 Tab 最好采用点击事件，@click，如果用 @change 事件，会默认进来执行一次。
      state.status = name;
    };

    const loadData = () => {
      ToastUtil.loading();
      state.loading = true;
      setTimeout(() => {
        state.list = createOrderItems(6);
        state.loading = false;
      }, 1200);
      ToastUtil.clear();
    };

    const onTopLoad = () => {
      currentCount = 1;
      state.topStatus = LoadMoreTopStatus.Loading;
      state.bottomStatus = LoadMoreBottomStatus.Default;
      state.loading = true;
      setTimeout(() => {
        state.list = createOrderItems(6);
        state.topStatus = LoadMoreTopStatus.Default;
        state.loading = false;
      }, 3000);
    };

    const onBottomLoad = () => {
      state.bottomStatus = LoadMoreBottomStatus.Loading;
      setTimeout(() => {
        state.list = state.list.concat(createOrderItems(6));
        state.bottomStatus = LoadMoreBottomStatus.Loaded;
        state.loading = false;
        if (state.list.length >= 20) {
          state.bottomStatus = LoadMoreBottomStatus.Nodata;
        }
      }, 3000);
    };

    const goTo = (orderId: string) => {
      router.push({
        name: 'goodDetail',
        params: {
          id: orderId
        }
      });
    };

    onBeforeMount(() => {
      currentCount = 1;
      loadData();
    });

    return {
      ...toRefs(state),
      onTopLoad,
      onBottomLoad,
      goTo,
      onChangeTab
    };
  }
});
