import { Link } from 'react-router-dom'
export const NavPage = ({ title, path = '/', onePage }) => {
  return (
    <div className='container-fluid'>
      <div className='row justify-content-between '>
        <div className='col-4'>
          <h2>{title}</h2>
        </div>
        {
          !onePage && (<div className='col-2'>
            <Link to={path} className='btn btn-primary btn-lg'>
              Regresar
            </Link>
          </div>)
        }
      </div>
    </div>
  )
}
