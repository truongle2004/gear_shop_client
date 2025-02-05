import { Category } from '@/modules/product/models'
import { create } from 'zustand'

interface CategoryState {
  listCategory: Category[]
  setCategory: (categories: Category[]) => void
}

const useCategoryStore = create<CategoryState>()((set) => ({
  listCategory: [],
  setCategory: (categories) => set(() => ({ listCategory: categories }))
}))

export default useCategoryStore
