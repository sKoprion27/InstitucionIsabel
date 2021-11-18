import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import { Icon } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
import { deleteOneElement } from '../../../helpers/users.helpers'
import './style.scss'
import { toastInit } from '../AlertToast'
export const Modal = ({ id, path, setFetch }) => {
  const auth = useAuth()
  const modalRef = useRef()
  const options = {
    inDuration: 250,
    outDuration: 250,
    opacity: 0.5,
    dismissible: false,
    startingTop: '4%',
    endingTop: '10%'
  }

  useEffect(() => {
    M.Modal.init(modalRef.current, options)
  }, [])

  const handlerRemove = async () => {
    try {
      await deleteOneElement(id, path)
      toastInit('Elemento eliminado')
      setFetch((fetch) => setFetch(!fetch))
    } catch (error) {
      console.log(error)
      toastInit('Error al eliminar', 'red lighten-2')
    }
  }
  return (
    <>
      <button
        className='btn red modal-trigger'
        data-target={`modal-delete${id}`}
        type='button' disabled={
          (path === 'users'
            ? auth.user.id === id
            : false)
        }>
        <Icon>delete</Icon>
      </button>

      {/* <div
        ref={modalRef}
        id={`modal-delete${id}`}
        className='modal bottom-sheet'
      >
        <div className='modal-layout'>
          <div className='modal-content'>
            <h4>Estas seguro de eliminar este elemento</h4>
            <p>Esta acción es irreversible</p>
          </div>
          <div className='footer'>
            <button className='modal-close waves-effect red white-text btn'>
              Cancelar
            </button>
            <button className='modal-close waves-effect waves-green green white-text btn' onClick={handlerRemove}>
              Aceptar
            </button>
          </div>
        </div>
      </div> */}
    </>
  )
}
