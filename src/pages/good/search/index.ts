import { defineComponent, toRefs, reactive } from '@lincy-vue/core';
import { LoadMoreBottomStatus, LoadMoreTopStatus } from '@/model/consts';
import GoodSearch from '@/assets/images/good-search.png';

export default defineComponent({
  components: {
  },
  setup () {
    const state = reactive({
      loading: false,
      topStatus: LoadMoreTopStatus.Default,
      bottomStatus: LoadMoreBottomStatus.Default,
      orderBy: '',
      list: [],
      value: ''
    });

    const onChangeTab = (name: string) => {
      state.orderBy = name;
    };

    const onSearch = () => {};

    return {
      ...toRefs(state),
      GoodSearch,
      onChangeTab,
      onSearch
    };
  }
});
