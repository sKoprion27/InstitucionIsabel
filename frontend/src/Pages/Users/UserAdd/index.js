import { getAllRoles, postOneUser } from '../../../helpers/users.helpers'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import './style.scss'

export const UserAdd = () => {
  const {
    register,
    handleSubmit,
    reset, control,
    formState: { errors }
  } = useForm()
  const [show, setShow] = useState(false)
  const [roles, setRoles] = useState([{ value: 0, label: 'default' }])

  const animatedComponents = makeAnimated()

  useEffect(() => {
    const getRoles = async () => {
      const roles = await getAllRoles()
      const options = roles.map(r => {
        return {
          value: r.id,
          label: r.nombre_role
        }
      })
      setRoles(options)
    }
    getRoles()
  }, [])

  const handlerShowPassword = () => {
    setShow(!show)
  }

  const handlerSubmit = async (data) => {
    try {
      // console.log(data)
      const roles = data.roles.map(role => {
        return {
          id: role.value,
          label: role.label
        }
      })
      const dataPost = {
        ...data,
        roles
      }
      await postOneUser(dataPost)
      alert('Usuario creado')
      reset({})
      reset({ roles: '' })
    } catch (error) {
      alert('ERROR')
      console.log(error, 'Crear usuario')
    }
  }

  return (
    <>
      <NavPage title='Agregar usuario' path='/dashboard/usuarios' />
      <div>
        <form
          className='user__form'
          onSubmit={handleSubmit(handlerSubmit)}
        >

          <div className='input-field'>
            <label>Nombre</label>
            <input
              onChange={register}
              type='text'
              name='nombre'
              autoComplete={'off'}
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
          <div className='input-field'>
            <label>Apellidos</label>
            <input
              onChange={register}
              type='text'
              className='input-field'
              name='apellido'
              autoComplete={'off'}
              {...register('apellido', {
                required: true
              })}

            />
            {errors.apellido?.type === 'required' &&
              (<span className='text-danger'>El apellido es requerido</span>)
            }
          </div>
          <div className='input-select'>
            <label>Selecciona los roles</label>
            <Controller
              control={control}
              rules={{ required: true }}
              defaultValue={false}
              name='roles'
              render={({ field }) => (
                <Select
                  placeholder='Roles de usuario'
                  closeMenuOnSelect
                  components={animatedComponents}
                  isMulti
                  options={roles}
                  {...field}
                />
              )}
            />
            {errors.roles?.type === 'required' &&
              (<span
                className='text-danger'
              >
                Selecciona al menos un role
              </span>)
            }
          </div>
          <div className='input-field'>
            <label>Correo electrónico</label>
            <input
              onChange={register}
              type='text'
              name='correo_electronico'
              autoComplete={'off'}
              {...register('correo_electronico', {
                required: true
              })}

            />
            {errors.correo_electronico?.type === 'required' &&
              (<span className='text-danger'>El correo electronico es requerido</span>)
            }
          </div>
          <div className='input-field'>
            <label>Contraseña</label>
            <input
              onChange={register}
              type={show ? 'text' : 'password'}
              name='password'
              autoComplete='new-password'
              {...register('password', {
                required: true
              })}

            />
            {errors.password?.type === 'required' &&
              (<span className='text-danger'>La contraseña es requerida</span>)
            }
          </div>

          {
            show
              ? (<div className='show-password' onClick={handlerShowPassword}>
                <MdVisibilityOff />
                <span className='text-muted'>Ocultar contraseña</span>
              </div>)
              : (<div className='show-password' onClick={handlerShowPassword}>
                <MdVisibility />
                <span className='text-muted'>Mostrar contraseña</span>
              </div>)
          }

          <div className='btn-submit'>
            <button
              type='submit'
              className='btn btn-primary'
            >
              Agregar usuario
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
