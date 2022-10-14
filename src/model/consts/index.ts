import { BottomStatus, TopStatus } from '@/components/loadMore/status';

// 皮肤
const Themes = {
  Default: '',
  Dark: 'dark',
  Light: 'light'
};

const LoadMoreTopStatus = TopStatus;
const LoadMoreBottomStatus = BottomStatus;
// 自定义的全局事件名
const GlobalEvents = {
  // 菜单点击事件
  OnToggleDrawer: 'toggleDrawer'
};

export {
  Themes,
  LoadMoreTopStatus,
  LoadMoreBottomStatus,
  GlobalEvents
};
