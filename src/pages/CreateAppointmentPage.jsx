import { useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import '../assets/css/appointment.css'
import RadioButtomSelectorHourComponent from '../components/RadioButtonSelectorHourComponent'
import BreadCrumbComponent from '../components/BreadCrumbComponent'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import LoaderComponent from '../components/LoaderComponent.jsx'
import { useNavigate } from 'react-router-dom'
import { createAppointment } from '../api/endpoints'
import { ToastContainer, toast } from 'react-toastify'
const items = [
  {
    label: 'Citas',
    //url: '',
  },
]

const home = {
  label: 'Dashboard',
  icon: '',
  //url: 'https://www.primefaces.org/primereact',
}
const today = new Date()

const morningHours = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
]
const afternoonHours = [
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
]
const CreateAppointmentPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState({
    date: null,
    hour: null,
    name: '',
    reason: '',
  })
  async function _createAppointment(data) {
    // Validate data
    const isValidated = validateData(data)
    if (!isValidated.status) {
      toast(isValidated.msg, {
        type: 'warning',
      })
      return
    }
    try {
      setLoading(true)
      formatDate(data.date)
      await createAppointment({
        ...data,
        date: formatDate(data.date),
      })
      toast('Se creó la cita', { type: 'success' })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      if (err.response?.status === 422) {
        const { errors } = err.response.data
        errors.forEach((element) => {
          toast(element.msg, {
            type: 'error',
          })
        })
      } else {
        toast('No se pudo guardar la cita. Intente más tarde.', {
          type: 'error',
        })
      }
    }
    setLoading(false)
  }
  function validateData(data) {
    if (data.date === '' || data.date === null)
      return { msg: 'La fecha es requerida', status: false }
    if (data.hour === '' || data.hour === null)
      return { msg: 'La hora es requerida', status: false }
    if (data.name === '')
      return { msg: 'El nombre de paciente es requerido', status: false }
    if (data.reason === '')
      return { msg: 'El motivo es requerido', status: false }
    return { msg: '', status: true }
  }
  function formatDate(date) {
    const dateWithCorrectFormat = date.toISOString()
    return dateWithCorrectFormat
  }
  return (
    <>
      <ToastContainer />
      {loading && <LoaderComponent />}
      <BreadCrumbComponent items={items} home={home} />
      <main className='container '>
        <div className='row  pt-2'>
          <div className='col-12 col-md-4 '>
            <Calendar
              value={appointment?.date}
              onChange={(e) =>
                setAppointment((current) => {
                  return { ...current, date: e.value }
                })
              }
              disabledDays={[0, 6]}
              visible={true}
              disabledDates={[today]}
              minDate={today}
              inline
              className='w-100'
            ></Calendar>
          </div>
          <div className='col-12 col-md-8 _bg-principal px-3'>
            <span className='d-flex gap-2 align-items-center mt-2'>
              <i className='pi pi-sun'></i>
              <span>Horas de la ma&ntilde;ana </span>
            </span>
            <p className='m-0 text-muted' style={{ fontSize: '.8rem' }}>
              De 8:00 a 12:00
            </p>
            <section className='w-100 d-flex flex-wrap gap-3 justify-content-around align-items-center mt-3'>
              {morningHours.map((item, index) => {
                return (
                  <RadioButtomSelectorHourComponent
                    item={item}
                    appointment={appointment}
                    key={index}
                    setAppointment={setAppointment}
                  />
                )
              })}
            </section>
            <span className='d-flex gap-2 align-items-center mt-2'>
              <i className='pi pi-sun'></i>
              <span>Horas de la tarde </span>
            </span>
            <p className='m-0 text-muted' style={{ fontSize: '.8rem' }}>
              De 13:00 a 17:00
            </p>
            <section className='w-100 d-flex flex-wrap gap-3 justify-content-around align-items-center mt-3'>
              {afternoonHours.map((item, index) => {
                return (
                  <RadioButtomSelectorHourComponent
                    item={item}
                    appointment={appointment}
                    key={index}
                    setAppointment={setAppointment}
                  />
                )
              })}
            </section>
            <div className='row'>
              <div className='col-6 mt-3'>
                <label htmlFor=''>Nombre de paciente *</label>
                <InputText
                  value={appointment?.name}
                  className='w-100 text-uppercase'
                  placeholder='Ingrese el nombre del paciente'
                  onChange={(e) => {
                    setAppointment((current) => {
                      return { ...current, name: e.target.value }
                    })
                  }}
                />
              </div>
              <div className='col-6 mt-3'>
                <label htmlFor=''>Motivo *</label>
                <InputText
                  className='w-100 text-uppercase'
                  value={appointment?.reason}
                  placeholder='Ingrese el motivo de la cita'
                  onChange={(e) => {
                    setAppointment((current) => {
                      return { ...current, reason: e.target.value }
                    })
                  }}
                />
              </div>
              <div className='col-12 mt-3'>
                <label htmlFor=''>Observaciones</label>
                <InputTextarea
                  className='w-100 text-uppercase'
                  rows={2}
                  value={appointment?.observations}
                  placeholder='Ingrese las observaciones'
                  onChange={(e) => {
                    setAppointment((current) => {
                      return { ...current, observations: e.target.value }
                    })
                  }}
                />
              </div>
            </div>
            <Button
              label='Guardar'
              className=''
              icon='pi pi-save'
              style={{ minWidth: '200px' }}
              onClick={() => _createAppointment(appointment)}
            />
            <p className='text-muted ms-2  my-0' style={{ fontSize: '.8rem' }}>
              * campos requeridos
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default CreateAppointmentPage