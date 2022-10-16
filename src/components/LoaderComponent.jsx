import PropagateLoader from 'react-spinners/PropagateLoader'

const LoaderComponent = ({ status }) => {
  return (
    <>
      <section
        className='d-flex align-items-center justify-content-center top-0 start-0 end-0 bottom-0'
        style={{
          width: '100%',
          height: '100vh',
          zIndex: 100,
          position: 'fixed',
          background: 'var(--maskbg)',
        }}>
        <PropagateLoader
          color='var(--primary-color)'
          loading={status}
          size={15}
          aria-label='cargando'
        />
      </section>
    </>
  )
}
export default LoaderComponent
