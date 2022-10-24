import { getDates } from '../api/endpoints'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import moment from 'moment'
import DateCardComponent from '../components/DateCardComponent'
import LoaderComponent from '../components/LoaderComponent'

const MainDashboardPage = () => {
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const _getDates = async () => {
      setLoading(true)
      const response = await getDates()
      setDates(response)
      setLoading(false)
    }
    _getDates().catch(console.error)
  }, [])

  function changeSelectedDate(item) {
    setSelectedDate(item)
  }

  return (
    <>
      {loading && <LoaderComponent />}
      <main className='container d-flex flex-column justify-content-start gap-3 align-items-start p-2'>
        <ul
          className='d-inline-flex gap-1 justify-content-start justify-content-lg-center overflow-auto w-100 mt-2 mb-0 p-0'
          style={{ listStyle: 'none' }}>
          <AnimatePresence>
            {dates &&
              dates.map((item, index) => {
                return (
                  <motion.li
                    variants={{
                      hidden: (i) => ({ opacity: 0, y: -50 * i }),
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: i * 0.05,
                        },
                      }),
                    }}
                    initial='hidden'
                    animate='visible'
                    custom={index}
                    key={item._id}
                    onClick={() => setSelectedDate(item)}
                    className=' text-center m-0 px-2 py-1 rounded-2  _disable-select-text'
                    style={{
                      cursor: 'pointer',
                      minWidth: '170px',
                      background:
                        selectedDate?._id === item._id
                          ? 'var(--primary-color)'
                          : '',
                      color:
                        selectedDate?._id === item._id
                          ? 'var(--primary-color-text)'
                          : '',
                    }}>
                    <motion.p className='m-0 _bold'>
                      {moment(item.date).format('ll')}
                    </motion.p>
                    <motion.p className='m-0'>{item.hour}</motion.p>
                  </motion.li>
                )
              })}
          </AnimatePresence>
        </ul>
        <div className='w-100'>
          <AnimatePresence initial={false}>
            {selectedDate && (
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    x: -150,
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                  removed: {
                    opacity: 0,
                    x: 150,
                  },
                }}
                initial='hidden'
                animate='visible'
                exit='removed'
                layout='position'
                key={selectedDate._id}
                className='d-flex  flex-column justify-content-between 
                  align-items-start px-3 py-2 p-card'
                style={{ background: 'var(--surface-0)' }}>
                <DateCardComponent
                  content={selectedDate}
                  setSelectedDate={changeSelectedDate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}

export default MainDashboardPage
