// import { useHttp } from '@lincy-vue/core';
// const { Http } = useHttp();
import LocalStorage from '@lincy-vue/core/state/localStorage';

let id = 1;
export default class AddressApi {
  static async getAddressList (): Promise<any> {
    return await new Promise((resolve, reject) => {
      const list = LocalStorage.getJSON('_address_');
      setTimeout(() => {
        resolve(list || []);
      }, 1000);
    });
  }

  static async getAddressDetail (addressId: string) {
    return await new Promise((resolve: any, reject: any) => {
      const list = LocalStorage.getJSON('_address_') || [];
      const address = list.find((item: any) => item.addressId + '' === addressId);
      setTimeout(() => {
        resolve(address);
      }, 1000);
    });
  }

  static async addAddress (address: any): Promise<any> {
    return await new Promise((resolve: any, reject: any) => {
      const list = LocalStorage.getJSON('_address_') || [];
      id = id + 1;
      address.addressId = id;
      list.push(address);
      LocalStorage.set('_address_', JSON.stringify(list));
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async editAddress (address: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      const list = LocalStorage.getJSON('_address_') || [];
      const index = list.findIndex((item: any) => item.addressId + '' === address.addressId);
      list[index] = address;
      LocalStorage.set('_address_', JSON.stringify(list));
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async deleteAddress (addressId: string): Promise<any> {
    return await new Promise((resolve, reject) => {
      const list = LocalStorage.getJSON('_address_') || [];
      const index = list.find((item: any) => item.addressId + '' === addressId);
      list.splice(index, 1);
      LocalStorage.set('_address_', JSON.stringify(list));
      setTimeout(() => {
        resolve(list);
      }, 1000);
    });
  }
}
