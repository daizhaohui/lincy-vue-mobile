import { Module, Observable, Action, Persist } from '@lincy-vue/core/state';
import { Themes } from '@/model/consts';

@Persist()
@Module('settings')
export default class SettingState {
  // 当前皮肤设置（整体风格)
  @Observable(Themes.Default)
  static currentTheme: string;

  // 当前语言
  @Observable('zh_CN')
  static currentLanguage: string;

  // 定义更新状态值方法
  @Action()
  static update () {}
}
