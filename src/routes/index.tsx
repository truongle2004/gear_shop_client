import { FC, lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/common/components/Layout'
import Spinner from 'react-bootstrap/esm/Spinner'

const LoginComponent = lazy(() => import('@/modules/auth/components/LoginUI'))
const RegisterComponent = lazy(
  () => import('@/modules/auth/components/RegisterUI')
)
const HomeComponent = lazy(() => import('@/modules/product/components/HomeUI'))
const CategoryComponent = lazy(
  () => import('@/modules/product/components/CategoryUI')
)

const DetailComponent = lazy(
  () => import('@/modules/product/components/DetailUI')
)

// eslint-disable-next-line react-refresh/only-export-components
const LazyLoad = (Component: FC) => (
  <Suspense
    fallback={
      <div className="text-center mt-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    }
  >
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/tech_shop/pages',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: LazyLoad(LoginComponent)
      },
      {
        path: 'register',
        element: LazyLoad(RegisterComponent)
      },
      {
        path: 'home',
        element: LazyLoad(HomeComponent)
      },
      {
        path: 'category/:category',
        element: LazyLoad(CategoryComponent)
      },
      {
        path: 'product/:handle/:id',
        element: LazyLoad(DetailComponent)
      }
    ]
  },
  {
    path: '*',
    element: (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {' '}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">The page you’re looking for doesn’t exist.</p>
          <a
            onClick={() => router.navigate('/tech_shop/home')}
            className="btn btn-primary"
          >
            Go Home
          </a>
        </div>
      </div>
    )
  }
])

export default router
