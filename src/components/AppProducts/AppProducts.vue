<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import type { IProduct } from '@/services/interfaces'
  import productsRepository from '@/services/repositories/products-repository'
  import ProductCard from '@/components/AppProducts/ProductCard.vue'
  import ProductCardFull from '@/components/AppProducts/ProductCardFull.vue'
  import AppModal from '@/components/ui/AppModal.vue'
  import AppLoader from '@/components/ui/AppLoader.vue'

  const products = ref<IProduct[]>([])
  const currentProduct = ref<IProduct>({})
  const cardModalIsOpen = ref(false)
  let isLoading = ref(false)

  onMounted(async () => {
    isLoading.value = true
    try {
      products.value = await productsRepository.fetchProducts() 
    } catch (error) {
      console.warn(error)
    }
    isLoading.value = false
  })

  const addToCart = (productId: number) => {
    console.log('Added to cart product id:', productId)
  }
  const openCard = (productId: number) => {
    modalOpen()
    currentProduct.value = products.value.find(({ id }) => id === productId)
  }
  const modalOpen = () => cardModalIsOpen.value = true
  const modalClose = () => cardModalIsOpen.value = false
</script>

<template>
  <div class="products">
    <div class="products__loading" v-if="isLoading">
      <app-loader />
    </div>
    <div v-else class="products__list">
      <product-card 
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="products__list-card"
        @add-to-cart="addToCart($event)"
        @open-card="openCard($event)"
      />
      <app-modal :modal-is-open="cardModalIsOpen" @modal-close="modalClose()">
        <product-card-full :product="currentProduct" />
      </app-modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .products {
    &__loading {
      display: flex;
      justify-content: center;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      &-card {
        --count-card: 2;
        width: calc(100% / var(--count-card) - 20px);

        @media screen and (min-width: $breakpoint-md) {
          --count-card: 3;
        }
        @media screen and (min-width: $breakpoint-lg) {
          --count-card: 4;
        }
      }
    }
  }
</style>
