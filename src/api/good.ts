// import { useHttp } from '@lincy-vue/core';
// const { Http } = useHttp();

export default class ProductApi {
  // @Http('/goods/detail/:id')
  static async getDetail (options: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      const data = { resultCode: 200, message: 'SUCCESS', data: { goodsId: 10908, goodsName: 'HUAWEI Mate 40 Pro 全网通5G手机 8GB+512GB（黄色）', goodsIntro: '5nm麒麟9000旗舰芯片 | 超感光徕卡电影影象', goodsCoverImg: 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40-white.png', sellingPrice: 6488, tag: '跃见非凡', goodsCarouselList: ['https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40-white.png'], originalPrice: 6488, goodsDetailContent: '<p><img src="https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/mate40pro-detail.png" style="max-width:100%;"><br></p>' } };
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }
}
