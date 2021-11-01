/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../../../Components/Dashboard/Modal'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { getAllUsers } from '../../../helpers/users.helpers'
import { useAuth } from './../../../hooks/useAuth'
import { formatKeyTable } from './../../../utils/index'
import { Icon } from 'react-materialize'
import './style.scss'

export const UserList = () => {
  const auth = useAuth()
  const [users, setUsers] = useState([])
  const [usersFilter, setUsersFilter] = useState([])
  const [fetchAction, setFetchAction] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getAllUsers()
        setUsers(users)
        setUsersFilter(users)
      } catch (error) {
        console.log(error.response)
      }
    }
    getUsers()
  }, [fetchAction])

  const handlerFinder = ({ target }) => {
    console.log(users.filter(user => user.nombre.includes(target.value)))
    if (target.value === '') {
      setUsersFilter(users)
    } else {
      setUsersFilter(users.filter(user => user.nombre.includes(target.value)))
    }
  }
  return (
    <>
      <NavPage title='Lista de usuarios' onePage />
      <div className='menu'>
        <Link
          to='add'
          className='btn'
        >
          Agregar usuario
        </Link>
        <div className='input-field'>
          <label>Buscar usuario</label>
          <input
            type='text'
            onChange={handlerFinder}
          />
        </div>
      </div>
      <div className='responsive-table'>
        <table className='highlight striped'>
          <thead>
            <tr>
              {
                users.length > 0 &&
                (Object.keys(users[0])
                  .filter(key => (key !== 'id') && (key !== 'creado'))
                  .map((key, index) => {
                    return (
                      <th key={index}>{formatKeyTable(key)}</th>
                    )
                  }))
              }
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              usersFilter.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.correo_electronico}</td>
                    <td className='options'>
                      <Link
                        to={`${user.id}`}
                        className='btn btn-success'>
                        <Icon>edit</Icon>
                      </Link>
                      <button
                        className='btn orange'
                        type='button'
                        disabled={auth.user.id === user.id}
                      >
                        <Icon>person_add_disabled</Icon>
                      </button>
                      <Modal id={user.id} path='users' setFetch={setFetchAction} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </ >
  )
}
