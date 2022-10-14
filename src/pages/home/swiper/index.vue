<template>
  <div class="my-swipe">
    <van-swipe
      :autoplay="3000"
      indicator-color="#1baeae"
      :style="{height: $rem(200).toString()}"
    >
      <van-swipe-item
        v-for="item in list"
        :key="item.carouselUrl"
      >
        <img
          :src="item.carouselUrl"
          @click="goTo(item.redirectUrl)"
        >
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
