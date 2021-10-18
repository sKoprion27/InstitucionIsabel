export const Notification = ({ type, message }) => {
  return (
    <div className={`text-center mt-4 bg-${type === 'success' ? 'primary' : 'danger'} text-light`} role='alert'>
      {message}
    </div>

  )
}
