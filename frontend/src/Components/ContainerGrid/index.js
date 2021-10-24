import './style.scss'
export const ContainerGrid = ({ children }) => {
  return (
    <div className='col-8 col-md-10'>
      <div className='main'>
        {children}
      </div>
    </div>
  )
}
