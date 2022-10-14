<template>
  <div class="category-wrapper">
    <page-wrapper
      :title="$t('home.category')"
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
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
