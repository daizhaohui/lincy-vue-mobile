<template>
  <div class="message-wrapper">
    <page-wrapper
      :title="$t('home.message')"
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
      <div> {{ $t('home.message') }} </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
