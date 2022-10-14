<template>
  <div class="account-wrapper">
    <page-wrapper
      title="账号管理"
      :load-more-options="{disableBottom:true,disableTop:true}"
      :on-back="handleOnBack"
    >
      <template #nav-right>
        <van-icon
          name="ellipsis"
          size="20"
        />
      </template>
      <div class="input-item">
        <van-field
          v-model="nickName"
          label="昵称"
        />
        <van-field
          v-model="introduceSign"
          label="个性签名"
        />
        <van-field
          v-model="password"
          type="password"
          label="修改密码"
        />
      </div>
      <van-button
        round
        class="save-btn"
        color="#1baeae"
        type="primary"
        block
        @click="onSave"
      >
        保存
      </van-button>
      <van-button
        round
        class="save-btn"
        color="#1baeae"
        type="primary"
        block
        @click="onLogout"
      >
        退出登录
      </van-button>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
