const Themes = [
  {
    text: '默认',
    value: ''
  },
  {
    text: '暗色',
    value: 'dark'
  },
  {
    text: '亮色',
    value: 'light'
  }
];

function getThemes () {
  return Themes;
}

function getThemeText (value: string) {
  const item = Themes.find(item => item.value === value);
  return item ? item.text : '';
}

function getThemeValueByText (text: string) {
  const item = Themes.find(item => item.text === text);
  return item ? item.value : '';
}

export default {
  getThemes,
  getThemeText,
  getThemeValueByText
};
