import { defineComponent, useRoute, useRouter, reactive, onMounted, toRefs } from '@lincy-vue/core';
import Api from '@/api';
import ToastUtil from '@/utils/toast';
import DictionaryUtil from '@/utils/dictionary';
import { IRouterService, IRouteLocationNormalized } from '@lincy-vue/core/types';

interface IState {
  areaList: any
  searchResult: []
  type: string
  addressId: string
  addressInfo: any
  from: any
}

export default defineComponent({
  components: {
  },
  setup () {
    const route: IRouteLocationNormalized = useRoute();
    const router: IRouterService = useRouter();
    const state: IState = reactive({
      areaList: {
        provinceList: {},
        cityList: {},
        countyList: {}
      },
      searchResult: [],
      type: 'add',
      addressId: '',
      addressInfo: {},
      from: route.query.from
    });

    const setDistrict = () => {
      const provinceList: any = {};
      const cityList: any = {};
      const countyList: any = {};
      DictionaryUtil.getDistrictLev1().forEach(p => {
        provinceList[p.id] = p.text;
        DictionaryUtil.getDistrictLev2(p.id).forEach(c => {
          cityList[c.id] = c.text;
          DictionaryUtil.getDistrictLev3(c.id).forEach(q => {
            countyList[q.id] = q.text;
          }
          );
        });
      });
      state.areaList.province_list = provinceList;
      state.areaList.city_list = cityList;
      state.areaList.county_list = countyList;
    };

    onMounted(async () => {
      // 省市区列表构造
      const { from } = route.query;
      const addressId = route.params.id || '';
      state.addressId = addressId;
      state.type = addressId ? 'edit' : 'add';
      state.from = from || '';

      setDistrict();
      if (state.type === 'edit') {
        const addressDetail: any = await Api.Address.getAddressDetail(addressId);
        let areaCode = '';
        const province = DictionaryUtil.getDistrictLev1();
        Object.entries(state.areaList.county_list).forEach(([id, text]) => {
          // 先找出当前对应的区
          if (text === addressDetail.regionName) {
            // 找到区对应的几个省份
            const provinceIndex = province.findIndex(item => item.id.substr(0, 2) === id.substr(0, 2));
            // 找到区对应的几个市区
            // eslint-disable-next-line no-unused-vars
            const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) === id.substr(0, 4))[0];
            // 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
            if (province[provinceIndex].text === addressDetail.provinceName && cityItem[1] === addressDetail.cityName) {
              areaCode = id;
            }
          }
        });
        state.addressInfo = {
          id: addressDetail.addressId,
          name: addressDetail.userName,
          tel: addressDetail.userPhone,
          province: addressDetail.provinceName,
          city: addressDetail.cityName,
          county: addressDetail.regionName,
          addressDetail: addressDetail.detailAddress,
          areaCode: areaCode,
          isDefault: !!addressDetail.defaultFlag
        };
      }
    });

    const onSave = async (content: any) => {
      const params: any = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0
      };
      if (state.type === 'edit') {
        params.addressId = state.addressId;
      }
      const data: any = await state.type === 'add' ? Api.Address.addAddress(params) : Api.Address.editAddress(params);
      if (data) {
        ToastUtil.success('保存成功');
        setTimeout(() => {
          router.back();
        }, 1000);
      }
    };

    const onDelete = async () => {
      await Api.Address.deleteAddress(state.addressId);
      ToastUtil.success('删除成功');
      setTimeout(() => {
        router.back();
      }, 1000);
    };

    return {
      ...toRefs(state),
      onSave,
      onDelete
    };
  }
});
