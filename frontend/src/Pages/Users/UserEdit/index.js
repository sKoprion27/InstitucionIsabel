
import { UserEditForm } from '../../../Components/Users/UserEditForm/index'
import { UserEditPermissions } from '../../../Components/Users/UserEditPermissions'

export const UserEdit = () => {
  return (
    <div className='row justify-content-center'>
      <h1 className='text-center'>Editar usuario</h1>
      <div className='col-12 col-md-6'>
        <UserEditForm />
      </div>
      <div className='col-12 col-md-8'>
        <UserEditPermissions />
      </div>
    </div>
  )
}
