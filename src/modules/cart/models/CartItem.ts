import { Product } from "@/modules/product/models"

export interface CartItem {
  id: number
  quantity: number
  product: Product
}
