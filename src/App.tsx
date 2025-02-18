import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { getCategoriesAPI } from './modules/product/services'
import router from './routes'
import useCategoryStore from './store/categoryStore'

function App() {
  // Call api here to get slug of categories which will be used to get products
  const { listCategory, setCategory } = useCategoryStore()

  const { mutateAsync: fetchCategoriesAPI } = useMutation({
    mutationFn: getCategoriesAPI,
    onSuccess: (data) => {
      setCategory(data)
    }
  })

  const handleFetchCategories = async () => {
    if (listCategory.length > 0) return
    await fetchCategoriesAPI()
  }
  useEffect(() => {
    handleFetchCategories()
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
