/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */
import FacebookLogin from 'react-facebook-login'
import { login } from '../api/endpoints'

const _PLATFORM = 'FACEBOOK'
export default function FacebookLoginComponent() {
  return (
    <FacebookLogin
      appId='769830507411915'
      //autoLoad
      fields='name,email,picture'
      scope='public_profile,email'
      size='small'
      textButton='Acceder con Facebook'
      icon='fa-facebook'
      callback={(data) => {
        loginAuth(data)
        /* const profile = await axios({
              url: `https://graph.facebook.com/me?fields=id,name,email,birthday,picture&access_token=${datos.accessToken}`,
              method: 'get',
            })
            console.log('Profile', profile) // { access_token, token_type, expires_in }*/
        console.log(data)
      }}
      onFailure={(data) => {
        console.error(data)
      }}
    />
  )

  /**
   * It's an async function that takes a credential as a parameter, and then it
   * tries to login with that credential, and if it succeeds, it alerts the user
   * that they've been identified, and if it fails, it logs the error.
   */
  async function loginAuth(credential) {
    try {
      const response = await login({ platform: _PLATFORM, tokenId: credential })
      alert('Identificado')
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
}
