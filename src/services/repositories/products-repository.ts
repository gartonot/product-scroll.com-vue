import type { IProduct } from '@/services/interfaces'
import { useFetch } from '@vueuse/core'

export default {
  fetchProducts: async ():Promise<IProduct[]> => {
    const { error, data } = await useFetch('https://fakestoreapi.com/products').json()
    
    if(error.value) {
      console.warn(error.value)
    }
    
    return data.value
  }
}
