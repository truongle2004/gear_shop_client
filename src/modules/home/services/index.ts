import { env } from '@/enviroment'
import type { Category, ProductData } from '@/modules/home/models'
import axiosInstance from '@/utils/axiosInstance'

export const getCategoriesAPI = async (): Promise<Category[]> => {
  return await axiosInstance.get(`${env.PRODUCT_URL}/categories`)
}

export const getLaptopGamingAPI = async ({
  pageNo,
  pageSize
}: {
  pageNo: number
  pageSize: number
}): Promise<ProductData> => {
  return await axiosInstance.get(
    `${env.PRODUCT_URL}?pageNo=${pageNo}&pageSize=${pageSize}&category=laptop-gaming`
  )
}

export const getPCAPI = async ({
  pageNo,
  pageSize
}: {
  pageNo: number
  pageSize: number
}): Promise<ProductData> => {
  return await axiosInstance.get(
    `${env.PRODUCT_URL}?pageNo=${pageNo}&pageSize=${pageSize}&category=chuot`
  )
}


export const getKeyBoardAPI = async ({
  pageNo,
  pageSize
}: {
  pageNo: number
  pageSize: number
}): Promise<ProductData> => {
  return await axiosInstance.get(
    `${env.PRODUCT_URL}?pageNo=${pageNo}&pageSize=${pageSize}&category=ban-phim`
  )
}


