<template>
  <div class="cart-wrapper">
    <page-wrapper
      :title="$t('home.cart')"
      :disable-load-more="true"
    >
      <template #nav-left>
        <show-drawer-button />
      </template>
      <template #nav-right>
        <van-icon
          name="ellipsis"
          size="20"
        />
      </template>
      <div class="empty">
        <img
          class="empty-cart"
          :src="EmptyCardImage"
          alt="空购物车"
        >
        <div class="title">
          购物车空空如也
        </div>
        <van-button
          round
          color="#1baeae"
          type="primary"
          block
          @click="goTo"
        >
          前往选购
        </van-button>
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
