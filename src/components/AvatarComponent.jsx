import { Avatar } from 'primereact/avatar'
const AvatarComponent = ({ image, label, linkedIn }) => {
  return (
    <a href={linkedIn} target='_blank' rel='noreferrer'>
      <Avatar
        image={image}
        label={label}
        size='xlarge'
        shape='circle'
        style={{ margin: '0 -6px' }}
      />
    </a>
  )
}
export default AvatarComponent
