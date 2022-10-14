<template>
  <div class="address-edit-wrapper">
    <page-wrapper
      :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"
      :disable-load-more="true"
    >
      <van-address-edit
        class="edit"
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="type == 'edit'"
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
