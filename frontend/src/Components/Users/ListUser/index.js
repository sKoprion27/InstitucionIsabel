import { ContainerGrid } from '../../ContainerGrid'
import { useEffect, useState } from 'react'
import { getAllUsers } from './../../../helpers/users.helpers'
export const ListUser = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers()
        setUsers(users)
      } catch (error) {
        console.log(error.response)
      }
    }
    getUsers()
  }, [])
  return (
    <ContainerGrid>
      <div className='container users'>
        <div className='row'>
          <h4>Usuarios</h4>
          {
            JSON.stringify(users)
          }
        </div>
      </div>
    </ContainerGrid>
  )
}
