import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'
import '../assets/css/list-appointment.css'
import { Button } from 'primereact/button'
import DatePdfComponent from './DatePdfComponent'
import { PDFDownloadLink } from '@react-pdf/renderer'

const ShowListAppointmentsComponent = ({ appointments, filter }) => {
  return (
    <>
      <div className='w-100 d-flex gap-2 gap-lg-4 flex-wrap justify-content-center align-items-center'>
        <AnimatePresence>
          {appointments
            .filter((item) => {
              if (filter.date && filter.status)
                return (
                  item.status === filter.status &&
                  moment(item.date).isSame(moment(filter.date))
                )
              if (filter.date && !filter.status)
                return moment(item.date).isSame(moment(filter.date))
              if (!filter.date && filter.status)
                return item.status === filter.status
              return item
            })
            .map((item, index) => {
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='_appointment-card'
                    layout='position'
                    key={index}
                    style={{ width: `${randomScale(101, 10, 40, true)}vw` }}
                  >
                    <p
                      className='m-0 _bold'
                      style={{ fontSize: `${randomScale(3, 1.2, 1.8)}rem` }}
                    >
                      {formatDate(item.date)}
                    </p>
                    <p className='m-0'>{item.hour}</p>
                    <p className='_bold m-0'>{item.name}</p>
                    <p className='m-0'>MOTIVO: {item.reason}</p>
                    {item.observations && (
                      <p
                        className='m-0 ps-4'
                        style={{ fontSize: '0.9rem', fontStyle: 'italic' }}
                      >
                        {item.observations}
                      </p>
                    )}

                    <motion.div className='w-100 my-2 d-flex justify-content-end'>
                      <PDFDownloadLink
                        document={<DatePdfComponent data={item} />}
                        fileName={`${item._id}_medigital.pdf`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          icon='pi pi-file-pdf'
                          className='p-button-text p-button-rounded p-button-secondary'
                          tooltip='Descargar PDF'
                          tooltipOptions={{ position: 'bottom' }}
                        />
                      </PDFDownloadLink>

                      <Button
                        icon='pi pi-pencil'
                        className='p-button-text p-button-rounded'
                        tooltip='Editar'
                        tooltipOptions={{ position: 'bottom' }}
                      />
                      <Button
                        icon='pi pi-times'
                        className='p-button-text p-button-rounded p-button-danger'
                        tooltip='Cancelar'
                        tooltipOptions={{ position: 'bottom' }}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )
            })}
        </AnimatePresence>
      </div>
    </>
  )
}

// GET RANDOM WITH FOR THE CARDS
// GET MIN AND MAX VALID RANGE
// IF ITS RESPONSIVE, WILL MULTIPLY THE WITH TWO TIMES
const randomScale = (scale, min, max, responsive = false) => {
  let width = 0
  while (width <= min || width >= max) {
    width = Math.random() * scale
    console.log(width)
  }
  // Verify if the screen is a mobile
  if (responsive) {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      width = width * 2
    }
  }
  return width
}

// FORMAT DATE
const formatDate = (date) => {
  return moment(date).format('ll')
}

export default ShowListAppointmentsComponent
