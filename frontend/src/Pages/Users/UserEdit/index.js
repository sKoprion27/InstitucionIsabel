import './style.scss'
import { UserEditForm } from '../../../Components/Users/UserEditForm/index'
import { useParams } from 'react-router'
import { NavPage } from '../../../Components/Dashboard/NavPage'

export const UserEdit = () => {
  const { id } = useParams()

  return (
    <div className='container'>
      <NavPage title='Editar usuario' path='/dashboard/usuarios' />
      <div className='row justify-content-center'>
        <div className='col-10 col-md-6'>
          <UserEditForm id={id} />
        </div>
      </div>
    </div>
  )
}
