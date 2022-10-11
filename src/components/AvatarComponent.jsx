import { Avatar } from 'primereact/avatar'
const AvatarComponent = ({ image, label }) => {
  return (
    <Avatar
      image={image}
      label={label}
      size='xlarge'
      shape='circle'
      style={{ margin: '0 -6px' }}
    />
  )
}
export default AvatarComponent
