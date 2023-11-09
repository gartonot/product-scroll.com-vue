<script lang="ts" setup>
  import { ref } from 'vue'
  import TheHeader from '@/components/TheHeader.vue'
  import AppProducts from '@/components/AppProducts/AppProducts.vue'

  const MIN_HEADER_HEIGHT = 80
  const MAX_HEADER_HEIGHT = 120
  let headerHeight = ref(MAX_HEADER_HEIGHT)

  addEventListener('wheel', function(event) {
    if(event.deltaY > 0 && headerHeight.value > MIN_HEADER_HEIGHT) {
      headerHeight.value -= 10
    } 
    if(event.deltaY < 0 && headerHeight.value < MAX_HEADER_HEIGHT && event.view?.scrollY < 400) {
      headerHeight.value += 10
    }
  })
</script>

<template>
  <div class="page">
    <the-header class="page__header" />
    <app-products class="page__products" />
  </div>
</template>

<style lang="scss" scoped>
  .page {
    &__header {
      height: calc(v-bind(headerHeight) * 1px);
    }
    &__products {
      padding-top: calc(v-bind(headerHeight) * 1px + 32px);
    }
  }
</style>
