import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})
instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token_base365')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error)
  }
)

export default instance
