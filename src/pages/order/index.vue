<template>
  <div class="order-wrapper">
    <page-wrapper
      title="我的订单"
      :top-status="topStatus"
      :bottom-status="bottomStatus"
      :header-height="43"
      @top-load="onTopLoad"
      @bottom-load="onBottomLoad"
    >
      <template #header>
        <van-tabs
          v-model="status"
          :color="'#1baeae'"
          :title-active-color="'#1baeae'"
          class="order-tab"
          @click="onChangeTab"
        >
          <van-tab
            title="全部"
            name=""
          />
          <van-tab
            title="待付款"
            name="0"
          />
          <van-tab
            title="待确认"
            name="1"
          />
          <van-tab
            title="待发货"
            name="2"
          />
          <van-tab
            title="已发货"
            name="3"
          />
          <van-tab
            title="交易完成"
            name="4"
          />
        </van-tabs>
      </template>
      <div
        v-for="item in list"
        :key="item.orderNo"
        class="order-item-box"
        @click="goTo(item.orderNo)"
      >
        <div class="order-item-header">
          <span>订单时间：{{ $Formaters.dateToMinute(item.createTime) }}</span>
          <span>{{ item.orderStatusString }}</span>
        </div>
        <van-card
          v-for="one in item.newMallOrderItems"
          :key="one.orderId"
          :num="one.goodsCount"
          :price="one.sellingPrice"
          desc="全场包邮"
          :title="one.goodsName"
          :thumb="$Filters.prefix(one.goodsCoverImg)"
        />
      </div>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
