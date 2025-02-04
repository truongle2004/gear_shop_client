import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'

export const getCartAPI = async (): Promise<string> => {
  return await axiosInstance.get(`${env.CART_URL}`)
}

export const addToCart = async (
  userId: string,
  quantity: number,
  productId: string
): Promise<string> => {
  return await axiosInstance.post(`${env.CART_URL}/add`, {
    userId,
    quantity,
    productId
  })
}
