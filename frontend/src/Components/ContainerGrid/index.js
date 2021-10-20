import './style.scss'
export const ContainerGrid = ({ children }) => {
  return (
    <div className='col-8 col-md-9 main pt-4'>
      {children}
    </div>
  )
}
