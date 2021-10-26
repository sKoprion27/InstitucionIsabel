/* eslint-disable no-undef */
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../../../Components/Dashboard/Modal'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { getAllUsers } from '../../../helpers/users.helpers'
import { MdDelete, MdVisibility } from 'react-icons/md'
import { useAuth } from './../../../hooks/useAuth'
import { formatDateTable, formatKeyTable } from './../../../utils/index'
import './style.scss'
export const UserList = () => {
  const auth = useAuth()
  const [users, setUsers] = useState([])
  const [usersFilter, setUsersFilter] = useState([])
  const [fetchDelete, setFetchDelete] = useState(false)

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
  }, [fetchDelete])

  const handlerFinder = ({ target }) => {
    console.log(users.filter(user => user.nombre.includes(target.value)))
    if (target.value === '') {
      setUsersFilter(users)
    } else {
      setUsersFilter(users.filter(user => user.nombre.includes(target.value)))
    }
  }
  return (
    <div className='container users'>
      <NavPage title='Lista de usuarios' onePage />
      <div className='row'>
        <div className='user__options'>
          <div className='user__options__buttons'>
            <Link
              to='add'
              className='btn btn-primary'
            >
              Agregar usuario
            </Link>
          </div>
          <div className='user__finder'>
            <label>Buscar usuario</label>
            <input type='text'
              className='form-control'
              onChange={handlerFinder}
              placeholder='Ejemplo'
            />
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table table-hover'>
            <thead className='text-center'>
              <tr>
                {
                  users.length > 0 && (Object.keys(users[0]).map((key, index) => {
                    return (
                      <th key={index} scope='col'>{formatKeyTable(key)}</th>
                    )
                  }))
                }
                <th scope='col'>OPCIONES</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {
                usersFilter.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td scope='row'>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.apellido}</td>
                      <td>{user.correo_electronico}</td>
                      <td>{formatDateTable(user.creado)}</td>
                      <td className='users__buttons'>
                        <Link
                          to={`${user.id}`}
                          className='btn btn-success'>
                          <MdVisibility />
                          Ver más
                        </Link>
                        {
                          auth.user.id === user.id
                            ? (<span
                              className='d-inline-block'
                              tabIndex={0}
                              data-bs-toggle='popover'
                              data-bs-trigger='hover focus'
                              data-bs-content='Disabled popover'
                            >
                              <button
                                className='btn btn-danger'
                                type='button' disabled>
                                <MdDelete />
                                Eliminar
                              </button>
                            </span>)
                            : (<button
                              className='btn btn-danger'
                              data-bs-toggle='modal'
                              data-bs-target={`#deleteModal${user.id}`}
                            >
                              <MdDelete />
                              Eliminar
                            </button>)
                        }

                        <Modal
                          id={user.id}
                          path='users'
                          setFetchDelete={setFetchDelete}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div >
    </div >
  )
}
