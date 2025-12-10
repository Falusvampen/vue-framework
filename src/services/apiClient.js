import axios from 'axios'

const BASE_URL = 'https://recipes.bocs.se/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20000,
})

export default apiClient
