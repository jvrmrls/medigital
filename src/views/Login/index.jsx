import './main.css'

import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
  return (
    <div className='flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full lg:w-3/6'>
      <div className='w-full lg:w-2/4 text-center lg:text-start'>
        <p className='text-2xl'>
          <span className='text-4xl font-bold tracking-wider _accent-span'>
            MEDI
          </span>
          gital
        </p>
        <p className='text-sm mt-0 lg:mt-1'>La salud al alcance de tus manos</p>
      </div>
      <div className='w-full lg:w-1/4 flex justify-center mt-3 lg:mt-0'>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
            alert('Felicidades, estas dentro!')
          }}
          onError={() => {
            console.log('Login Failed')
          }}
          useOneTap
          auto_select
        />
      </div>
    </div>
  )
}
