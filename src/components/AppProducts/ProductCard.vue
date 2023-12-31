<script lang="ts" setup>
  import { toRefs, computed } from 'vue'
  import type { IProduct } from '@/services/interfaces'
  import CartIcon from '@/components/icons/CartIcon.vue'
  import StarIcon from '@/components/icons/StarIcon.vue';

  interface IProps {
    product: IProduct,
    cardIsFull?: boolean
  }

  const props = withDefaults(defineProps<IProps>(), {
    cardIsFull: false
  })
  const { product, cardIsFull } = toRefs(props)
  
  const emit = defineEmits<{
    'click': [IProduct],
    'add-to-cart': [number]
  }>()

  const price = computed(() => '$' + product.value.price)
</script>

<template>
  <article 
    :class="['card', { 'card-full': cardIsFull }]" 
    @click="emit('click', product)"
  >
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
    <div class="card-aside">
      <div class="card__body">
        <p :class="['card__body-title', { 'global-multiline-clip': !cardIsFull }]">
          {{ product.title }}
        </p>
        <p :class="['card__body-text', { 'global-multiline-clip': !cardIsFull }]">
          {{ product.description }}
        </p>
      </div>
      <div class="card__rating">
        <div class="rate">
          <star-icon /> 
          {{ product.rating?.rate ?? 0 }}
        </div>
        <div class="count">
          Оценок:
          {{ product.rating?.count ?? 0 }}
        </div>
      </div>
      <div class="card__actions">
        <span class="card__actions-price">{{ price }}</span>
        <button class="card__actions-cart" @click.stop="emit('add-to-cart', product.id)">
          <cart-icon />
        </button>
      </div>
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
    &__rating {
      margin-top: 20px;
      display: none;
      gap: 20px;
      align-items: center;

      .rate {
        display: flex;
        align-items: center;
        gap: 8px;
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

    &-full {
      background-color: transparent;
      display: flex;
      flex-direction: column;
      height: 550px;
      overflow-y: auto;

      &:hover {
        background-color: transparent;
      }

      @media screen and (min-width: $breakpoint-md) {
        flex-direction: row;
      }
      .card-aside {
        width: 100%;

        @media screen and (min-width: $breakpoint-md) {
          width: 50%;
        }
      }
      .card__rating {
        display: flex;
      }
    }
  }
</style>
