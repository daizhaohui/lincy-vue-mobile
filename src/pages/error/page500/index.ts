import { defineComponent, useRoute, ref } from '@lincy-vue/core';

export default defineComponent({
  components: {},
  setup () {
    const errorDescription = ref('');
    const route = useRoute();
    errorDescription.value = `对不起, 服务器出错啦:${route.query.error || ''}`;

    const onBack = () => {
      window.history.back(-1);
    };

    return {
      onBack,
      errorDescription
    };
  }
});
