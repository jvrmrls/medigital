import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { getSpecificAppointment } from '../api/endpoints'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import BreadCrumbComponent from '../components/BreadCrumbComponent'
import RadioButtomSelectorHourComponent from '../components/RadioButtonSelectorHourComponent'
import LoaderComponent from '../components/LoaderComponent.jsx'
import { updateAppointment } from '../api/endpoints'
import { useNavigate } from 'react-router-dom'

const items = [
    {
        label: 'Editar cita',
    },
    ]

const home = {
    label: 'Dashboard',
    icon: 'pi pi-home',
    url: '/dashboard',
}

const UpdateAppointmentPage = () => {
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(false)
  const { _id } = useParams()
  useEffect(() => {
    async function _getAvailableHoursAppointments(_id) {
      try {
        setLoading(true)
        const response = await getSpecificAppointment(_id)
        setAppointment(response)
      } catch (err) {
        toast(err.msg, {
          type: 'error',
        })
      }
      setLoading(false)
    }

    _getAvailableHoursAppointments(_id)
  }, [_id])

  async function _updateAppointment(data) {
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
      await updateAppointment(data)
      toast('Se actualizó la cita', { type: 'success' })
      navigate('/dashboard')
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

  return (
    <>
      <ToastContainer />
    {loading && <LoaderComponent />}
    <BreadCrumbComponent items={items} home={home} />
      <main className='container mb-3'>
        <div className='row  pt-2'>
          {appointment ? (
            <>
              <div className='col-12 col-md-4 '>
                <Calendar
                  value={new Date(appointment.date)}
                  visible={true}
                  inline
                  className='w-100'
                  disabled
                ></Calendar>
              </div>
              <div className='col-12 col-md-8 _bg-principal px-3'>
                <span className='d-flex gap-2 align-items-center mt-2'>
                  <i className='pi pi-sun'></i>
                  <span>Hora de la cita </span>
                </span>
                <div className='d-flex justify-content-start'>
                  <RadioButtomSelectorHourComponent
                    item={appointment.hour}
                    status={false}
                    appointment={appointment}
                    isEditMode={true}
                  />
                </div>

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
                  onClick={() => _updateAppointment(appointment)}
                />
                <p
                  className='text-muted ms-2  my-0'
                  style={{ fontSize: '.8rem' }}
                >
                  * campos requeridos
                </p>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  )
}

export default UpdateAppointmentPage
