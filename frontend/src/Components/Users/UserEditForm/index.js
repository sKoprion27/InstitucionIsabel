import './style.scss'
import { useEffect, useState } from 'react'
import { getAllRoles, getOneUser, updateUser } from './../../../helpers/users.helpers'
import { useParams } from 'react-router'
export const UserEditForm = () => {
  const { id } = useParams()
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState({
    nombre: '',
    apellido: '',
    id_role: '',
    correo_electronico: ''
  })
  const { nombre, apellido, correo_electronico } = user
  const getRoles = async () => {
    try {
      const roles = await getAllRoles()
      setRoles(roles)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        setUser(user)
        getRoles()
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  const handlerChange = (e) => {
    setUser(() => {
      return {
        ...user,
        [e.target.name]: e.target.name === 'id_role'
          ? Number(e.target.value)
          : e.target.value
      }
    })
  }
  console.log(user)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    console.log(user, '🚀')
    try {
      const usernew = { id, ...user }
      const response = await updateUser(usernew, id)
      console.log(response, '😀')
    } catch (error) {
      console.log(error.response, '😆')
    }
  }
  return (
    <form className='user__form' onSubmit={handlerSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Nombre</label>
        <input onChange={handlerChange} type='text' className='form-control' name='nombre' value={nombre} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Apellidos</label>
        <input onChange={handlerChange} type='text' className='form-control' name='apellido' value={apellido} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input onChange={handlerChange} type='text' className='form-control' name='correo_electronico' value={correo_electronico} />
      </div>
      <div className='mb-3'>
        <select name='id_role' className='form-select' onChange={handlerChange}>
          {
            roles.map(role => (<option key={role.id} value={role.id}>{role.nombre_role}</option>))
          }

        </select>
      </div>
      <div className='user__btn__container'>
        <button type='submit' className='btn btn-secondary btn-lg' >Actualizar usuario</button>
      </div>

    </form>
  )
}
