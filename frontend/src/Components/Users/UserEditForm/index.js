import { useForm } from '../../../hooks/useForm'
import { getOneUser, updateUser } from '../../../helpers/users.helpers'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './style.scss'

export const UserEditForm = ({ id }) => {
  const [edit, setEdit] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)
  const [form, setForm, handlerChange] = useForm({
    nombre: '',
    apellido: '',
    correo_electronico: '',
    password: ''
  })
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        setForm(user)
      } catch (error) {
        setForm(null)
      }
    }
    getUser()
  }, [id, fetchUpdate])
  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser(form, id)
      setFetchUpdate(!fetchUpdate)
      alert('Usuario actualizado')
      setEdit(false)
    } catch (error) {
      console.log(error, 'Update user')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }
  if (form === null) {
    return <Navigate to='/dashboard/usuarios' />
  }
  return (
    <>
      <h3 className='text-muted'>Información de usuario</h3>
      <form className='user__form' onSubmit={handlerSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Nombre</label>
          <input
            onChange={handlerChange}
            type='text'
            className='form-control'
            name='nombre'
            value={form.nombre}
            disabled={!edit} />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Apellidos</label>
          <input
            onChange={handlerChange}
            type='text'
            className='form-control'
            name='apellido'
            value={form.apellido}
            disabled={!edit}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            onChange={handlerChange}
            type='text'
            className='form-control'
            name='correo_electronico'
            value={form.correo_electronico}
            disabled={!edit}
          />
        </div>

        <div className='user__btn__container'>
          <button
            type='submit'
            className='btn btn-success  '
            disabled={!edit}
          >
            Actualizar
          </button>

          <Link
            to='password'
          >
            <button type='button' className='btn btn-primary  '
              disabled={!edit}>
              Reestablecer contraseña
            </button>
          </Link>
          <button
            type='button'
            className={`btn btn-${edit ? 'danger' : 'primary'} `}
            onClick={handlerEdit}
          >
            {
              edit ? 'Cancelar' : 'Editar'
            }
          </button>
        </div>
      </form>
    </>
  )
}
