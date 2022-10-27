import moment from 'moment'
import { motion, AnimatePresence } from 'framer-motion'

const ShowListAppointmentsComponent = ({ appointments, filter }) => {

  return (
    <>
    <div className='w-100 container p-2 p-lg-4' style={{ background: 'var(--surface-0)' }}>
        <ul >
          <AnimatePresence>
            {
              appointments.filter((item) => {
                if (filter.date && filter.status) return item.status === filter.status && moment(item.date).isSame(moment(filter.date))
                if (filter.date && !filter.status) return moment(item.date).isSame(moment(filter.date))
                if (!filter.date && filter.status) return item.status === filter.status
                return item
              }).map((item, index) => {
                return (<motion.li key={index}>{item.reason}</motion.li>)
              })
            }
          </AnimatePresence>
        </ul>
      </div>

    </>
  )
}

export default ShowListAppointmentsComponent