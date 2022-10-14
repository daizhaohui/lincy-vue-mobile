<template>
  <div style="display:flex;align-items: center;justify-content: center;flex-direction: column;">
    <van-empty
      image="error"
      description="对不起, 您没有权限访问该页面."
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
