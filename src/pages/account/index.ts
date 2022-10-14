import { defineComponent, reactive, toRefs, onBeforeMount, useRouter } from '@lincy-vue/core';
import md5 from '@lincy-js/utils/md5';
import ToastUtil from '@/utils/toast';
import GlobaleStates from '@/state';
import { reset } from '@lincy-vue/core/state';
import { IRouterService } from '@lincy-vue/core/types';

export default defineComponent({
  components: {
  },
  props: {

  },
  setup () {
    const router: IRouterService = useRouter();
    const state = reactive({
      nickName: '',
      introduceSign: '',
      password: ''
    });

    // 覆盖导航栏默认的回退方法
    const handleOnBack = () => {
      // 刷新页面
      router.push('me');
    };

    const onSave = async () => {
      const params: any = {
        introduceSign: state.introduceSign,
        nickName: state.nickName
      };
      if (state.password) {
        params.passwordMd5 = md5(state.password);
      }
      await new Promise<void>((resolve, reject) => {
        resolve();
      });
      ToastUtil.success('保存成功');
    };

    const onLogout = () => {
      // 重置
      reset(GlobaleStates.UserInfo);
      router.push('login');
    };

    const loadData = () => {
      ToastUtil.loading();
      setTimeout(() => {
        state.nickName = 'admin';
        state.password = 'admin';
        state.introduceSign = '一切皆有可能';
        ToastUtil.clear();
      }, 600);
    };

    onBeforeMount(() => {
      loadData();
    });

    return {
      ...toRefs(state),
      handleOnBack,
      onSave,
      onLogout
    };
  }
});
