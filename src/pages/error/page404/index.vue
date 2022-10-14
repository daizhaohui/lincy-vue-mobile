<template>
  <div style="display:flex;align-items: center;justify-content: center;flex-direction: column;">
    <van-empty
      image="error"
      description="对不起, 您访问的页面不存在."
    />
    <van-button
      type="primary"
      :style="{marginTop:$rem(30).toString()}"
      @click="onBack"
    >
      返回
    </van-button>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
