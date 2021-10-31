import './style.scss'
import { UserEditForm } from '../../../Components/Users/UserEditForm/index'
import { useParams } from 'react-router'
import { NavPage } from '../../../Components/Dashboard/NavPage'

export const UserEdit = () => {
  const { id } = useParams()

  return (
    <>
      <NavPage title='Editar usuario' path='/dashboard/usuarios' />
      <UserEditForm id={id} />
    </>
  )
}
