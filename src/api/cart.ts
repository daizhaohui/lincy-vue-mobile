// import { useHttp } from '@lincy-vue/core';
// const { Http, HttpMethod } = useHttp();

export default class ProductApi {
  // @Http('/shop-cart', HttpMethod.Post)
  static async addCart (data: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      resolve({ resultCode: 200 });
    });
  }
}
