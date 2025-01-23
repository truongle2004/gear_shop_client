import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/common/components/Layout'
import Spinner from 'react-bootstrap/esm/Spinner'

const LoginComponent = lazy(() => import('@/modules/auth/components/LoginUI'))
const RegisterComponent = lazy(
  () => import('@/modules/auth/components/RegisterUI')
)
const HomeComponent = lazy(() => import('@/modules/home/components/HomeUI'))
const CategoryComponent = lazy(
  () => import('@/modules/category/components/CategoryUI')
)

const router = createBrowserRouter([
  {
    path: '/tech_shop/pages',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
          >
            <LoginComponent />
          </Suspense>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
          >
            <RegisterComponent />
          </Suspense>
        )
      },
      {
        path: 'home',
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
          >
            <HomeComponent />
          </Suspense>
        )
      },
      {
        path: ':slug',
        element: (
          <Suspense
            fallback={
              <div className="text-center mt-3">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            }
          >
            <CategoryComponent />
          </Suspense>
        )
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
