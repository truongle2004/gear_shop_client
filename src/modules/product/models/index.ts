export interface Category {
  id: number
  name: string
  slug: string
}

export interface Image {
  id: number
  src: string
  alt: string
  position: number
  createAt: string
  deleteAt: string
}

export interface Product {
  id: number
  available: boolean
  slug: string
  title: string
  description: string
  tags: string
  category: string
  vendor: string
  price: number
  createAt: string
  updateAt: string
  deleteAt: string
  images: Image[]
}

export interface ProductData {
  content: Product[]
  pageNo: number
  pageSize: number
  totalElements: number
  totalPages: number
  last: boolean
}
