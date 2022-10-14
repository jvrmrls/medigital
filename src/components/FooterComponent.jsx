import moment from 'moment'

const _YEAR = moment().format('YYYY')

const FooterComponent = () => {
  return (
    <footer
      className='d-flex flex-column flex-lg-row justify-content-center justify-content-lg-between align-items-center gap-2 px-2 px-lg-3 py-2 py-lg-4'
      style={{ minHeight: '50px' }}>
      <div>
        <p className='_bold m-0' style={{ fontSize: '0.9rem' }}>
          Todos los derechos reservados
        </p>
        <p
          className='m-0'
          style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>
          @copyright {_YEAR}
        </p>
      </div>
      <div className='d-flex flex-row gap-2 m-0'>
        <i className='pi pi-whatsapp'></i>
        <i className='pi pi-facebook'></i>
        <i className='pi pi-instagram'></i>
        <i className='pi pi-twitter'></i>
      </div>
    </footer>
  )
}
export default FooterComponent
