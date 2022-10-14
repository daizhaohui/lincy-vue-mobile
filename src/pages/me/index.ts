import { defineComponent, reactive, toRefs, onBeforeMount, useRouter } from '@lincy-vue/core';
import DefaultAavator from '@/assets/images/default-avator.png';
import { IRouterService } from '@lincy-vue/core/types';

interface IUser {
  nickName: string
  loginName: string
  introduceSign: string
}

export default defineComponent({
  components: {
  },
  props: {

  },
  setup (props) {
    const router: IRouterService = useRouter();
    const state: any = reactive({
      loading: false
    });
    const user: IUser = reactive({
      nickName: '',
      loginName: '',
      introduceSign: ''
    });

    const loadData = () => {
      state.loading = true;
      setTimeout(() => {
        user.nickName = 'admin';
        user.loginName = 'admin';
        user.introduceSign = '一切皆有可能';
        state.loading = false;
      }, 1500);
    };

    const goTo = (name: string, query: any) => {
      if (query) {
        router.push({
          name,
          query
        });
      } else {
        router.push(name);
      }
    };

    onBeforeMount(() => {
      loadData();
    });

    return {
      ...toRefs(state),
      DefaultAavator,
      user,
      goTo
    };
  }
});
