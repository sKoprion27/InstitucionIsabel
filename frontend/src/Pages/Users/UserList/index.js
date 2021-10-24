import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../helpers/users.helpers'
import { Link } from 'react-router-dom'
import './style.scss'
import { formatDateTable, formatKeyTable } from './../../../utils/index'
import { MdDelete, MdOutlineMode } from 'react-icons/md'
export const UserList = () => {
  const [users, setUsers] = useState([])
  const [usersFilter, setUsersFilter] = useState([])
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
  }, [])

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
      <div className='row'>
        <h2>Lista de usuarios</h2>
        <div className='user__options'>
          <div className='user__options__buttons'>
            <Link to='add' className='btn btn-primary'>Agregar usuario</Link>
            <button to='add' className='btn btn-primary'>Descargar excel</button>
          </div>
          <div className='user__finder'>
            <label>Buscar usuario</label>
            <input type='text' className='form-control' onChange={handlerFinder} placeholder='Ejemplo' />
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
                        <Link to={`${user.id}`} className='btn btn-success'>
                          <MdOutlineMode /> Editar
                        </Link>
                        <button className='btn btn-danger' data-bs-toggle='modal' data-bs-target={`#deleteModal${user.id}`}>
                          <MdDelete /> Eliminar
                        </button>
                        <Modal id={user.id} />
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

const Modal = ({ id }) => {
  return (
    <div className='modal fade' id={`deleteModal${id}`} tabIndex={-1} aria-labelledby='deleteModalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
          </div>
          <div className='modal-body'>
            <h3>Estas seguro que deseas eliminar este elemento</h3>
          </div>
          <div className='modal-footer justify-content-center'>
            <button type='button' className='btn btn-success'>Si, guardar cambios</button>
            <button type='button' className='btn btn-warning' data-bs-dismiss='modal'>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
