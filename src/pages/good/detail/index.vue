<template>
  <div class="good-detail-wrapper">
    <page-wrapper
      title="商品详情"
      :load-more-options="{disableBottom:true}"
      :top-status="topStatus"
      @top-load="onTopLoad"
    >
      <template #nav-right>
        <van-icon
          name="ellipsis"
          size="20"
        />
      </template>
      <div class="detail-content">
        <div class="detail-swipe-wrap">
          <van-swipe
            class="my-swipe"
            indicator-color="#1baeae"
          >
            <van-swipe-item
              v-for="(item, index) in detail.goodsCarouselList"
              :key="index"
            >
              <img
                :src="item"
              >
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="good-info">
          <div class="good-title">
            {{ detail.goodsName || '' }}
          </div>
          <div class="good-desc">
            免邮费 顺丰快递
          </div>
          <div class="good-price">
            <span>{{ detail.sellingPrice? $Formaters.money(detail.sellingPrice) : '' }}</span>
          <!-- <span>库存203</span> -->
          </div>
        </div>
        <div class="good-intro">
          <ul>
            <li>概述</li>
            <li>参数</li>
            <li>安装服务</li>
            <li>常见问题</li>
          </ul>
          <div
            class="good-content"
            v-html="detail.goodsDetailContent || ''"
          />
        </div>
      </div>
      <van-action-bar>
        <van-action-bar-icon
          icon="chat-o"
          text="客服"
        />
        <van-action-bar-icon
          icon="cart-o"
          :badge="!count ? '' : count"
          text="购物车"
          @click="goTo"
        />
        <van-action-bar-button
          type="warning"
          text="加入购物车"
          @click="handleAddCart"
        />
        <van-action-bar-button
          type="danger"
          text="立即购买"
          @click="goToCart"
        />
      </van-action-bar>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
