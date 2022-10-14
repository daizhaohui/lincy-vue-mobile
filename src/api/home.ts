import { useHttp } from '@lincy-vue/core';
const { Http } = useHttp();

export default class HomeApi {
  // 获取机构树
  @Http('/index-infos')
  static async getHome (): Promise<any> { }
}
