/* eslint-disable camelcase */
import { useState } from 'react'
import { useAuth } from './../hooks/useAuth'
export const Login = () => {
  const { login, user } = useAuth()

  const [state, setState] = useState({
    correo_electronico: 'daniel@isabel.com',
    password: 'paswd1234'
  })

  const { correo_electronico, password } = state

  const handlerOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    await login(correo_electronico, password)
  }
  console.log(user)
  return (
    <div className='container'>
      <h1 className='text-center mt-4'>Login</h1>
      <div className='row justify-content-center mt-4 '>
        <div className='col-10 col-md-6'>
          <form onSubmit={handlerSubmit}>
            <div className='mb-3'>
              <label htmlFor='emailInput' className='form-label'>
                Email
              </label>
              <input onChange={handlerOnChange} value={correo_electronico} type='email' className='form-control' name='correo_electronico' />
            </div>
            <div className='mb-3'>
              <label htmlFor='passwordInput' className='form-label'>
                Contraseña
              </label>
              <input onChange={handlerOnChange} value={password} type='text' className='form-control' name='password' />
            </div>
            <div className='justify-content-center d-flex'>
              <button type='submit' className='btn btn-primary btn-lg w-50'>
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
