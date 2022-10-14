<template>
  <div class="about-wrapper">
    <page-wrapper
      :title="$t('my.about')"
      :disable-load-more="true"
    >
      <template #nav-right>
        <van-icon
          name="ellipsis"
          size="20"
        />
      </template>
      <div>
        about us
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
