import axios from 'axios'
import { errorState } from './ErrorState'

const BASE_URL = 'https://recipes.bocs.se/api/v1'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 20000,
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)

    let message = ''

    const customMessage = error.config?.errorMessage

    const backendMessage = error.response?.data?.message

    if (customMessage) {
      message = customMessage
    } else if (backendMessage) {
      message = backendMessage
    } else {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            message = 'Ogiltig förfrågan. Kontrollera indata.'
            break
          case 401:
            message = 'Du är inte behörig. Vänligen logga in.'
            break
          case 403:
            message = 'Du saknar rättigheter för detta.'
            break
          case 404:
            message = 'Det du sökte kunde inte hittas.'
            break
          case 500:
            message = 'Ett serverfel uppstod. Försök igen senare.'
            break
          default:
            message = `Ett fel uppstod (${error.response.status}).`
        }
      } else if (error.request) {
        message = 'Kunde inte nå servern. Kontrollera din internetanslutning.'
      } else {
        message = 'Wtf hände här?'
      }
    }

    errorState.trigger(message)

    return Promise.reject(error)
  },
)

export default apiClient
