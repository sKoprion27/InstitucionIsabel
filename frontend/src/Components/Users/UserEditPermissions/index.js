import { roles } from '../../../mock/permissions.mock'

export const UserEditPermissions = () => {
  return (
    <>

      <div className='container'>
        <h4 className='text-center'>Permisos</h4>
        <div className='w-100 d-flex justify-content-center'>
          <button className='btn btn-success btn-lg my-4 w-25 text-center' >Actualizar permisos</button>
        </div>
        <div className='row justify-content-center'>

          {
            roles.map(p => {
              return (
                <div key={p} className='col-12 col-md-3'>
                  <div className='card'>
                    <div className='card-body d-flex justify-content-between align-items-center'>
                      <p>
                        {p}
                      </p>
                      <input type='checkbox' name='' id='' />
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>

    </>
  )
}
