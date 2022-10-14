<template>
  <div
    ref="refThis"
    class="custom-loadmore"
  >
    <div
      ref="refContent"
    >
      <div
        v-show="!disableTop && topText"
        class="custom-loadmore-header"
      >
        <van-loading
          type="spinner"
          size="20"
          color="#000"
        />
        <span>{{ topText }}</span>
      </div>
      <slot />
      <div
        v-show="!disableBottom && bottomText"
        class="custom-loadmore-footer"
        @click="onBottomErrorClick"
      >
        <van-loading
          v-if="bottomStatus !== 'error' && bottomStatus !== 'nodata'"
          type="spinner"
          color="#000"
          size="20"
        />
        <span>{{ bottomText }}</span>
      </div>
    </div>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
