const setLocalStorageCredentials = ({
  credential,
  avatar,
  fullName,
  email,
}) => {
  return new Promise((resolve) => {
    localStorage.setItem('medigital:credential', credential || null)
    localStorage.setItem('medigital:avatar', avatar || null)
    localStorage.setItem('medigital:fullName', fullName || null)
    localStorage.setItem('medigital:email', email || null)
    resolve()
  })
}

const getLocalStorageCredentials = () => {
  const credential = localStorage.getItem('medigital:credential')
  const avatar = localStorage.getItem('medigital:avatar')
  const fullName = localStorage.getItem('medigital:fullName')
  const email = localStorage.getItem('medigital:email')
  return {
    credential,
    avatar,
    fullName,
    email,
  }
}

const removeLocalStorageCredentials = () => {
  localStorage.removeItem('medigital:credential')
  localStorage.removeItem('medigital:avatar')
  localStorage.removeItem('medigital:fullName')
  localStorage.removeItem('medigital:email')
  return
}

export {
  setLocalStorageCredentials,
  removeLocalStorageCredentials,
  getLocalStorageCredentials,
}
