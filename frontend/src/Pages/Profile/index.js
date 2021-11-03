import { updateUser } from '../../helpers/users.helpers'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth'
import { NavPage } from '../../Components/Dashboard/NavPage'
import { ModalPassword } from '../../Components/Dashboard/ModalPassword'

export const Profile = () => {
  const [edit, setEdit] = useState(false)
  const [activeModal, setActiveModal] = useState(false)
  const [fetchUpdate, setFetchUpdate] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const auth = useAuth()
  useEffect(() => {
    reset(auth.user)
  }, [])
  const handlerSubmit = async (data) => {
    try {
      await updateUser(data, auth.user.id)
      await auth.updateUserContext()
      setFetchUpdate(!fetchUpdate)
      alert('Perfil actualizado')
      setEdit(false)
    } catch (error) {
      console.log(error, 'Update user')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }
  return (
    <>
      <NavPage title='Perfil' path='/dashboard' />
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
              required: {
                value: true,
                message: 'El nombre es requerido'
              }
            })
            }
            disabled={!edit} />
          {errors.nombre &&
            (<span className='red-text'>
              {errors.nombre.message}
            </span>)
          }
        </div>
        <div>
          <label>Apellidos</label>
          <input
            onChange={register}
            type='text'
            name='apellido'
            {...register('apellido', {
              required: {
                value: true,
                message: 'El apellido es requerido'
              }
            })}
            disabled={!edit}
          />
          {errors.apellido &&
            (<span className='red-text'>
              {errors.apellido.message}
            </span>)
          }
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={register}
            type='text'
            name='correo_electronico'
            {...register('correo_electronico', {
              required: {
                value: true,
                message: 'El correo electronico es requerido'
              }
            })}
            disabled={!edit}
          />
          {errors.correo_electronico &&
            (<span className='red-text'>
              {errors.correo_electronico.message}
            </span>)
          }
        </div>
        <div>
          <label>Roles</label>
          {
            auth.user.roles.map(role => (
              <input key={role.id} type='text' value={role.nombre} disabled />
            ))
          }
        </div>

        <div className='user__btn__container'>
          <button
            type='submit'
            className='btn'
            disabled={!edit}
          >
            Actualizar
          </button>

          <button
            className='btn indigo modal-trigger'
            type='button'
            onClick={() => { setActiveModal(!activeModal) }}
            disabled={!edit}
          >
            Cambiar contraseña
          </button>

          <button
            type='button'
            className={`btn ${!edit || 'red'} `}
            onClick={handlerEdit}
          >
            {
              edit ? 'Cancelar' : 'Editar'
            }
          </button>
        </div>
      </form>
      {
        activeModal && (<ModalPassword id={auth.user.id} changeVisibility={setActiveModal} />)
      }
    </>
  )
}
