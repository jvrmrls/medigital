//import { motion } from 'framer-motion'
import '../assets/css/home-page.css'
import background from '../assets/images/bg-dark.png'
import AvatarComponent from '../components/AvatarComponent'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { m } from 'framer-motion'

const creators = [
  {
    image: 'https://avatars.githubusercontent.com/u/43836850?v=4',
    label: 'JM',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/43689872?v=4',
    label: 'ER',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/43791074?v=4',
    label: 'KC',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/39805471?v=4',
    label: 'CC',
  },
  {
    image: 'https://avatars.githubusercontent.com/u/69808393?v=4',
    label: 'BR',
  },
]

const HomePage = () => {
  return (
    <main>
      <div
        className='fluid-container _panel-1'
        style={{ backgroundImage: `url(${background})` }}>
        <article className='container' style={{ textAlign: 'end' }}>
          <p className='my-0' style={{ fontSize: '1.7rem' }}>
            La vida, no es{' '}
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
          <p className='mt-0' style={{ fontSize: '0.9rem' }}>
            cuida de t&iacute; y de tu familia
          </p>
          <Button className='mt-3' label='Agendar cita' />
        </article>
      </div>
      <div className='fluid-container _panel-2'>
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
            <span style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
              Accede por medio de tu cuenta de Google, Facebook o tu correo
              electr&oacute;nico y contrase&ntilde;a.
            </span>
          </div>
          <div>
            <div>
              <i className='pi pi-check-square '></i>
            </div>
            <p className='_bold mb-0'>Agenda tu cita</p>
            <span style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
              Reserva tu cita de 30 minutos en nuestra cl&iacute;nica desde las
              8:00 A.M. hasta las 5:00 P.M.
            </span>
          </div>
          <div>
            <div>
              <i className='pi pi-building'></i>
            </div>
            <p className='_bold mb-0'>Asiste a la cl&iacute;nica</p>
            <span style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
              Al llegar el momento de la cita, te estaremos esperando para ser
              atendido con nuestros expertos.
            </span>
          </div>
        </article>
      </div>
      <div className='fluid-container _panel-3'>
        <p>asdadasdasda</p>
      </div>
      <div className='fluid-container _panel-4'>asdad</div>
      <div className='fluid-container _panel-5'>
        <article className='container text-center'>
          {creators.map((element) => (
            <AvatarComponent image={element.image} label={element.label} />
          ))}
        </article>
      </div>
    </main>
  )
}
export default HomePage
