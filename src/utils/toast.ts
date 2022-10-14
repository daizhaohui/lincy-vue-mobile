import { Toast } from 'vant';

export default class ToastUtil {
  static loading (message?: string) {
    Toast.loading({
      message: message ?? '正在加载...',
      forbidClick: true
    });
  }

  static clear () {
    Toast.clear();
  }

  static fail (message: string) {
    Toast.fail(message);
  }

  static success (message: string) {
    Toast.success(message);
  }
}
