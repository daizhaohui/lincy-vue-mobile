<template>
  <div style="display:flex;align-items: center;justify-content: center;flex-direction: column;">
    <van-empty image="error" :description="errorDescription" />
    <van-button type="primary" :style="{marginTop:$rem(30)+'rem'}" @click="onBack">
      返回
    </van-button>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
