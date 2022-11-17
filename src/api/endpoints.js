import { getLocalStorageOnlyCredential } from '../helpers/localStorageCredentials'
import _API from './index'
import { useNavigate } from 'react-router-dom'

_API.interceptors.request.use(function (config) {
  const token = getLocalStorageOnlyCredential()
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

_API.interceptors.response.use((config) => {
  console.log(config.status)
  if (config.status === 403) {
    localStorage.removeItem('medigital:credential')
    RedirectMainPage()
  }
  return config
})

// REDIRECT MAIN PAGE
const RedirectMainPage = () => {
  const navigate = useNavigate()
  navigate('/', { replace: true })
}
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

// endpoint "getSpecificAppointment"
export const getSpecificAppointment = (_id) => {
  return new Promise((resolve, reject) => {
    _API
      .get('/appointments/' + _id)
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}

// endpoint "getAvailableHoursAppointments"
export const getAvailableHoursAppointments = (date) => {
  return new Promise((resolve, reject) => {
    _API
      .get('/appointments/available-hours?date=' + date)
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

// endpoint "updateAppointment"
export const updateAppointment = (appointment) => {
  return new Promise((resolve, reject) => {
    _API
      .put('/appointments/' + appointment._id, appointment)
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}

// endpoint "cancelAppointment"
export const cancelAppointment = (appointment) => {
  return new Promise((resolve, reject) => {
    _API
      .put('/appointments/' + appointment._id, {
        ...appointment,
        status: 'CANCELED',
      })
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}
