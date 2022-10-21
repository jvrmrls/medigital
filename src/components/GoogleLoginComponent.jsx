/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */
import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { login } from '../api/endpoints'
import { useNavigate } from 'react-router-dom'
import LoaderComponent from './LoaderComponent.jsx'

import { setLocalStorageCredentials } from '../helpers/localStorageCredentials'

const _PLATFORM = 'GOOGLE'
export default function GoogleLoginComponent() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading && <LoaderComponent />}
      <GoogleLogin
        onSuccess={({ credential }) => {
          loginAuth(credential)
        }}
        onError={() => {
          console.log('Login Failed')
        }}
        theme='outline'
        size='large'
        shape='circle'
        auto_select
        useOneTap
      />
    </>
  )

  /**
   * It's an async function that takes a credential as a parameter, and then it
   * tries to login with that credential, and if it succeeds, it alerts the user
   * that they've been identified, and if it fails, it logs the error.
   */
  async function loginAuth(credential) {
    setLoading(true)
    try {
      const response = await login({ platform: _PLATFORM, tokenId: credential })
      setLocalStorageCredentials(response)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }
}
