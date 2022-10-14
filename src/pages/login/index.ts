import { defineComponent, ref, reactive, useRouter, toRefs } from '@lincy-vue/core';
import Logo from '@/assets/images/logo.png';
import ImageVerify from '@/components/imageVerify';
import Toast from '@/utils/toast';
import GlobalState from '@/state';
import { IRouterService } from '@lincy-vue/core/types';
// import md5 from '@lincy-js/utils/md5';
// import Api from '@/api';

export default defineComponent({
  components: {
    ImageVerify
  },
  setup () {
    const verifyRef: any = ref(null);
    const router: IRouterService = useRouter();
    const state = reactive({
      username: '',
      password: '',
      username1: '',
      password1: '',
      type: 'login',
      imgCode: '',
      verify: ''
    });

    // 切换登录和注册两种模式
    const toggle = (v: string) => {
      state.type = v;
      state.verify = '';
    };

    // 提交登录或注册表单
    const onSubmit = async (values: any) => {
      state.imgCode = verifyRef.value.imgCode || '';
      if (state.verify.toLowerCase() !== state.imgCode.toLowerCase()) {
        Toast.fail('验证码有误');
        return;
      }
      if (state.type === 'login') {
        // const { data } = await Api.User.login({
        //   loginName: values.username,
        //   passwordMd5: md5(values.password)
        // });
        // 调用登录接口
        GlobalState.UserInfo.updateUser({
          token: '123456', // res.data.data
          userId: values.username,
          userName: values.username,
          permissions: []
        });
        router.push('home');
      } else {
        Toast.success('注册成功');
        state.type = 'login';
        state.verify = '';
      }
    };

    return {
      verifyRef,
      Logo,
      ...toRefs(state),
      toggle,
      onSubmit
    };
  }
});
