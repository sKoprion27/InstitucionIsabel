import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import { Icon } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
export const Modal = ({ id }) => {
  const auth = useAuth()
  const modalRef = useRef()
  const options = {
    onOpenStart: () => {
      console.log('Open Start')
    },
    onOpenEnd: () => {
      console.log('Open End')
    },
    onCloseStart: () => {
      console.log('Close Start')
    },
    onCloseEnd: () => {
      console.log('Close End')
    },
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
  return (
    <>
      <button
        className='btn red modal-trigger'
        data-target={`modal-delete${id}`}
        type='button' disabled={auth.user.id === id}>
        <Icon>delete</Icon>
      </button>

      <div
        ref={modalRef}
        id={`modal-delete${id}`}
        className='modal bottom-sheet'
      >
        <div className='modal-content'>
          <h4>Estas seguro de eliminar este elemento</h4>
          <p>Esta acción es irreversible</p>
          {id}
        </div>
        <div className='modal-footer'>
          <button className='modal-close waves-effect red white-text btn'>
            Cancelar
          </button>
          <button className='waves-effect waves-green green white-text btn'>
            Aceptar
          </button>
        </div>
      </div>
    </>
  )
}
