import Home from '@/pages/home/index.vue';
import Page404 from '@/pages/error/page404';
import Page500 from '@/pages/error/page500';
import Page403 from '@/pages/error/page403';
import Main from '@/pages/main';
import Login from '@/pages/login';
import Category from '@/pages/category';
import Me from '@/pages/me';
import Order from '@/pages/order';
import Account from '@/pages/account';
import Address from '@/pages/address/list';
import AddEditAddress from '@/pages/address/edit';
import Setting from '@/pages/setting';
import Cart from '@/pages/cart';
import About from '@/pages/about';
import GoodDetail from '@/pages/good/detail';
import Search from '@/pages/good/search';
import Message from '@/pages/message';

const routes = [
  {
    name: 'root',
    redirect: '/main/home',
    path: '/'
  },
  {
    name: 'login',
    component: Login,
    path: '/login'
  },
  {
    name: 'main',
    component: Main, // 主框架页面,在主框架中显示的页面路由，添加到其children中
    path: '/main',
    children: [
      {
        name: 'home', // 主页（名字设置为home）
        component: Home,
        path: 'home'
      },
      {
        name: 'category',
        component: Category,
        path: 'category'
      },
      {
        name: 'message',
        component: Message,
        path: 'message'
      },
      {
        name: 'me',
        component: Me,
        path: 'me',
        meta: {
          auth: true
        }
      },
      {
        name: 'cart',
        component: Cart,
        path: 'cart',
        meta: {
          auth: true
        }
      }
    ]
  },
  {
    name: 'order',
    component: Order,
    path: '/order',
    meta: {
      auth: true
    }
  },
  {
    name: 'account',
    component: Account,
    path: '/account',
    meta: {
      auth: true
    }
  },
  {
    name: 'address',
    component: Address,
    path: '/address',
    meta: {
      auth: true
    }
  },
  {
    name: 'addAddress',
    component: AddEditAddress,
    path: '/address/add',
    meta: {
      auth: true
    }
  },
  {
    name: 'editAddress',
    component: AddEditAddress,
    path: '/address/edit/:id',
    meta: {
      auth: true
    }
  },
  {
    name: 'setting',
    component: Setting,
    path: '/setting',
    meta: {
      auth: true
    }
  },
  {
    name: 'about',
    component: About,
    path: '/about'
  },
  {
    name: 'goodDetail',
    component: GoodDetail,
    path: '/good/detail/:id',
    meta: {
      auth: true
    }
  },
  {
    name: 'search',
    component: Search,
    path: '/good/search'
  },
  {
    name: 'page403',
    component: Page403,
    path: '/403'
  },
  {
    name: 'page500',
    component: Page500,
    path: '/500'
  },
  // 发在最后一个,没有匹配到以上的路由页面
  {
    name: 'page404',
    component: Page404,
    path: '/:pathMatch(.*)'
  }
];

export default routes;
