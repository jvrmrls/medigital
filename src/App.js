/*
 * Created on Wed Sep 21 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */
import './App.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import { getLocalStorageCredentials } from './helpers/localStorageCredentials'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import CreateAppointmentPage from './pages/CreateAppointmentPage'
import MainDashboardPage from './pages/MainDashboardPage'
function App() {
  const _LOGGED_CONTEXT = 'LOGGED'
  return (
    <>
      <Routes>
        <Route exact path='' index element={<HomePage />} />
        <Route
          exact
          path='/dashboard'
          element={<ConditionalRoute content={_LOGGED_CONTEXT} />}>
          <Route exact path='/dashboard' element={<DashboardPage />}>
            <Route path='' element={<MainDashboardPage />} />
            <Route
              path='create-appointment'
              element={<CreateAppointmentPage />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

function ConditionalRoute({ content }) {
  // GET VALUE LOCALSTORAGE credentials
  const { credential } = getLocalStorageCredentials()
  if (content === 'LOGGED') {
    return credential ? <Outlet /> : <Navigate to='/' replace />
  }
  return
}
/*
const Navigation = () => {
  return (
    <nav>
      <Link to='/home'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
    </nav>
  )
}*/

export default App
