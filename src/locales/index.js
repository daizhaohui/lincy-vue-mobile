/* eslint-disable camelcase */
import en_US from './en_US.json';
import zh_CN from './zh_CN.json';

const langs = { en_US, zh_CN };
window.__lincy_vue__.lang = { items: langs, current: '' };

export default langs;
