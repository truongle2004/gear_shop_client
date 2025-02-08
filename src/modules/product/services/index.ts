import { env } from '@/enviroment'
import type { Category, Product, ProductData } from '@/modules/product/models'
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

export const getProductAPI = async ({
  pageNo,
  pageSize,
  slug
}: {
  pageNo: number
  pageSize: number
  slug: string
}): Promise<ProductData> => {
  return await axiosInstance.get(
    `${env.PRODUCT_URL}?pageNo=${pageNo}&pageSize=${pageSize}&category=${slug}`
  )
}

export const getProductDetailByIdAPI = async ({
  id
}: {
  id: number
}): Promise<Product> => {
  return await axiosInstance.get(`${env.PRODUCT_URL}/${id}`)
}

export const getSuggestedProductAPI = async (): Promise<string[]> => {
  return await axiosInstance.get(`${env.PRODUCT_URL}/suggestions`)
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
