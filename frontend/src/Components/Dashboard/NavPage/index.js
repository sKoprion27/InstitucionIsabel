import { Icon } from 'react-materialize'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
export const NavPage = ({ title, path = '/', onePage, justView }) => {
  const navigate = useNavigate()
  return (
    <div className='navpage'>
      <h2>{justView ? 'Ver detalle' : title}</h2>
      {
        !onePage && (

          <button onClick={() => navigate(-1)} className='btn button-back'>
            <Icon>arrow_back</Icon> <span className='hide-on-small-and-down'>Regresar</span>
          </button>)
      }
    </div>
  )
}
