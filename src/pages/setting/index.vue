<template>
  <div class="setting-wrapper">
    <page-wrapper
      :title="$t('setting.title')"
      :disable-load-more="true"
      :on-back="handleOnBack"
    >
      <template #nav-right>
        <van-icon
          name="ellipsis"
          size="20"
        />
      </template>
      <ul class="setting-list">
        <li
          class="van-hairline--bottom"
          @click="onSwitchLanguage"
        >
          <div>{{ $t('setting.language') }}</div>
          <div>
            <span class="content">{{ currentLanguage.text }}</span>
            <van-icon name="arrow" />
          </div>
        </li>
        <li
          class="van-hairline--bottom"
          @click="onSwitchTheme"
        >
          <span>{{ $t('setting.theme') }}</span>
          <div>
            <span class="content">{{ currentTheme.text }}</span>
            <van-icon name="arrow" />
          </div>
        </li>
      </ul>
      <van-popup
        v-model:show="showPicker"
        round
        position="bottom"
      >
        <van-picker
          v-if="type==='language'"
          :columns="languageColumns"
          @cancel="showLanguagePicker = false"
          @confirm="onLanguageConfirm"
        />
        <van-picker
          v-if="type==='theme'"
          :columns="themeColumns"
          @cancel="showThemePicker = false"
          @confirm="onThemeConfirm"
        />
      </van-popup>
    </page-wrapper>
  </div>
</template>
<script src="./index.ts" lang="ts"></script>
<style lang="less" scoped src='./index.less'></style>
