import axios from 'axios'
import { env } from '@/enviroment'

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

  // TODO: consider get token from cookie
  const accessToken = localStorage.getItem('token')

  // We need to check token before sending request, in this case is checking accessToken in localStorage
  if (accessToken) {
    // if accessToken exist, add it to header (we must to send accessToken for certain request which need accessToken if we want to http endpont in server accept the request)
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    // response.data make sure each success response will return data, help receive data from server more easily
    return response.data
  },
  (error) => {
    // TODO: handle 403 error here
    if (error.response.status === 403) {
      localStorage.removeItem('token')
      // TODO: need to handle refresh access token
    }
    console.log(error.response)
    return Promise.reject(error)
  }
)

export default axiosInstance
