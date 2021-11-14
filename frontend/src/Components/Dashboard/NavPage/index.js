import { Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'
export const NavPage = ({ title, path = '/', onePage, justView }) => {
  return (
    <div className='navpage'>
      <h2>{justView ? 'Ver detalle' : title}</h2>
      {
        !onePage && (
          <Link to={path} className='btn button-back'>
            <Icon>arrow_back</Icon> <span className='hide-on-small-and-down'>Regresar</span>
          </Link>)
      }
    </div>
  )
}
