// import { useForm } from '../../../hooks/useForm'
import { getOneUser, updateUser } from '../../../helpers/users.helpers'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import './style.scss'

export const UserEditForm = ({ id }) => {
  const [edit, setEdit] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getOneUser(id)
        reset(user)
      } catch (error) {
        setEdit(null)
      }
    }
    getUser()
  }, [id, edit])
  const handlerSubmit = async (data) => {
    try {
      await updateUser(data, id)
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
  if (edit === null) {
    return <Navigate to='/dashboard/usuarios' />
  }
  return (
    <>
      <p>Información de usuario</p>
      <form
        className='user__form'
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <div>
          <label>Nombre</label>
          <input
            onChange={register}
            type='text'
            name='nombre'
            {
            ...register('nombre', {
              required: true
            })
            }
            disabled={!edit} />
          {errors.nombre?.type === 'required' &&
            (<span className='text-danger'>El nombre es requerido</span>)
          }
        </div>
        <div>
          <label className='form-label'>Apellidos</label>
          <input
            onChange={register}
            type='text'
            name='apellido'
            {...register('apellido', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.apellido?.type === 'required' &&
            (<span className='text-danger'>El apellido es requerido</span>)
          }
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={register}
            type='text'
            name='correo_electronico'
            {...register('correo_electronico', {
              required: true
            })}
            disabled={!edit}
          />
          {errors.correo_electronico?.type === 'required' &&
            (<span className='text-danger'>El correo electronico es requerido</span>)
          }
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
