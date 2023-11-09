<script lang="ts" setup>
  import { toRefs, computed } from 'vue'
  import type { IProduct } from '@/services/interfaces'
  import CartIcon from '@/components/icons/CartIcon.vue'

  interface IProps {
    product: IProduct
  }

  const props = defineProps<IProps>()
  const { product } = toRefs(props)
  
  const emit = defineEmits<{
    'open-card': [number],
    'add-to-cart': [number]
  }>()

  const price = computed(() => '$' + product.value.price)
</script>

<template>
  <article class="card" @click="emit('open-card', product.id)">
    <div class="card__head">
      <img 
        :src="product.image" 
        class="card__head-image"
        width="320" 
        height="355"
        loading="lazy" 
        alt="Product image"
      />
    </div>
    <div class="card__body">
      <p class="card__body-title global-multiline-clip">
        {{ product.title }}
      </p>
      <p class="card__body-text global-multiline-clip">
        {{ product.description }}
      </p>
    </div>
    <div class="card__actions">
      <span class="card__actions-price">{{ price }}</span>
      <button class="card__actions-cart" @click.stop="emit('add-to-cart', product.id)">
        <cart-icon />
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
  .card {
    border-radius: 16px;
    background-color: $color-light;
    padding: 12px;
    cursor: pointer;
    position: relative;
    transition: 0.2s;

    &:hover {
      background-color: rgba( $color-primary, 0.1);
    }

    @media screen and (min-width: $breakpoint-sm) {
      padding: 16px;
    }
    @media screen and (min-width: $breakpoint-md) {
      padding: 20px;
    }

    &__head {
      background-color: $color-white;
      border-radius: 20px;
      padding: 12px;

      @media screen and (min-width: $breakpoint-sm) {
        padding: 16px;
      }

      &-image {
        --full-height: 150px;
        min-height: var(--full-height);
        max-height: var(--full-height);
        max-width: 100%;
        height: 100%;
        object-fit: contain;
        margin-inline: auto;

        @media screen and (min-width: $breakpoint-sm) {
          --full-height: 250px;
        }
        @media screen and (min-width: $breakpoint-md) {
          --full-height: 350px;
        }
      }
    }
    &__body {
      margin-top: 16px;

      &-title {
        --max-lines-clip: 1;
        --line-height: 16px;
        line-height: var(--line-height);
        font-size: 16px;
        font-weight: 500;

        @media screen and (min-width: $breakpoint-sm) {
          --max-lines-clip: 2;
          --line-height: 20px;
          font-size: 20px;
        }
      }
      &-text {
        --max-lines-clip: 2;
        font-size: 14px;
        margin-top: 4px;

        @media screen and (min-width: $breakpoint-sm) {
          margin-top: 12px;
          --max-lines-clip: 3;
        }
      }
    }
    &__actions {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      margin-top: 16px;
      row-gap: 4px;

      @media screen and (min-width: $breakpoint-sm) {
        margin-top: 24px;
        flex-direction: row;
        align-items: center;
        row-gap: 0;
      }

      &-price {
        color: $color-primary;
        font-size: 24px;
        font-weight: 500;
      }
      &-cart {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        border: none;
        padding: 8px;
        background-color: rgba($color-black, 0.02);
        transition: 0.3s;
        cursor: pointer;
        width: 100%;
        height: 40px;

        &:hover {
          background-color: rgba($color-black, 0.1);
        }

        @media screen and (min-width: $breakpoint-sm) {
          width: 100px;
        }
      }
    }
  }
</style>
