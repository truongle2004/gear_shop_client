import axios from 'axios'
import { env } from '../enviroment'

const axiosInstance = axios.create({
  // this is core url for api (like http://localhost:8081)
  baseURL: env.BASE_URL,
  // setup timeout to make sure the request doesn't take too long
  timeout: 10000,
  // Default header for json request
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use((config) => {
  // After login, the token will be storeed in localStorage
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
    return Promise.reject(error)
  }
)

export default axiosInstance
