import { defineComponent } from '@lincy-vue/core';

export default defineComponent({
  components: {
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup () {
    const goTo = (url: string) => {
      window.open(url);
    };

    return {
      goTo
    };
  }
});
