<template>
  <div
    ref="refContainer"
    class="drawer-layout"
  >
    <div
      class="drawer-wrap"
      :class="animateStyle"
      :style="drawerStyle"
    >
      <slot name="drawer" />
    </div>
    <div
      class="content-wrap"
      :class="contentDrawable ? animateStyle : {}"
      :style="contentDrawable ? contentStyle : {}"
    >
      <div
        v-show="backdrop && pos"
        class="drawer-mask"
        :style="{ opacity: backdropOpacity }"
        @click="onMaskClick"
      />
      <slot name="content" />
    </div>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
