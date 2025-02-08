import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'
import { Cart } from '../models/Cart'

export const getCartByUserIdAPI = async (userId: string): Promise<Cart> => {
  return await axiosInstance.get(`${env.CART_URL}/${userId}`)
}
