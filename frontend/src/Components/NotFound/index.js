import { Card, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'

export const NotFound = () => {
  return (
    <Card className='layout hoverable'>
      <div className='notfound'>
        <h2>RECURSO NO ENCONTRADO!</h2>
        <Icon>android</Icon>
      </div>
      <p className='red-text'>ERROR 404</p>
      <Link className='btn' to='/dashboard'>Ir al home</Link>
    </Card>
  )
}
