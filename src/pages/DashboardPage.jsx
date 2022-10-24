import NavBarComponent from '../components/NavBarComponent'

import { Outlet } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <>
      <NavBarComponent />
      <Outlet />
    </>
  )
}

export default DashboardPage
