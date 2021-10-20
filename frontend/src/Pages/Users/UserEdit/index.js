import './style.scss'
import { UserEditForm } from '../../../Components/Users/UserEditForm/index'
import { UserEditPermissions } from '../../../Components/Users/UserEditPermissions'
import { Link } from 'react-router-dom'

export const UserEdit = () => {
  return (
    <div className='row justify-content-center'>
      <div className='user__header'>
        <h1 className='text-center'>Editar usuario</h1>
        <Link to='/dashboard/usuarios' className='btn btn-primary btn-lg' >
          Regresar
        </Link>
      </div>
      <div className='col-12 col-md-6'>
        <UserEditForm />
      </div>
      <div className='col-12 col-md-8'>
        <UserEditPermissions />
      </div>
    </div>
  )
}
