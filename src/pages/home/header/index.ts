import { defineComponent, useRouter, useEmitter } from '@lincy-vue/core';
import { GlobalEvents } from '@/model/consts';
import { IRouterService, Emitter } from '@lincy-vue/core/types';

export default defineComponent({
  components: {
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const router: IRouterService = useRouter();

    const showMenu = () => {
      const emitter: Emitter = useEmitter();
      emitter.emit(GlobalEvents.OnToggleDrawer);
    };

    const onLogin = () => {
      router.push('login');
    };

    const onRightClick = () => {
      router.push('me');
    };

    const onSearch = () => {
      router.push('search');
    };

    return {
      showMenu,
      onLogin,
      onSearch,
      onRightClick
    };
  }
});
