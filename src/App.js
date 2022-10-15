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
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
function App() {
  const _UNLOGGED_CONTEXT = 'UNLOGGED'
  const _LOGGED_CONTEXT = 'LOGGED'
  return (
    <>
      <Routes>
        <Route exact path='' index element={<HomePage />} />
        <Route
          exact
          path='login'
          element={<ConditionalRoute content={_UNLOGGED_CONTEXT} />}>
          <Route exact path='/login' element={<HomePage />} />
        </Route>
        <Route
          exact
          path='dashboard'
          element={<ConditionalRoute content={_LOGGED_CONTEXT} />}>
          <Route exact path='/dashboard' element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

function ConditionalRoute({ content }) {
  // GET VALUE LOCALSTORAGE credentials
  const credentials = localStorage.getItem('credentials') || null
  switch (content) {
    case 'LOGGED':
      return credentials ? <Outlet /> : <Navigate to='/login' replace />
    case 'UNLOGGED':
      return !credentials ? <Outlet /> : <Navigate to='/dashboard' replace />
    default:
      break
  }
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
