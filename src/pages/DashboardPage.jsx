import NavBarComponent from '../components/NavBarComponent'
import FooterComponent from '../components/FooterComponent'

import { Outlet } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <>
      <NavBarComponent />
      <Outlet />
      <FooterComponent />
    </>
  )
}

export default DashboardPage
