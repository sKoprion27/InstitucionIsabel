import { Card, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import './style.scss'

export const NotPermission = () => {
  return (
    <>
      <Card className='layout-permisos'>
        <div className='permisos'>
          <h2>Oops!</h2>
          <Icon>pan_tool</Icon>
        </div>
        <p>No tienes los permisos necesarios, contacta a tu administrador</p>
        <Link className='btn' to='/dashboard'>Ir al home</Link>
      </Card>
    </>
  )
}
