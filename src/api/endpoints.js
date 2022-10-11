import _API from './index'

// CONFIGURE THE ENDPOINTS

// endpoint "login"
export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    _API
      .post('/auth/login', credentials)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => reject(error))
  })
}
