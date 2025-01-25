import { create } from 'zustand'
import type { Category } from '../models'

interface CategoryState {
  listCategory: Category[]
  setCategory: (categories: Category[]) => void
}

const useCategoryStore = create<CategoryState>()((set) => ({
  listCategory: [],
  setCategory: (categories) => set(() => ({ listCategory: categories }))
}))

export default useCategoryStore
