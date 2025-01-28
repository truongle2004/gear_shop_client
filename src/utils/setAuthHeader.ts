import axiosInstance from './axiosInstance'

const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default setAuthHeader
