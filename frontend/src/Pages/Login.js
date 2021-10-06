export const Login = () => {
  return (
    <div className='container'>
      <h1 className='text-center mt-4'>Login</h1>
      <div className='row justify-content-center mt-4 '>
        <div className='col-10 col-md-6'>
          <form>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email
              </label>
              <input type='email' className='form-control' id='exampleInputEmail1' />
              <div id='emailHelp' className='form-text'>
                Ingresa el correo registrado
              </div>
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Contraseña
              </label>
              <input type='password' className='form-control' id='exampleInputPassword1' />
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
