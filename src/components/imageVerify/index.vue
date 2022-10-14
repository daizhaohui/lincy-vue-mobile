<template>
  <div class="img-verify">
    <canvas
      ref="verify"
      :width="width"
      :height="height"
      @click="handleDraw"
    />
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
