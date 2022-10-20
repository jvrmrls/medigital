import NavBarComponent from '../components/NavBarComponent'
import DateCardComponent from '../components/DateCardComponent'
import { getDates } from '../api/endpoints'
import { useEffect, useState } from 'react'

const DashboardPage = () => {
  const [dates, setDates] = useState([])

  useEffect(() => {
    const _getDates = async () => {
      const response = await getDates()
      setDates(response)
    }
    _getDates().catch(console.error)
  }, [])
  return (
    <>
      <NavBarComponent />
      <main className='container d-flex justify-content-start gap-3 align-items-center'>
        {dates.map((item, index) => {
          return <DateCardComponent key={index} data={item} />
        })}
      </main>
    </>
  )
}

export default DashboardPage
