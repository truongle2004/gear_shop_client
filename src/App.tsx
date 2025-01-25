import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { getCategoriesAPI } from './modules/product/services'
import useCategoryStore from './modules/product/store/categoryStore'
import router from './routes'

function App() {
  // Call api here to get slug of categories which will be used to get products
  const { listCategory, setCategory } = useCategoryStore()

  const { mutate: fetchCategoriesAPI } = useMutation({
    mutationFn: getCategoriesAPI,
    onSuccess: (data) => {
      setCategory(data)
    }
  })

  useEffect(() => {
    if (listCategory?.length === 0) {
      fetchCategoriesAPI()
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
