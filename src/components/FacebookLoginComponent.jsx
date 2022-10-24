/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */
import FacebookLogin from 'react-facebook-login'
import { login } from '../api/endpoints'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setLocalStorageCredentials } from '../helpers/localStorageCredentials'
import LoaderComponent from './LoaderComponent.jsx'

const _PLATFORM = 'FACEBOOK'
export default function FacebookLoginComponent() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  return (
    <>
      {loading && <LoaderComponent />}
      <FacebookLogin
        appId='769830507411915'
        autoLoad
        fields='name,email,picture'
        scope='public_profile,email'
        size='small'
        textButton='Acceder con Facebook'
        icon='fa-facebook'
        callback={({ accessToken }) => {
          loginAuth(accessToken)
        }}
        onFailure={(data) => {
          console.error(data)
        }}
      />
    </>
  )

  /**
   * It's an async function that takes a credential as a parameter, and then it
   * tries to login with that credential, and if it succeeds, it alerts the user
   * that they've been identified, and if it fails, it logs the error.
   */
  async function loginAuth(accessToken) {
    setLoading(true)
    try {
      const response = await login({
        platform: _PLATFORM,
        tokenId: accessToken,
      })
      setLocalStorageCredentials(response)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
}
