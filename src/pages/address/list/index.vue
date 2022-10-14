<template>
  <div class="address-wrapper">
    <page-wrapper
      title="地址管理"
      :disable-load-more="true"
    >
      <div class="address-item">
        <van-address-list
          v-if="state.from != 'mine'"
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
        <van-address-list
          v-else
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
