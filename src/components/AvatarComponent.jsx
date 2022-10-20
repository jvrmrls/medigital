import { Avatar } from 'primereact/avatar'
const AvatarComponent = ({
  image,
  label = null,
  linkedIn = null,
  size = 'xlarge',
}) => {
  return (
    <a href={linkedIn} target='_blank' rel='noreferrer'>
      <Avatar
        image={image}
        label={label}
        size={size}
        shape='circle'
        style={{ margin: '0 -6px' }}
      />
    </a>
  )
}
export default AvatarComponent
