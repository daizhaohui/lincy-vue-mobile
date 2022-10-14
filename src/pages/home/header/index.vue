<template>
  <div
    v-show="visible"
    class="home-header"
    style="z-index:9999"
  >
    <div class="header-content">
      <div class="left">
        <van-icon
          name="bars"
          :size="$rem(20).toString()"
          @click="showMenu"
        />
      </div>
      <div
        class="header-search"
        @click="onSearch"
      >
        <div class="app-name">
          XX商城
        </div>
        <div class="search-title">
          山河无恙，人间皆安
        </div>
      </div>
      <div
        v-if="!$States.UserInfo.token"
        class="right"
        @click="onLogin"
      >
        <span>登录</span>
      </div>
      <div
        v-else
        class="login-right"
        @click="onRightClick"
      >
        <van-icon
          name="user-o"
        />
      </div>
    </div>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
