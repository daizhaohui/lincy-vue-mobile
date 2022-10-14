import { useHttp } from '@lincy-vue/core';
const { Http, HttpMethod } = useHttp();

export default class ProductApi {
  @Http('/user/info')
  static async getUserInfo (): Promise<any> { }

  @Http('/user/info', HttpMethod.Put)
  static async updateUserInfo (): Promise<any> { }

  @Http('/user/login', HttpMethod.Post)
  static async login (): Promise<any> { }

  @Http('/user/logout', HttpMethod.Post)
  static async logout (): Promise<any> { }

  @Http('/user/register', HttpMethod.Post)
  static async register (): Promise<any> { }
}
