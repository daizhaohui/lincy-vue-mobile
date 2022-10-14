import { defineComponent, useEmitter } from '@lincy-vue/core';
import { GlobalEvents } from '@/model/consts';

export default defineComponent({
  components: {
  },
  props: {
  },
  setup () {
    const onShowDrawer = () => {
      const emitter = useEmitter();
      emitter.emit(GlobalEvents.OnToggleDrawer);
    };
    return {
      onShowDrawer
    };
  }
});
