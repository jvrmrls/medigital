/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */
import FacebookLogin from 'react-facebook-login'
export default function FacebookLoginComponent() {
  return (
    <FacebookLogin
      appId='769830507411915'
      autoLoad={false}
      fields='name,email,picture'
      scope='public_profile,email'
      size='small'
      textButton='Acceder con Facebook'
      icon='fa-facebook'
      callback={(data) => {
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
}
