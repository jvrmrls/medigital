/*
 * Created on Sun Oct 02 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */

import './main.css'

// IMPORT COMPONENTS
import FacebookLoginComponent from '../../components/FacebookLoginComponent'
import GoogleLoginComponent from '../../components/GoogleLoginComponent'

export default function Login() {
  return (
    <div
      className='flex flex-col lg:flex-row justify-center lg:justify-around 
      items-center w-full min-h-[100vh]'>
      <div className='w-full lg:w-2/6 text-center lg:text-start'>
        <p className='text-2xl'>
          <span className='text-4xl font-bold tracking-wider _accent-span'>
            MEDI
          </span>
          gital
        </p>
        <p className='text-sm mt-0 lg:mt-1'>La salud al alcance de tus manos</p>
      </div>
      <div className='w-full lg:w-2/6 flex flex-col  justify-center items-center mt-3 lg:mt-0 gap-y-2'>
        <GoogleLoginComponent />
        <FacebookLoginComponent />
      </div>
    </div>
  )
}
