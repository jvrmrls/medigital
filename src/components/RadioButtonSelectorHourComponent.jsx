import { RadioButton } from 'primereact/radiobutton'

const RadioButtomSelectorHourComponent = ({
  item,
  appointment,
  setAppointment,
}) => {
  return (
    <div
      className='field-radiobutton border px-3 py-2 border-1 '
      style={{ minWidth: '100px', borderRadius: '10px' }}
    >
      <RadioButton
        value={item}
        name='hour'
        onChange={(e) =>
          setAppointment((current) => {
            return { ...current, hour: e.value }
          })
        }
        checked={item === appointment.hour}
      />
      <label htmlFor='hour' className='ms-2'>
        {item}
      </label>
    </div>
  )
}

export default RadioButtomSelectorHourComponent
