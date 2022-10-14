
const Languages = [
  {
    text: '中文',
    value: 'zh_CN'
  },
  {
    text: '英文',
    value: 'en_US'
  }
];

function getLanguages () {
  return Languages;
}

function getLanguageText (value: string) {
  const item = Languages.find(item => item.value === value);
  return item ? item.text : '';
}

function getLanguageValueByText (text: string) {
  const item = Languages.find(item => item.text === text);
  return item ? item.value : '';
}

export default {
  getLanguages,
  getLanguageText,
  getLanguageValueByText
};
