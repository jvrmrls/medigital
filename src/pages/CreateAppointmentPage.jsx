import { useState, useEffect } from 'react'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import '../assets/css/appointment.css'
import RadioButtomSelectorHourComponent from '../components/RadioButtonSelectorHourComponent'
import BreadCrumbComponent from '../components/BreadCrumbComponent'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import LoaderComponent from '../components/LoaderComponent.jsx'
import { useNavigate } from 'react-router-dom'
import {
  createAppointment,
  getAvailableHoursAppointments,
} from '../api/endpoints'
import { ToastContainer, toast } from 'react-toastify'
const items = [
  {
    label: 'Crear cita',
  },
]

const home = {
  label: 'Dashboard',
  icon: 'pi pi-home',
  url: '/dashboard',
}
const today = new Date()

const CreateAppointmentPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [appointment, setAppointment] = useState({
    date: null,
    hour: null,
    name: '',
    reason: '',
  })
  const [availableHours, setAvailableHours] = useState(null)

  useEffect(() => {
    async function _getAvailableHoursAppointments(date) {
      try {
        setLoading(true)
        const response = await getAvailableHoursAppointments(date)
        setAvailableHours(response)
      } catch (err) {
        toast(err.msg, {
          type: 'error',
        })
      }
      setLoading(false)
    }
    if (appointment.date) {
      _getAvailableHoursAppointments(
        appointment.date.toISOString().slice(0, 10)
      )
    }
  }, [appointment.date])
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
    return date.toISOString()
  }
  return (
    <>
      <ToastContainer />
      {loading && <LoaderComponent />}
      <BreadCrumbComponent items={items} home={home} />
      <main className='container mb-3'>
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
              {availableHours
                ? availableHours.morningBusinessHours.map((item, index) => {
                    return (
                      <RadioButtomSelectorHourComponent
                        item={item.hour}
                        status={item.status}
                        appointment={appointment}
                        key={index}
                        setAppointment={setAppointment}
                      />
                    )
                  })
                : null}
            </section>
            <span className='d-flex gap-2 align-items-center mt-2'>
              <i className='pi pi-sun'></i>
              <span>Horas de la tarde </span>
            </span>
            <p className='m-0 text-muted' style={{ fontSize: '.8rem' }}>
              De 13:00 a 17:00
            </p>
            <section className='w-100 d-flex flex-wrap gap-3 justify-content-around align-items-center mt-3'>
              {availableHours
                ? availableHours.afternoonBusinessHours.map((item, index) => {
                    return (
                      <RadioButtomSelectorHourComponent
                        item={item.hour}
                        status={item.status}
                        appointment={appointment}
                        key={index}
                        setAppointment={setAppointment}
                      />
                    )
                  })
                : null}
            </section>
            <div className='row'>
              <div className='col-12 col-md-6 mt-3'>
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
              <div className='col-12 col-md-6 mt-3'>
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
