import { env } from '@/enviroment'
import axiosInstance from '@/utils/axiosInstance'

export const getCartAPI = async (): Promise<string> => {
  return await axiosInstance.get(`${env.PRODUCT_URL}/carts`)
}
