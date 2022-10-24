import { useState, useEffect } from 'react'
import { Calendar } from 'primereact/calendar'

const CreateDatePage = () => {
  const [date, setDate] = useState(null)
  useEffect(() => {
    console.log(date)
  }, [date])

  const today = new Date()
  let invalidDates = [today]
  return (
    <main className='container d-flex flex-column justify-content-start gap-3 align-items-start p-2'>
      <h5>Crear cita</h5>
      <form className='d-flex flex-column justify-content-center align-items-center w-100'>
        <div className='d-flex flex-column flex-lg-row justify-content-around align-items-start align-items-lg-center w-100'>
          <div className='d-flex gap-2 align-items-center'>
            <label>Fecha</label>
            <Calendar
              value={date?.date}
              onChange={(e) =>
                setDate((current) => {
                  return { ...current, date: e.value }
                })
              }
              disabledDates={invalidDates}
              disabledDays={[6, 0]}
              readOnlyInput
              dateFormat='dd-mm-yy'
            />
          </div>
          <div className='d-flex gap-2 align-items-center'>
            <label>Hora</label>
            <Calendar
              id='time24'
              value={date?.hour}
              onChange={(e) =>
                setDate((current) => {
                  return { ...current, hour: e.value }
                })
              }
              timeOnly
            />
          </div>
        </div>
      </form>
    </main>
  )
}
export default CreateDatePage
