import { Card } from 'primereact/card'
import AvatarComponent from './AvatarComponent'
import moment from 'moment/moment'
const DateCardComponent = ({ data }) => {
  const parseDate = (date) => {
    return moment(date).format('ll')
  }
  const footer = (
    <>
      <div className=' d-flex justify-content-around '>
        <AvatarComponent
          image={data.booked_by.avatar}
          label={data.booked_by.email}
          size={'medium'}
        />
        <div className='m-0 d-flex flex-column text-center'>
          <span className='_bold' style={{ fontSize: '0.8rem' }}>
            Agendado por
          </span>
          <span style={{ fontSize: '0.7rem' }}>
            {data.booked_by.first_name}
          </span>
        </div>
      </div>
    </>
  )
  return (
    <Card
      title={data.hour}
      subTitle={parseDate(data.date)}
      footer={footer}
      style={{ maxWidth: '30%', minWidth: '200px' }}>
      {data.reason}
    </Card>
  )
}

export default DateCardComponent
