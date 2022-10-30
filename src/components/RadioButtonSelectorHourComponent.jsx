import { RadioButton } from 'primereact/radiobutton'

const RadioButtomSelectorHourComponent = ({
  item,
  status,
  appointment,
  setAppointment,
  isEditMode = false,
}) => {
  return (
    <div
      className='field-radiobutton border px-3 py-2 border-1 '
      style={{
        minWidth: '100px',
        borderRadius: '10px',
        backgroundColor: !status ? 'var(--primary-color)' : '',
        color: !status ? 'var(--primary-color-text)' : '',
      }}
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
        disabled={!status ? true : false}
        tooltip={isEditMode ? '' : !status ? 'Ocupado' : 'Disponible'}
        tooltipOptions={{ position: 'bottom' }}
      />
      <label htmlFor='hour' className='ms-2'>
        {item}
      </label>
    </div>
  )
}

export default RadioButtomSelectorHourComponent
