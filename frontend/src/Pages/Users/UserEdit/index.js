import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneUser } from '../../../helpers/users.helpers'
import { Dashboard } from '../../Dashboard/index'
import { ContainerGrid } from '../../../Components/ContainerGrid/index'
import { UserEditForm } from '../../../Components/Users/UserEditForm/index'

export const UserEdit = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        setUser(user)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [id])
  return (
    <Dashboard>
      <ContainerGrid>
        <div className='row justify-content-center'>
          <h1 className='text-center'>Editar usuario</h1>
          <div className='col-6'>
            <UserEditForm {...user} />
          </div>
        </div>
      </ContainerGrid>
    </Dashboard>
  )
}
