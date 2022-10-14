declare interface Window {
  ActiveXObject: any
  addEventListener: (...args: any[]) => any
}

declare module '*.vue' {
  import Vue from '@lincy-vue/core';
  export default Vue;
}

declare module '*.less' {
  const css: { [key: string]: string };
  export default css;
}

declare module '*.webp';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.ttf';
declare module '*.eot';
declare module '*.woff2';
