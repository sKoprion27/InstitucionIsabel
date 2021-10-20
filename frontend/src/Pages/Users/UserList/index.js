import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../helpers/users.helpers'
import { Link } from 'react-router-dom'
export const UserList = () => {
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
    <div className='container users'>
      <div className='row'>
        <h4>Lista de usuarios</h4>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                {
                  users.length > 0 && (Object.keys(users[0]).map((key, index) => {
                    return (
                      <th key={index} scope='col'>{formatKey(key)}</th>
                    )
                  }))
                }
                <th scope='col'>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td scope='row'>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.nombre}</td>
                      <td>{user.apellido}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`${user.id}`} className='btn btn-primary btn-sm'>Editar</Link>
                        <Link to={`${user.id}`} className='btn btn-danger btn-sm'>Eliminar</Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const formatKey = (key) => {
  const format = key.replace(/_/g, ' ').toUpperCase()
  return format
}
