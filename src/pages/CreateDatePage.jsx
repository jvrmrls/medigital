import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'primereact/calendar'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { createDate } from '../api/endpoints'
import LoaderComponent from '../components/LoaderComponent.jsx'

const CreateDatePage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState({
    name: '',
    date: null,
    hour: null,
    reason: '',
    observations: '',
  })
  useEffect(() => {}, [date])

  const today = new Date()
  let invalidDates = [today]

  async function _createDate(date) {
    // Validate data
    if (!validateData(date)) {
      return
    }
    try {
      setLoading(true)
      formatDate(date.date)
      await createDate({
        ...date,
        hour: formatHour(date.hour),
        date: formatDate(date.date),
      })
      navigate('/dashboard', { replace: true })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  function validateData(data) {
    if (data.name === '') return false
    if (data.date === '' || data.date === null) return false
    if (data.hour === '' || data.hour === null) return false
    if (data.reason === '') return false
    return true
  }

  function formatHour(hour) {
    const hourWithCorrectFormat = hour
      .toLocaleString()
      .split(' ')[1]
      .slice(0, 5)
    return hourWithCorrectFormat
  }
  function formatDate(date) {
    const dateWithCorrectFormat = date.toISOString()
    return dateWithCorrectFormat
  }

  return (
    <>
      {loading && <LoaderComponent />}
      <main className='container p-2' style={{ minHeight: '70vh' }}>
        <div className='row'>
          <div className='col-12 my-4'>
            <p className='_bold' style={{ color: 'var(--primary-color)' }}>
              Creaci&oacute;n de cita
            </p>
            <p className='text-muted' style={{ textAlign: 'justify' }}>
              Posterior a la creaci&oacute;n de la cita, se generar&aacute; el
              documento PDF de la cita el cual se debe llevar impreso o en
              digital a la recepci&oacute;n de la instituci&oacute;n. Se le
              recordar&aacute; v&iacute;a correo electr&oacute;nico un
              d&iacute;a antes de la cita programada.
            </p>
            <hr />
          </div>
          <div className='col-12 col-md-6 mb-4'>
            <span className='p-float-label'>
              <InputText
                id='name'
                className='w-100'
                value={date?.name}
                onChange={(e) =>
                  setDate((current) => {
                    return { ...current, name: e.target.value }
                  })
                }
              />
              <label htmlFor='name'>Nombre del paciente</label>
            </span>
          </div>
          <div className='col-6 col-md-3 mb-md-4 mt-md-0 my-4'>
            <span className='p-float-label'>
              <Calendar
                value={date?.date}
                onChange={(e) =>
                  setDate((current) => {
                    return { ...current, date: e.value }
                  })
                }
                disabledDates={invalidDates}
                disabledDays={[6, 0]}
                minDate={today}
                readOnlyInput
                dateFormat='dd-mm-yy'
                id='date'
                className='w-100'
              />
              <label htmlFor='date'>Fecha</label>
            </span>
          </div>
          <div className='col-6 col-md-3 my-4  mb-md-4 mt-md-0'>
            <span className='p-float-label'>
              <Calendar
                id='hour'
                className='w-100'
                value={date?.hour}
                onChange={(e) =>
                  setDate((current) => {
                    return { ...current, hour: e.value }
                  })
                }
                timeOnly
                stepMinute={30}
              />
              <label htmlFor='hour'>Hora</label>
            </span>
          </div>
          <div className='col-12 col-md-6 my-4'>
            <span className='p-float-label'>
              <InputTextarea
                rows={4}
                id='reason'
                className='w-100'
                value={date?.reason}
                onChange={(e) =>
                  setDate((current) => {
                    return { ...current, reason: e.target.value }
                  })
                }
              />
              <label htmlFor='reason'>Motivo</label>
            </span>
          </div>
          <div className='col-12 col-md-6 my-4'>
            <span className='p-float-label'>
              <InputTextarea
                rows={4}
                id='observations'
                className='w-100'
                value={date?.observations}
                onChange={(e) =>
                  setDate((current) => {
                    return { ...current, observations: e.target.value }
                  })
                }
              />
              <label htmlFor='observations'>Observaciones</label>
            </span>
          </div>
        </div>
        <Button
          label='Crear cita'
          icon='pi pi-plus'
          className='d-block mx-auto'
          style={{ width: '200px' }}
          onClick={() => _createDate(date)}
        />
      </main>
    </>
  )
}
export default CreateDatePage
