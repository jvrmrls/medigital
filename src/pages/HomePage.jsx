//import { motion } from 'framer-motion'
import '../assets/css/home-page.css'
import { useState } from 'react'
import background from '../assets/images/bg-red.png'
import personAsking from '../assets/images/person-asking.png'
import personAuth from '../assets/images/person-auth.png'
import AvatarComponent from '../components/AvatarComponent'
import LoginComponent from '../components/LoginComponent'
import FooterComponent from '../components/FooterComponent'
import { Accordion, AccordionTab } from 'primereact/accordion'

import { Button } from 'primereact/button'

const creators = [
  {
    image: 'https://avatars.githubusercontent.com/u/43836850?v=4',
    label: 'JM',
    linkedIn: 'https://www.linkedin.com/in/javier-morales-melara',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/43689872?v=4',
    label: 'ER',
    linkedIn: 'https://www.linkedin.com/in/edgar-reyes55/',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/43791074?v=4',
    label: 'KC',
    linkedIn: 'https://www.linkedin.com/in/lisbeth-chavez-969076203/',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/39805471?v=4',
    label: 'CC',
    linkedIn: 'https://www.linkedin.com/in/carlos-enrique-cordero-linares/',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/69808393?v=4',
    label: 'BR',
    linkedIn:
      'https://www.linkedin.com/in/brian-steve-rodas-hern%C3%A1ndez-20b259247/',
  },
]

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  return (
    <>
      <main>
        <div
          className='fluid-container _panel-1 px-2'
          style={{ backgroundImage: `url(${background})` }}>
          <article className='container ' style={{ textAlign: 'end' }}>
            <p className='my-0' style={{ fontSize: '1.7rem' }}>
              La vida no es{' '}
              <span
                className='_boldest ml-2'
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '-2px',
                  fontSize: '2.5rem',
                  color: 'var(--primary-color)',
                }}>
                reemplazable
              </span>
            </p>
            <p className='my-0' style={{ fontSize: '0.9rem' }}>
              cuida de t&iacute; y de tu familia
            </p>
            <LoginComponent />
          </article>
        </div>
        <div className='fluid-container _panel-2 px-2'>
          <p
            className='_boldest mb-2'
            style={{ color: 'var(--text-color)', fontSize: '1.3rem' }}>
            Somos expertos en el cuidado la salud, con m&eacute;dicos y
            especialistas en el &aacute;rea
          </p>
          <p className='mt-2' style={{ maxWidth: '70%' }}>
            Contamos con un amplio equipo de profesionales altamente capacitados
            para atenderte los <span className='_boldest'>365 D&Iacute;AS</span>{' '}
            del a&ntilde;o, las <span className='_boldest'>24 HORAS</span> del
            d&iacute;a.
          </p>
          <article className='_points'>
            <div>
              <div>
                <i className='pi pi-check'></i>
              </div>
              <p className='_bold mb-0'>Ingresa al portal</p>
              <span
                className='_description-item'
                style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
                Accede por medio de tu cuenta de Google, Facebook o tu correo
                electr&oacute;nico y contrase&ntilde;a.
              </span>
            </div>
            <div>
              <div>
                <i className='pi pi-check-square '></i>
              </div>
              <p className='_bold mb-0'>Agenda tu cita</p>
              <span
                className='_description-item'
                style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
                Reserva tu cita de 30 minutos en nuestra cl&iacute;nica desde
                las 8:00 A.M. hasta las 5:00 P.M.
              </span>
            </div>
            <div>
              <div>
                <i className='pi pi-building'></i>
              </div>
              <p className='_bold mb-0'>Asiste a la cl&iacute;nica</p>
              <span
                className='_description-item'
                style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
                Al llegar el momento de la cita, te estaremos esperando para ser
                atendido con nuestros expertos.
              </span>
            </div>
          </article>
        </div>
        <div className='fluid-container d-flex justify-content-center justify-content-lg-around align-items-center flex-column flex-lg-row _panel-3 px-2'>
          <img
            src={personAuth}
            alt='Illustration person auth'
            className='_asset-image'
          />
          <article className='_article'>
            <p className='_bold' style={{ fontSize: '1.2rem' }}>
              Seguridad de tus datos{' '}
              <span className='_boldest' style={{ fontSize: '1.5rem' }}>
                ¡GARANTIZADA!
              </span>
            </p>
            <p>
              Manejamos nuestra informaci&oacute;n en servidores con
              certificaciones en seguridad y demanda como lo es{' '}
              <span className='_bold'>AWS EC2</span>. No tendr&aacute;s ninguna
              preocupaci&oacute;n de que tus datos sean publicados en internet
            </p>
            <Button
              label='Ver m&aacute;s detalles'
              className='p-button-link'
              onClick={() =>
                window.open(
                  'https://aws.amazon.com/es/what-is-aws/?nc1=f_cc',
                  '_blank'
                )
              }
            />
          </article>
        </div>
        <div className='fluid-container d-flex justify-content-center justify-content-lg-around align-items-center flex-column flex-lg-row _panel-4 px-2'>
          <article className='_article'>
            <p className='_bold'>Preguntas frecuentes (FAQ)</p>
            <Accordion
              className='w-100'
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}>
              <AccordionTab header='¿Tengo que generar cita para una emergencia?'>
                No es necesario tener cita si tu bienestar est&aacute; en
                peligro. Tu salud para nosotros es importante y contamos con un
                servicio especial para que los pacientes que nos visitan de
                emergencia sean atendidos de manera inmediata.
              </AccordionTab>
              <AccordionTab header='¿Con cu&aacute;nto tiempo de anticipaci&oacute;n tengo que estar para mi cita?'>
                Lo m&aacute;s recomendable es estar 30 minutos antes, por
                cualquier adelantamiento y/o p&eacute;rdida de turno.
              </AccordionTab>
              <AccordionTab header='¿Donde puedo consultar las citas que he tenido anteriormente?'>
                Esta informacion estar&aacute; siempre disponible para t&iacute;
                cuando desees consultarla, solo accede con tu cuenta y en la
                secci&oacute;n (...) podr&aacute;s tener acceso a las citas que
                has tenido anteriormente con tu doctor
              </AccordionTab>
              <AccordionTab header='¿Qu&eacute; sucede si olvido la fecha de mi cita?'>
                No te preocupes, accediendo con tu cuenta podras visualizar de
                forma detallada la fecha y la hora a la que reservaste tu cita,
                aun asi, te recordaremos mediante correo electronico un dia
                antes si tienes una cita programada pendiente
              </AccordionTab>
            </Accordion>
          </article>
          <img
            src={personAsking}
            alt='Illustration person asking'
            className='_asset-image'
          />
        </div>
        <div className='fluid-container  _panel-5 px-2'>
          <article className='container text-center'>
            <p className='_bold'>Sobre nosotros...</p>
            <p className=' _article mx-auto'>
              Somos un equipo de estudiantes de la
              <span className='mx-1' style={{ color: 'var(--primary-color)' }}>
                Universidad de El Salvador
              </span>{' '}
              apasionados por el desarrollo de tecnolog&iacute;as que sean de
              utilidad y sobre todo de ayuda a las personas con el
              prop&oacute;sito de facilitar el acceso al bien mas preciado, como
              lo es la{' '}
              <span className='_bold' style={{ color: 'var(--primary-color)' }}>
                SALUD
              </span>
            </p>
            {creators.map((element, index) => (
              <AvatarComponent
                key={index}
                image={element.image}
                label={element.label}
                linkedIn={element.linkedIn}
              />
            ))}
          </article>
        </div>
      </main>
      <FooterComponent />
    </>
  )
}
export default HomePage
