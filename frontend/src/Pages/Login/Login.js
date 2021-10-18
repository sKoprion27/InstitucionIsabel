import './style.scss'
import { useState } from 'react'
import { useAuth } from './../../hooks/useAuth'
import bg from '../../img/login.jpg'
import logo from '../../img/logo.jpg'
export const Login = () => {
  const { login } = useAuth()

  const [credentials, setCredentials] = useState({
    correo_electronico: 'admin@tec.mx',
    password: 'password'
  })

  const [show, setShow] = useState(true)

  const { correo_electronico, password } = credentials

  const handlerOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(correo_electronico, password)
    } catch (error) {
      console.log(error.response.data, '😕')
    }
  }
  return (
    <div className='background' style={
      {
        backgroundImage: `url(${bg})`
      }
    }>
      <div className='container-fluid login'>
        <div className='login__img-container'>
          <img className='login__logo' src={logo} alt='logo isabel ' />
        </div>
        <h1 className='text-center'>Iniciar sesión</h1>
        <p className='text-center'>Sistema de donaciones</p>
        <div className='row justify-content-center mt-4 '>
          <div className='col'>
            <form onSubmit={handlerSubmit}>
              <div className='mb-3'>
                <label htmlFor='emailInput' className='form-label'>
                  Email
                </label>
                <input onChange={handlerOnChange} value={correo_electronico} type='email' className='form-control' name='correo_electronico'
                  placeholder='ejemplo@isabel.com' />
              </div>
              <div className='mb-3'>
                <label htmlFor='passwordInput' className='form-label'>
                  Contraseña
                </label>
                <input onChange={handlerOnChange} placeholder='Tu contraseña' value={password} type={show ? 'password' : 'text'} className='form-control' name='password' />
              </div>
              <div className='mb-3 login__container-show'>
                {
                  credentials.password.length > 0 && (
                    <ShowPassword setShow={setShow} show={show} />
                  )
                }

              </div>
              <div className='justify-content-center d-flex'>
                <button type='submit' className='btn btn-primary btn-lg w-100'>
                  Ingresar
                </button>
              </div>
              <p className='text-center mt-4 login__info'>Si desconoces tus accesos contacta a tu administrador</p>
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

const ShowPassword = ({ setShow, show }) => {
  return (
    <p className='text-center login__show-password' onClick={() => setShow(!show)}>
      {
        show ? 'Mostrar contraseña' : 'Ocultar contraseña'
      }
      <span span className='material-icons material-icons-outlined ' >
        {
          show ? 'visibility' : 'visibility_off'
        }

      </span>
    </p>
  )
}
