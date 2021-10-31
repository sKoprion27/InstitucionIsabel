/* eslint-disable no-useless-escape */
import { useState } from 'react'
import { useAuth } from './../../hooks/useAuth'
import bg from '../../img/login.jpg'
import logo from '../../img/logo.jpg'
import { Button, Icon } from 'react-materialize'
import { useForm } from 'react-hook-form'
import './style.scss'

export const Login = () => {
  const { login } = useAuth()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const [show, setShow] = useState(true)
  const [error, setError] = useState(null)
  const [loading, setSetLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setSetLoading(true)
      await login(data)
      setSetLoading(false)
    } catch ({ response }) {
      setError(response.data.message)
      setTimeout(() => {
        setError(null)
        setSetLoading(false)
      }, 2000)
    }
  }
  return (
    <div className='background' style={
      {
        backgroundImage: `url(${bg})`
      }
    }>
      <div className='login'>
        <div className='login__img-container'>
          <img className='login__logo' src={logo} alt='logo isabel ' />
        </div>
        <h1>Iniciar sesión</h1>
        <p>Sistema de donaciones</p>
        <div className='row'>
          <div className='form_container'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='input-field'>
                <label htmlFor='emailInput'>
                  Correo electrónico
                </label>
                <input

                  type='email'
                  name='correo_electronico'
                  autoComplete='off'
                  {...register('correo_electronico', {
                    required: {
                      value: true,
                      message: 'Esta campo es requerido'
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Ingresa un correo válido'
                    }
                  })}
                />
                {errors.correo_electronico &&
                  <span
                    className='red-text error-alert'
                  >
                    {errors.correo_electronico.message}
                  </span>
                }
              </div>
              <div className='input-field '>
                <label >
                  Contraseña
                </label>
                <input

                  type={show ? 'password' : 'text'}
                  name='password'
                  autoComplete='off'
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Esta campo es requerido'
                    },
                    minLength: {
                      value: 8,
                      message: 'Tu contraseña al menos tiene 8 caracteres'
                    }
                  })}
                />
                {errors.password &&
                  <span
                    className='red-text error-alert'
                  >
                    {errors.password.message}
                  </span>
                }
              </div>
              <div className='login__container-show'>
                <ShowPassword setShow={setShow} show={show} />
              </div>
              <Button
                node='button'
                type='submit'
                large
                disabled={loading}
              >
                Ingresar
                <Icon right>
                  send
                </Icon>
              </Button>
            </form>
            <div className='login__info'>
              {
                error
                  ? <p className='red-text'>
                    {error}
                  </p>
                  : (<p>
                    Si desconoces tus accesos contacta a tu administrador
                  </p>)
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

const ShowPassword = ({ setShow, show }) => {
  return (
    <p className='login__show-password' onClick={() => setShow(!show)}>
      {
        show ? 'Mostrar contraseña' : 'Ocultar contraseña'
      }
      {
        show ? <Icon>visibility</Icon> : <Icon>visibility_off</Icon>
      }
    </p>
  )
}
