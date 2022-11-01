import { getAppointments, cancelAppointment } from '../api/endpoints'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import moment from 'moment'
import LoaderComponent from '../components/LoaderComponent'
import '../assets/css/main-dashboard.css'
import pendingAppointmentsImage from '../assets/images/pending_appointments.svg'
import ShowListAppointmentsComponent from '../components/ShowListAppointmentsComponent'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { ToastContainer, toast } from 'react-toastify'

const statusAppointment = [
  { label: '--TODAS--', value: null },
  { label: 'PENDIENTE', value: 'PENDING' },
  { label: 'EN ESPERA', value: 'WAITING' },
  { label: 'EN PROCESO', value: 'IN PROGRESS' },
  { label: 'FINALIZADA', value: 'FINISHED' },
  { label: 'CANCELADA', value: 'CANCELED' },
]

const MainDashboardPage = () => {
  const [appointments, setAppointments] = useState([])
  const [filter, setFilter] = useState({
    status: 'PENDING',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    _getAppointments().catch(console.error)
  }, [])

  const _getAppointments = async () => {
    setLoading(true)
    const response = await getAppointments()
    setAppointments(response)
    setLoading(false)
  }
  const _cancelAppointment = async (appointment) => {
    try {
      setLoading(true)
      await cancelAppointment(appointment)
      _getAppointments()
    } catch (err) {
      if (err.response?.status === 422) {
        const { errors } = err.response.data
        errors.forEach((element) => {
          toast(element.msg, {
            type: 'error',
          })
        })
      } else {
        toast('No se pudo actualizar la cita. Intente más tarde.', {
          type: 'error',
        })
      }
    }

    setLoading(false)
  }
  function AppointmentsCounter({ appointments }) {
    const style = {
      fontSize: '1.5rem',
      fontStyle: 'italic',
    }
    // Filter appointments only for today
    const todayAppointments = appointments.filter((item) => {
      return (
        moment(item.date).isSame(new Date(), 'day') && item.status === 'PENDING'
      )
    })
    const counter = todayAppointments.length
    if (counter > 0 && !loading) {
      return (
        <>
          <span className='mb-3' style={style}>
            {counter} cita(s) pendiente(s) para hoy
          </span>
          {todayAppointments.map((item) => {
            return (
              <div className='my-1' key={item._id}>
                A las
                <span className='_bold mx-2'>{item.hour}</span>por
                <span
                  className='text-uppercase mx-2'
                  style={{ color: 'var(--primary-color)' }}
                >
                  {item.reason}
                </span>
              </div>
            )
          })}
        </>
      )
    }
    if (!loading) {
      return <span style={style}>Al parecer hoy no nos visitar&aacute;s</span>
    }
  }

  return (
    <>
      <ToastContainer />
      {loading && <LoaderComponent />}
      <main className='fluid-container d-flex flex-column justify-content-start gap-3 align-items-start'>
        <motion.div
          className='_today d-flex flex-column justify-content-around align-items-center w-100'
          style={{ backgroundColor: 'var(--surface-0)' }}
        >
          <div className='text-center container'>
            <p className='_bold'>Veamos que tienes que hacer por hoy...</p>
            <AppointmentsCounter appointments={appointments} />
          </div>
          <img
            src={pendingAppointmentsImage}
            alt='person-with-red'
            className='_asset-image'
          />
        </motion.div>
        <section className='_all-appointments w-100'>
          <p className='text-center _bold' style={{ fontSize: '2rem' }}>
            Listado de citas
          </p>
          <form className='w-100 d-flex flex-row flex-wrap justify-content-center gap-3 align-items-center mb-3'>
            <Dropdown
              value={filter.status}
              options={statusAppointment}
              onChange={(e) =>
                setFilter((current) => {
                  return { ...current, status: e.value }
                })
              }
              placeholder='Seleccione estado'
              style={{ minWidth: '250px' }}
            />
            <Calendar
              value={filter.date}
              onChange={(e) =>
                setFilter((current) => {
                  return { ...current, date: e.value }
                })
              }
              placeholder='Seleccione fecha'
              style={{ minWidth: '250px' }}
              showButtonBar={true}
            ></Calendar>
          </form>
          <ShowListAppointmentsComponent
            appointments={appointments}
            filter={filter}
            _cancelAppointment={_cancelAppointment}
          />
        </section>
      </main>
    </>
  )
}

export default MainDashboardPage
