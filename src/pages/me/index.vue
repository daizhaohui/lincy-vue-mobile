<template>
  <div class="user-wrapper">
    <page-wrapper
      :title="$t('home.my')"
      :left-arrow="false"
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
      <van-skeleton
        title
        :avatar="true"
        :row="3"
        :loading="loading"
      >
        <div class="user-info">
          <div class="info">
            <img :src="DefaultAavator">
            <div class="user-desc">
              <span>{{ $t('my.nick') }}: {{ user.nickName }}</span>
              <span>{{ $t('my.loginName') }}: {{ user.loginName }}</span>
              <span class="name">{{ $t('my.sign') }}: {{ user.introduceSign }}</span>
            </div>
          </div>
        </div>
      </van-skeleton>
      <ul class="user-list">
        <li
          class="van-hairline--bottom"
          @click="goTo('order')"
        >
          <span>{{ $t('my.order') }}</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="goTo('account')"
        >
          <span>{{ $t('my.account') }}</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="goTo('address', { from: 'me' })"
        >
          <span>{{ $t('my.address') }}</span>
          <van-icon name="arrow" />
        </li>
        <li @click="goTo('about')">
          <span>{{ $t('my.about') }}</span>
          <van-icon name="arrow" />
        </li>
        <li @click="goTo('setting')">
          <span>{{ $t('my.setting') }}</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
