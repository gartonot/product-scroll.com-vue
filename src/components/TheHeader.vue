<script lang="ts" setup>
  import StarIcon from '@/components/icons/StarIcon.vue'
</script>

<template>
  <header class="header header_scroll">
    <a href="/" class="header__logo">
      <star-icon class="header__logo-icon" />
      Products scroll
    </a>

  </header>
</template>

<style lang="scss" scoped>
  .header {
    z-index: $index-1;
    position: fixed;
    width: 100%;
    min-height: 80px;
    max-height: 120px;
    background: $color-primary;
    color: $color-white;
    transition: 0.2s ease;
    display: flex;
    justify-content: center;
    padding-block: 25px;

    &__logo {
      color: $color-white;
      text-decoration: none;
      display: flex;
      flex-direction: column;

      &-icon {
        width: 100%;
        height: auto;
        min-height: 20px;
      }
    }
  }
</style>