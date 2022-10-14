<template>
  <div class="home">
    <page-wrapper
      :title="$t('home.home')"
      :show-nav-bar="showNavBar"
      :top-status="topStatus"
      :bottom-status="bottomStatus"
      @top-load="onTopLoad"
      @bottom-load="onBottomLoad"
      @more-scroll="onMoreScroll"
    >
      <template #nav-left>
        <show-drawer-button />
      </template>
      <template #nav-right>
        <div v-if="!$States.UserInfo.token">
          <van-button @click="onLogin">
            {{ $t('home.login') }}
          </van-button>
        </div>
      </template>
      <home-header :visible="showHeader" />
      <home-swiper :list="swiperList" />
      <div class="category-list">
        <div
          v-for="item in categoryList"
          :key="item.categoryId"
          @click="tips"
        >
          <img :src="item.imgUrl">
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="good">
        <header class="good-header">
          新品上线
        </header>
        <van-skeleton
          title
          :row="3"
          :loading="loading"
        >
          <div class="good-box">
            <div
              v-for="item in newGoodses"
              :key="item.goodsId"
              class="good-item"
              @click="goToDetail(item)"
            >
              <img
                :src="$Filters.prefix(item.goodsCoverImg)"
              >
              <div class="good-desc">
                <div class="title">
                  {{ item.goodsName }}
                </div>
                <div class="price">
                  {{ $Formaters.money(item.sellingPrice) }}
                </div>
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
      <div class="good">
        <header class="good-header">
          热门商品
        </header>
        <van-skeleton
          title
          :row="3"
          :loading="loading"
        >
          <div class="good-box">
            <div
              v-for="item in hots"
              :key="item.goodsId"
              class="good-item"
              @click="goToDetail(item)"
            >
              <img
                :src="$Filters.prefix(item.goodsCoverImg)"
                alt=""
              >
              <div class="good-desc">
                <div class="title">
                  {{ item.goodsName }}
                </div>
                <div class="price">
                  {{ $Formaters.money(item.sellingPrice) }}
                </div>
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
      <div
        class="good"
        :style="{ paddingBottom: '100px'}"
      >
        <header class="good-header">
          最新推荐
        </header>
        <van-skeleton
          title
          :row="3"
          :loading="loading"
        >
          <div class="good-box">
            <div
              v-for="item in recommends"
              :key="item.goodsId"
              class="good-item"
              @click="goToDetail(item)"
            >
              <img
                :src="$Filters.prefix(item.goodsCoverImg)"
                alt=""
              >
              <div class="good-desc">
                <div class="title">
                  {{ item.goodsName }}
                </div>
                <div class="price">
                  {{ $Formaters.money(item.sellingPrice) }}
                </div>
              </div>
            </div>
          </div>
        </van-skeleton>
      </div>
    </page-wrapper>
  </div>
</template>

<script src="./index.ts" lang="ts"></script>
<style lang="less" src='./index.less'></style>
