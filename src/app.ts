
import appConfig from './app.config';
import root from './app.vue';
import './locales/index.js';
import './mock';
import { createApp } from '@lincy-vue/core';
import components from './config/components';
import GComponents from '@/components';
import Filters from '@/utils/filters';
import Formaters from '@/utils/formaters';
import States from '@/state';
import * as Consts from './model/consts';

const options: any = {
  appConfig,
  components: [],
  rootComponent: root
};
const app = createApp(options);

// 按需引入vant组件
const comps: any = components;
Object.keys(comps).forEach(key => {
  app.use(comps[key]);
});

// 注册全局组件
const gComponents: any = GComponents;
Object.keys(gComponents).forEach(name => {
  app.component(name, gComponents[name]);
});

// 注册全局过滤函数
app.registerGlobalService('Filters', Filters);
// 注册全局格式化器
app.registerGlobalService('Formaters', Formaters);
// 注册常量 $Consts.[名称]
app.registerGlobalService('Consts', Consts);

// 注册全局状态: $States.[名称]
const globalStates: any = {};
const states: any = States;
for (const key in states) {
  globalStates[key] = states[key];
}
app.registerGlobalService('States', globalStates);

app.mount('#app');
