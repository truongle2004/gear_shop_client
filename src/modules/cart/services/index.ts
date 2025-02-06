import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'

export const getCartAPI = async (): Promise<string> => {
  return await axiosInstance.get(`${env.CART_URL}`)
}

export const addProductToCartAPI = async ({
  userId,
  quantity,
  productId
}: {
  userId: string
  quantity: number
  productId: number
}): Promise<string> => {
  // NOTE: null as the second argument (POST typically expects a body, but we're only sending query params)
  return await axiosInstance.post(`${env.CART_URL}/add`, null, {
    params: {
      userId,
      quantity,
      productId
    }
  })
}
