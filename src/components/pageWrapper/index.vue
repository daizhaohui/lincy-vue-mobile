<template>
  <div>
    <div>
      <van-nav-bar
        v-show="showNavBar"
        :safe-area-inset-top="true"
        :border="true"
        :left-arrow="leftArrow"
        :fixed="fixed"
        :title="title"
        :disable-load-more="disableLoadMore"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template
          v-for="slot in navBarSlotNames"
          #[slot]
        >
          <slot
            :name="`nav-${slot}`"
          />
        </template>
      </van-nav-bar>
    </div>
    <div :style="headerStyle">
      <slot name="header" />
    </div>
    <div :style="contentStyle">
      <load-more
        v-bind="loadMoreProps"
        :top-status="topStatus"
        :bottom-status="bottomStatus"
        @top-load="onTopLoad"
        @bottom-load="onBottomLoad"
        @more-scroll="onMoreScroll"
      >
        <slot />
      </load-more>
    </div>
    <div :style="footerStyle">
      <slot name="footer" />
    </div>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
