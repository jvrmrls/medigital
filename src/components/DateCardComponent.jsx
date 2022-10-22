import AvatarComponent from './AvatarComponent'
import moment from 'moment/moment'
import DatePdfComponent from './DatePdfComponent'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Button } from 'primereact/button'
import { motion } from 'framer-motion'

const DateCardComponent = ({ content, setSelectedDate }) => {
  const parseDate = (date) => {
    return moment(date).format('LL')
  }
  const Footer = () => {
    return (
      <motion.div className=' d-flex justify-content-center gap-3 w-100'>
        <AvatarComponent
          image={content.booked_by.avatar}
          label={content.booked_by.email}
          size={'medium'}
        />
        <div className='m-0 d-flex flex-column text-center'>
          <span className='_bold' style={{ fontSize: '0.8rem' }}>
            Agendado por
          </span>
          <span style={{ fontSize: '0.7rem' }}>
            {content.booked_by.first_name}
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div className='d-flex justify-content-between align-items-center w-100 m-0'>
        <motion.h5 className='p-card-title m-0'>hora: {content.hour}</motion.h5>
        <Button
          icon='pi pi-times'
          className='p-button-text p-button-sm'
          onClick={() => setSelectedDate(null)}
        />
      </motion.div>

      <motion.p className='p-card-subtitle m-0'>
        fecha: {parseDate(content.date)}
      </motion.p>
      <PDFDownloadLink
        document={<DatePdfComponent data={content} />}
        fileName={`${content._id}_medigital.pdf`}>
        <Button icon='pi pi-print' className='p-button-text p-button-sm' />
      </PDFDownloadLink>
      <Footer />
    </>
  )
}

export default DateCardComponent
