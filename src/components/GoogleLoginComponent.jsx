/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */

import { GoogleLogin } from '@react-oauth/google'

export default function GoogleLoginComponent() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
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
  )
}
