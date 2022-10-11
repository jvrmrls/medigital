/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */

import { GoogleLogin } from '@react-oauth/google'

import { login } from '../api/endpoints'
export default function GoogleLoginComponent() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
        localStorage.setItem('credentials', credentialResponse.credential)
        login(credentialResponse.credential).then((data) => {
          console.log(data)
        })
      }}
      onError={() => {
        console.log('Login Failed')
      }}
      /*useOneTap
          auto_select*/
    />
  )
}
