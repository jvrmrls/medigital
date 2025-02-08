import { useState, useEffect } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import GoogleLoginComponent from './GoogleLoginComponent.jsx'
import FacebookLoginComponent from './FacebookLoginComponent.jsx'
import '../assets/css/login-component.css'
import { getLocalStorageCredentials } from '../helpers/localStorageCredentials.js'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/endpoints.js'
import LoaderComponent from './LoaderComponent.jsx'
import { setLocalStorageCredentials } from '../helpers/localStorageCredentials'

const LoginComponent = () => {
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(null)
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { credential } = getLocalStorageCredentials()
    if (credential) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  async function loginNative(credentials) {
    if (credentials.email === '' || credentials.password === '') {
      return
    }
    setLoading(true)
    try {
      const response = await login({ ...credentials, platform: 'NATIVE' })
      setLocalStorageCredentials(response)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <LoaderComponent />}
      <Sidebar
        style={{ backgroundColor: 'var(--surface-100)' }}
        visible={visible}
        className='p-sidebar-sm'
        position='right'
        onHide={() => {
          setCredentials({ email: '', password: '' })
          setVisible(false)
        }}>
        <section className='container d-flex flex-column align-items-center justify-content-between w-100 h-100'>
          <form className='d-flex flex-column align-items-center justify-content-center gap-1 mb-2'>
            <p className='m-0 _bold mb-2' style={{ fontSize: '1rem' }}>
              Identif&iacute;cate
            </p>

            <InputText
              className='p-inputtext-sm w-100'
              value={credentials.email}
              placeholder='Ingrese el correo electr&oacute;nico'
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  email: e.target.value,
                }))
              }
            />
            <Password
              value={credentials.password}
              placeholder='Ingrese la contrase&ntilde;a'
              className='p-inputtext-sm w-100 _pass'
              toggleMask
              feedback={false}
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  password: e.target.value,
                }))
              }
            />

            <Button
              label='Iniciar sesi&oacute;n'
              icon='pi pi-sign-in '
              className=' w-100'
              onClick={(e) => {
                e.preventDefault()
                loginNative(credentials)
              }}
            />
          </form>
          <div className='d-flex justify-content-center flex-column align-items-center gap-2 mt-2'>
            <GoogleLoginComponent />
            <FacebookLoginComponent />
          </div>
        </section>
      </Sidebar>
      {!isLogged ? (
        <Button
          label='Ingresar'
          className='mt-3'
          onClick={(e) => setVisible(true)}
        />
      ) : (
        <Button
          label='Ir al dashboard'
          className='mt-3'
          onClick={() => navigate('/dashboard')}
        />
      )}
    </>
  )
}

export default LoginComponent
