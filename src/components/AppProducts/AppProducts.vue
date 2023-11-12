<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import type { IProduct } from '@/services/interfaces'
  import productsRepository from '@/services/repositories/products-repository'
  import ProductCard from '@/components/AppProducts/ProductCard.vue'
  import AppModal from '@/components/ui/AppModal.vue'
  import AppLoader from '@/components/ui/AppLoader.vue'
  import { useScroll } from '@vueuse/core'
  import debounce from '@/services/utils/debounce'

  const defaultProduct = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  }

  const productsRef = ref<HTMLElement | null>(null)
  const { y, arrivedState } = useScroll(productsRef)
  const products = ref<IProduct[]>([])
  const currentProduct = ref<IProduct>(structuredClone(defaultProduct))
  const cardModalIsOpen = ref(false)
  let productsIsLoading = ref(false)

  const loadProducts = async () => {
    try {
      const products = await productsRepository.fetchProducts()
      return products
    } catch (error) {
      console.warn(error)
    }
  }
  const addToCart = (productId: number) => {
    console.log('Added to cart product id:', productId)
  }
  const openCard = (product: IProduct) => {
    currentProduct.value = product
    modalOpen()
  }
  const modalOpen = () => cardModalIsOpen.value = true
  const modalClose = () => cardModalIsOpen.value = false

  const prodcutsFetching = async () => {
    productsIsLoading.value = true
    const productsFetch = await loadProducts()
    if(productsFetch) {
      products.value.push(...productsFetch)
    }
    productsIsLoading.value = false
  }

  onMounted(async () => {
    await prodcutsFetching()
  })

  watch(() => y.value, debounce(async () => {
    if(arrivedState.bottom) {
      await prodcutsFetching()
    }
  }, 60))
</script>

<template>
  <div class="products">
    <div ref="productsRef" class="products__list">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        class="products__list-card"
        @add-to-cart="addToCart($event)"
        @click="openCard($event)"
      />
      <div class="products__loading">
        <app-loader v-if="productsIsLoading" />
      </div>
    </div>
    <app-modal :modal-is-open="cardModalIsOpen" @modal-close="modalClose()">
        <product-card
          :product="currentProduct"
          card-is-full
        />
      </app-modal>
  </div>
</template>

<style lang="scss" scoped>
  .products {
    &__loading {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      height: 600px;
      overflow-y: auto;
      padding-bottom: 80px;

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
