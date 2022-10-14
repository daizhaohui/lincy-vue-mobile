<template>
  <div class="user-wrapper">
    <page-wrapper
      :header-height="50"
      :top-status="topStatus"
      :bottom-status="bottomStatus"
    >
      <template #nav-right>
        <van-button
          round
          type="primary"
          block
          size="small"
          @click="onSearch"
        >
          搜索
        </van-button>
      </template>
      <template #nav-title>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </template>
      <template #header>
        <div style="padding-top:16px;">
          <van-tabs
            type="card"
            color="#1baeae"
            @click="onChangeTab"
          >
            <van-tab
              title="推荐"
              name=""
            />
            <van-tab
              title="新品"
              name="new"
            />
            <van-tab
              title="价格"
              name="price"
            />
          </van-tabs>
        </div>
      </template>
      <div class="content">
        <van-empty
          :image="GoodSearch"
          description="搜索想要的商品"
        />
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
