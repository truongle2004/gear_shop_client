import { env } from '@/enviroment'
import axios from 'axios'
import { keycloakConfig } from './keycloakConfig'
import { ToastifyError, ToastifyWarn } from './Toastify'

const axiosInstance = axios.create({
  // this is core url for api (like http://localhost:8081)
  baseURL: env.BASE_URL,
  // setup timeout to make sure the request doesn't take too long
  timeout: 10000,
  // Default header for json request
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// store all public url
const publicUrl = [env.PRODUCT_URL]

axiosInstance.interceptors.request.use((config) => {
  // this condition make sure we don't add token to public url
  // prevent error from calling api
  if (publicUrl.some((item) => config.url?.includes(item))) {
    // remove token from header to avoid existing track token
    delete config.headers.Authorization
    // Skip adding the token
    return config
  }

  const accessToken = keycloakConfig.token

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  } else {
    delete config.headers.Authorization
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    // response.data make sure each success response will return data, help receive data from server more easily
    return response.data
  },
  (error) => {
    const errorResponse = error.response

    if (!errorResponse) {
      ToastifyError('Network error. Please try again later.')
      return Promise.reject(error)
    }

    const { status, data } = errorResponse

    if (status === 403) {
      localStorage.removeItem('token')
      ToastifyWarn('Session expired. Please log in again.')
      // TODO: Handle token refresh or redirect to login
    } else if (status === 400) {
      ToastifyWarn(data?.message || 'Bad request. Please check your input.')
    } else if (status === 404) {
      ToastifyError('Requested resource not found.')
    } else if (status >= 500) {
      ToastifyError('Server error. Please try again later.')
    } else {
      ToastifyError(data?.message || 'An unexpected error occurred.')
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
