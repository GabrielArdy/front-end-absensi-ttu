import axios from 'axios'

const api = axios.create({
  baseURL: process.env.BACKEND_SERVICE,
  withCredentials: true
})

export default api
