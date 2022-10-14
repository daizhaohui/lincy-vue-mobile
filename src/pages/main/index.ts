import { defineComponent, ref, useRouter, useRoute, onMounted, provide, onBeforeRouteUpdate, useEmitter, onUnmounted } from '@lincy-vue/core';
import DrawerLayout from '@/components/drawerLayout';
import DrawerContent from './drawerContent';
import { GlobalEvents } from '@/model/consts';
import { Emitter, IRouteLocationNormalized, IRouterService } from '@lincy-vue/core/types';

const routeNames = ['home', 'category', 'message', 'cart', 'me'];

export default defineComponent({
  components: {
    DrawerLayout,
    DrawerContent
  },
  setup () {
    const emitter: Emitter = useEmitter();
    const activedTabIndex = ref(0);
    const shoppingCartBadge = ref(3);
    const router: IRouterService = useRouter();
    const route: IRouteLocationNormalized = useRoute();
    const refTabbar = ref();
    const refRouterPage = ref();
    const contentStyle = ref('');
    const showDrawer = ref(false);

    const onTabChanage = (index: number) => {
      activedTabIndex.value = index;
      router.push(routeNames[index]);
    };

    const getCacheKey = (route: any) => {
      return route.name;
    };

    const setTabIndex = (r: any) => {
      const tabIndex = routeNames.indexOf(r.name);
      if (tabIndex !== -1) {
        activedTabIndex.value = tabIndex;
      }
    };

    provide('getPageContainerDom', () => {
      return refRouterPage.value;
    });

    const toggleDrawer = (visible: boolean) => {
      if (visible) {
        showDrawer.value = visible;
      } else {
        showDrawer.value = !showDrawer.value;
      }
    };

    const onMaskClick = () => {
      showDrawer.value = false;
    };

    onMounted(() => {
      setTabIndex(route);
      emitter.on(GlobalEvents.OnToggleDrawer, toggleDrawer);
    });

    onUnmounted(() => {
      emitter.off(GlobalEvents.OnToggleDrawer, toggleDrawer);
    });

    onBeforeRouteUpdate((to) => {
      setTabIndex(to);
      return true;
    });

    return {
      activedTabIndex,
      shoppingCartBadge,
      contentStyle,
      refTabbar,
      refRouterPage,
      showDrawer,
      onTabChanage,
      getCacheKey,
      onMaskClick
    };
  }
});
