import { BreadCrumb } from 'primereact/breadcrumb'

const BreadCrumbComponent = ({ items, home }) => {
  return (
    <>
      <BreadCrumb model={items} home={home} style={{ border: 'none' }} />
    </>
  )
}

export default BreadCrumbComponent
