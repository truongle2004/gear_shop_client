import { createBrowserRouter } from 'react-router-dom'
import Layout from '../common/components/Layout'
import { lazy, Suspense } from 'react'
import MainContent from '../modules/home/components/MainContent'

const LoginComponent = lazy(() => import('../modules/auth/components/LoginUI'))
const RegisterComponent = lazy(
  () => import('../modules/auth/components/RegisterUI')
)
const HomeComponent = lazy(() => import('../modules/home/components/HomeUI'))

const router = createBrowserRouter([
  {
    path: '/tech_shop',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginComponent />
          </Suspense>
        )
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterComponent />
          </Suspense>
        )
      },
      {
        path: 'home',
        element: (
          <Suspense
            fallback={
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
          >
            <HomeComponent />
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
          <a href="/tech_shop/home" className="btn btn-primary">
            Go Home
          </a>
        </div>
      </div>
    )
  }
])

export default router
