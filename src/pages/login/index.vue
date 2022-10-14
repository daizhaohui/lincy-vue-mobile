<template>
  <div class="login">
    <page-wrapper
      title="登录"
      :show-nav-bar="true"
      :disabled-pull-refesh="true"
      :disable-load-more="true"
      class-names="login"
    >
      <img
        class="logo"
        :src="Logo"
      >
      <div
        v-if="type == 'login'"
        class="login-body login"
      >
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="verify"
            center
            clearable
            label="验证码"
            placeholder="输入验证码"
          >
            <template #button>
              <image-verify ref="verifyRef" />
            </template>
          </van-field>
          <div style="margin: 16px;">
            <div
              class="link-register"
              @click="toggle('register')"
            >
              立即注册
            </div>
            <van-button
              round
              block
              color="#1baeae"
              native-type="submit"
            >
              登录
            </van-button>
          </div>
        </van-form>
      </div>
      <div
        v-else
        class="login-body register"
      >
        <van-form @submit="onSubmit">
          <van-field
            v-model="username1"
            name="username1"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password1"
            type="password"
            name="password1"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="verify"
            center
            clearable
            label="验证码"
            placeholder="输入验证码"
          >
            <template #button>
              <image-verify ref="verifyRef" />
            </template>
          </van-field>
          <div style="margin: 16px;">
            <div
              class="link-login"
              @click="toggle('login')"
            >
              已有登录账号
            </div>
            <van-button
              round
              block
              color="#1baeae"
              native-type="submit"
            >
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
