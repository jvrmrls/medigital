import { getLocalStorageCredentials } from '../helpers/localStorageCredentials'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import moment from 'moment'
import 'moment/locale/es'
import LogOutComponent from './LogOutComponent'
import { useNavigate, useLocation } from 'react-router-dom'

moment.locale('es')
const today = moment().format('DD MMM YYYY')

const NavBarComponent = () => {
  let route = useLocation()
  const navigate = useNavigate()

  const { avatar, fullName, email } = getLocalStorageCredentials()

  /**
   * Function to print the respective button depending the route
   * @param {route} route
   * @returns
   */
  function RenderOptionButtons({ route }) {
    if (route !== '/dashboard/create-appointment') {
      return (
        <Button
          icon='pi pi-plus'
          label='Crear cita'
          className=' p-button-sm p-button-raised p-button-text'
          onClick={() => navigate('/dashboard/create-appointment')}
        />
      )
    } else {
      return (
        <Button
          icon='pi pi-back'
          label='Volver'
          className=' p-button-sm p-button-raised p-button-text'
          onClick={() => navigate(-1)}
        />
      )
    }
  }

  return (
    <>
      <nav
        className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-around px-2 px-lg-4'
        style={{ backgroundColor: 'var(--surface-0)', minHeight: '80px' }}
      >
        <div className='d-flex flex-row align-items-center justify-content-around gap-1 gap-lg-3 px-1 py-1'>
          <img
            src={avatar}
            referrerPolicy='no-referrer'
            alt='avatar'
            className='p-avatar p-avatar-image p-avatar-lg p-avatar-circle'
          />
          <div className='p-1 w-100' style={{ minWidth: '275px' }}>
            <p className='m-0'>{fullName}</p>
            <p className='m-0 text-muted' style={{ fontSize: '0.8rem' }}>
              {email}
            </p>
          </div>

          <Divider layout='vertical' className='_only-desktop' />
          <div className='_only-desktop' style={{ minWidth: '120px' }}>
            <span>
              <p
                className='m-0 text-center _boldest'
                style={{ fontSize: '0.9rem' }}
              >
                hoy
              </p>
              <p
                className='m-0 text-uppercase w-100'
                style={{ color: 'var(--primary-color)' }}
              >
                {today}
              </p>
            </span>
          </div>
        </div>
        <div className='d-flex flex-row justify-content-around justify-content-lg-end align-items-center gap-1 gap-lg-5 w-100'>
          <RenderOptionButtons route={route.pathname} />
          <LogOutComponent />
        </div>
      </nav>
    </>
  )
}
export default NavBarComponent
