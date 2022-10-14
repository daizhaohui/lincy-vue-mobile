<template>
  <drawer-layout
    ref="drawer"
    :show-drawer="showDrawer"
    :content-drawable="true"
    @mask-click="onMaskClick"
  >
    <template #drawer>
      <drawer-content />
    </template>
    <template #content>
      <div>
        <div
          ref="refRouterPage"
          class="router-page"
          :style="contentStyle"
        >
          <router-view
            v-slot="{ Component, route }"
            class="router-view"
          >
            <transition
              :name="route.meta && route.meta.transition || 'fade'"
              mode="out-in"
            >
              <keep-alive
                v-if="(!route.meta || route.meta.keepAlive!==false)"
              >
                <component
                  :is="Component"
                  :key="getCacheKey(route)"
                />
              </keep-alive>
            </transition>
          </router-view>
        </div>
        <div ref="refTabbar">
          <van-tabbar
            v-model="activedTabIndex"
            :fixed="true"
            @change="onTabChanage"
          >
            <van-tabbar-item icon="home-o">
              {{ $t('home.home') }}
            </van-tabbar-item>
            <van-tabbar-item icon="points">
              {{ $t('home.category') }}
            </van-tabbar-item>
            <van-tabbar-item
              icon="chat-o"
              dot
            >
              {{ $t('home.message') }}
            </van-tabbar-item>
            <van-tabbar-item
              icon="shopping-cart-o"
              :badge="shoppingCartBadge"
            >
              {{ $t('home.cart') }}
            </van-tabbar-item>
            <van-tabbar-item icon="user-o">
              {{ $t('home.my') }}
            </van-tabbar-item>
          </van-tabbar>
        </div>
      </div>
    </template>
  </drawer-layout>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
