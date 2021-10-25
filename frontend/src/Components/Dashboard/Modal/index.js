
import { useState } from 'react'
import { deleteOne } from './../../../helpers/users.helpers'
export const Modal = ({ id, path, setFetchDelete }) => {
  const [show, setShow] = useState(false)
  const handlerDelete = async (e) => {
    try {
      await deleteOne(id, path)
      setShow(!show)
      setFetchDelete((fetchDelete) => !fetchDelete)
      document.querySelector('.modal-backdrop').remove()
    } catch (error) {
      console.log(error, 'Deleted one')
    }
  }
  return (
    <div className='modal fade'
      id={`deleteModal${id}`}
      tabIndex={-1}
      aria-labelledby='deleteModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            {
              !show
                ? (<h3>Estas seguro que deseas eliminar este elemento</h3>)
                : (<h3>Elemento eliminado</h3>)
            }
          </div>
          <div className='modal-footer justify-content-center'>
            {
              !show
                ? (<>
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={handlerDelete}
                  >
                    Si, guardar cambios
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger'
                    data-bs-dismiss='modal'>
                    Cancelar
                  </button>
                </>)
                : (<button
                  type='button'
                  className='btn btn-danger'
                  data-bs-dismiss='modal'>
                  Cerrar
                </button>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
