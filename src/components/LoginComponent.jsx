import { useState } from 'react'
import { Sidebar } from 'primereact/sidebar'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import GoogleLoginComponent from './GoogleLoginComponent.jsx'
import FacebookLoginComponent from './FacebookLoginComponent.jsx'
const LoginComponent = () => {
  const [visible, setVisible] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  return (
    <>
      <Sidebar
        style={{ backgroundColor: 'var(--surface-100)' }}
        visible={visible}
        className='p-sidebar-sm'
        position='right'
        onHide={() => {
          setCredentials({ username: '', password: '' })
          setVisible(false)
        }}>
        <section className='container d-flex flex-column align-items-center justify-content-around w-100 h-100'>
          <form className='d-flex flex-column align-items-center justify-content-center gap-1 mb-2'>
            <p className='m-0 ' style={{ fontSize: '1rem' }}>
              Iniciar sesi&oacute;n
            </p>

            <InputText
              className='p-inputtext-sm w-100'
              value={credentials.username}
              placeholder='Ingrese correo electr&oacute;nico'
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  username: e.target.value,
                }))
              }
            />
            <InputText
              value={credentials.password}
              type='password'
              placeholder='Ingrese contrase&ntilde;a'
              className='p-inputtext-sm  w-100'
              onChange={(e) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  password: e.target.value,
                }))
              }
            />
            <span className='' style={{ fontSize: '0.8rem' }}>
              ¿No tienes una cuenta a&uacute;n? Registrate AQUI
            </span>
          </form>
          <div className='d-flex justify-content-center flex-column align-items-center gap-2 mt-2'>
            <GoogleLoginComponent />
            <FacebookLoginComponent />
          </div>
        </section>
      </Sidebar>

      <Button
        label='Ingresar'
        className='mt-3'
        onClick={(e) => setVisible(true)}
      />
    </>
  )
}
export default LoginComponent
