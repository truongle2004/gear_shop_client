import { CartItem } from './CartItem'

export interface Cart {
  id: number
  totalPrice: number
  cartItems: CartItem[]
}
