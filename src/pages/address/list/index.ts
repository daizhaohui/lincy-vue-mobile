import { defineComponent, useRoute, useRouter, reactive, onMounted, toRefs } from '@lincy-vue/core';
import Api from '@/api';
import ToastUtil from '@/utils/toast';

export default defineComponent({
  components: {
  },
  setup (props) {
    const route: any = useRoute();
    const router: any = useRouter();
    const state: any = reactive({
      chosenAddressId: '1',
      list: [],
      from: route.query.from || ''
    });

    onMounted(async () => {
      ToastUtil.loading();
      const data: any = await Api.Address.getAddressList();
      if (!data) {
        state.list = [];
        return;
      }
      state.list = data.map((item: any) => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag
        };
      });
      ToastUtil.clear();
    });

    const onAdd = () => {
      router.push({ name: 'addAddress', query: { from: state.from } });
    };

    const onEdit = (item: any) => {
      router.push({ name: 'editAddress', params: { id: item.id }, query: { from: state.from } });
    };

    const onSelect = (item: any) => {
      router.push({ name: 'createOrder', query: { addressId: item.id, from: state.from } });
    };

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      onSelect
    };
  }
});
