import GlobalState from '@/state';

export default {
  beforeEach (to: any) {
    // 页面访问授权判断,如有配置中设置meta.auth表示要判断访问权限
    if (to.meta?.auth) {
      // 需要授权，判断用户token是否存在，不存在跳转登录
      if (!GlobalState.UserInfo.token) {
        return {
          name: 'login'
        };
      }
    }
    return true;
  }

};
