import { defineComponent, reactive, toRefs } from '@lincy-vue/core';
import Theme from '@/utils/dictionary/theme';
import Language from '@/utils/dictionary/language';
import GlobalStates from '@/state';
import DrawerLayout from '@/components/drawerLayout';

const SettingItemNames = {
  Language: 'language',
  Theme: 'theme'
};

interface IState{
  type: string
  showPicker: boolean
  languageColumns: string[]
  themeColumns: string[]
  currentTheme: {
    text: string
    value: string
  }
  currentLanguage: {
    text: string
    value: string
  }
}

export default defineComponent({
  components: {
    DrawerLayout
  },
  props: {

  },
  setup (props) {
    const Languages = Language.getLanguages();
    const Themes = Theme.getThemes();
    const state: IState = reactive({
      type: '',
      showPicker: false,
      languageColumns: Languages.map(item => item.text),
      themeColumns: Themes.map(item => item.text),
      currentTheme: {
        text: Theme.getThemeText(GlobalStates.Settings.currentTheme),
        value: GlobalStates.Settings.currentTheme
      },
      currentLanguage: {
        text: Language.getLanguageText(GlobalStates.Settings.currentLanguage),
        value: GlobalStates.Settings.currentLanguage
      }
    });

    const onSwitchLanguage = () => {
      state.type = SettingItemNames.Language;
      state.showPicker = true;
    };

    const onSwitchTheme = () => {
      state.type = SettingItemNames.Theme;
      state.showPicker = true;
    };

    const onLanguageConfirm = (text: string) => {
      state.currentLanguage.text = text;
      state.currentLanguage.value = Language.getLanguageValueByText(text);
      GlobalStates.Settings.currentLanguage = state.currentLanguage.value;
      state.showPicker = false;
      window.location.reload();
    };

    const onThemeConfirm = (text: string) => {
      state.currentTheme.text = text;
      state.currentTheme.value = Theme.getThemeValueByText(text);
      GlobalStates.Settings.currentTheme = state.currentTheme.value;
      state.showPicker = false;
      window.location.reload();
    };

    return {
      ...toRefs(state),
      onSwitchLanguage,
      onSwitchTheme,
      onThemeConfirm,
      onLanguageConfirm
    };
  }
});
