import { getLocalStorageOnlyCredential } from '../helpers/localStorageCredentials'
import _API from './index'

_API.interceptors.request.use(function (config) {
  const token = getLocalStorageOnlyCredential()
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})
// CONFIGURE THE ENDPOINTS

// endpoint "login"
export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    _API
      .post('/common-users/auth', credentials)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((error) => reject(error))
  })
}

// endpoint "getAppointments"
export const getAppointments = (date = null) => {
  return new Promise((resolve, reject) => {
    _API
      .get('/appointments?booked_by=true' + (date ? `&date=${date}` : ''))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}

// endpoint "createAppointment"
export const createAppointment = (date) => {
  return new Promise((resolve, reject) => {
    _API
      .post('/appointments', date)
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}
