import _API from './index'

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

// endpoint "getDates"
export const getDates = (date = null) => {
  return new Promise((resolve, reject) => {
    _API
      .get('/dates?booked_by=true' + (date ? `&date=${date}` : ''))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error))
  })
}
