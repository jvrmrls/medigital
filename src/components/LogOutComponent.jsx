import { Button } from 'primereact/button'
import { ConfirmPopup } from 'primereact/confirmpopup'
import { confirmPopup } from 'primereact/confirmpopup'
import { removeLocalStorageCredentials } from '../helpers/localStorageCredentials'
import { useNavigate } from 'react-router-dom'

const LogOutComponent = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={confirmLogOut}
        icon='pi pi-sign-out'
        className=' p-button-sm p-button-rounded'
        label='Cerrar sesi&oacute;n'
      />
      <ConfirmPopup />
    </>
  )

  function confirmLogOut(event) {
    confirmPopup({
      target: event.currentTarget,
      message: '¿Estás seguro de cerrar sesión?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        removeLocalStorageCredentials()
        navigate('/', { replace: true })
      },
    })
  }
}
export default LogOutComponent
