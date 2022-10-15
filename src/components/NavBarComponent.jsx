import { getLocalStorageCredentials } from '../helpers/localStorageCredentials'
import { Button } from 'primereact/button'

const NavBarComponent = () => {
  const { avatar, fullName, email } = getLocalStorageCredentials()
  return (
    <nav
      className='d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-around px-2 px-lg-4'
      style={{ backgroundColor: 'var(--surface-0)', minHeight: '80px' }}>
      <div className='d-flex flex-row align-items-center justify-content-around gap-1 px-1 '>
        <img
          src={avatar}
          referrerPolicy='no-referrer'
          alt='avatar'
          className='p-avatar p-avatar-image p-avatar-lg p-avatar-circle'
        />
        <div className='p-1 w-100' style={{ minWidth: '250px' }}>
          <p className='m-0' style={{ fontSize: '0.9rem' }}>
            {fullName}
          </p>
          <p className='m-0 text-muted' style={{ fontSize: '0.7rem' }}>
            {email}
          </p>
        </div>
      </div>
      <div className='d-flex flex-row justify-content-around justify-content-lg-end align-items-center gap-1 gap-lg-4 w-100'>
        <Button
          label='Historial'
          className='p-button-sm p-button-raised p-button-text'
        />
        <Button
          icon='pi pi-sign-out'
          className=' p-button-sm p-button-rounded'
        />
      </div>
    </nav>
  )
}
export default NavBarComponent
