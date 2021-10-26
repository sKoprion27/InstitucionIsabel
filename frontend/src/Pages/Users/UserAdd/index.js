import { postOneUser } from '../../../helpers/users.helpers'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavPage } from '../../../Components/Dashboard/NavPage'

export const UserAdd = () => {
  const [fetchAdd, setFetchAdd] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const handlerSubmit = async (data) => {
    try {
      await postOneUser(data)
      setFetchAdd(!fetchAdd)
      alert('Usuario creado')
      reset({})
    } catch (error) {
      console.log(error, 'Crear usuario')
    }
  }

  return (
    <div className='container'>
      <NavPage title='Agregar usuario' path='/dashboard/usuarios' />
      <div className='row justify-content-center mt-4'>
        <div className='col-10 col-md-6'>
          <form
            className='user__form'
            onSubmit={handleSubmit(handlerSubmit)}
          >
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                onChange={register}
                type='text'
                className='form-control'
                name='nombre'
                {
                ...register('nombre', {
                  required: true
                })
                }
              />
              {errors.nombre?.type === 'required' &&
                (<span className='text-danger'>El nombre es requerido</span>)
              }
            </div>
            <div className='mb-3'>
              <label className='form-label'>Apellidos</label>
              <input
                onChange={register}
                type='text'
                className='form-control'
                name='apellido'
                {...register('apellido', {
                  required: true
                })}

              />
              {errors.apellido?.type === 'required' &&
                (<span className='text-danger'>El apellido es requerido</span>)
              }
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                onChange={register}
                type='text'
                className='form-control'
                name='correo_electronico'
                {...register('correo_electronico', {
                  required: true
                })}

              />
              {errors.correo_electronico?.type === 'required' &&
                (<span className='text-danger'>El correo electronico es requerido</span>)
              }
            </div>
            <div className='mb-3'>
              <label className='form-label'>Contraseña</label>
              <input
                onChange={register}
                type='password'
                className='form-control'
                name='password'
                {...register('password', {
                  required: true
                })}

              />
              {errors.password?.type === 'required' &&
                (<span className='text-danger'>La contraseña es requerida</span>)
              }
            </div>

            <button
              type='submit'
              className='btn btn-primary'
            >
              Agregar usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
