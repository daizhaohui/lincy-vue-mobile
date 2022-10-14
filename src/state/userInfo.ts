import { Module, Observable, Action, Persist } from '@lincy-vue/core/state';

@Module('user')
@Persist()
export default class UserInfo {
  @Observable(false)
  static isSuperAdmin: boolean;

  @Observable('')
  static token: string;

  @Observable('')
  static userId: string;

  @Observable('')
  static userName: string;

  @Observable([])
  static permissions: [];

  @Action()
  static updateUser (data: any) {}
}
