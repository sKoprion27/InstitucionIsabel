import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import { Icon } from 'react-materialize'
import './style.scss'

export const ModalElement = ({ message, editElement }) => {
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

  return (
    <div className='modal-wrapper'>
      <button
        className='btn orange lighten-1 modal-trigger btn-info'
        data-target={`${editElement ? 'editElement' : 'add-element'}`}
        type='button'>
        Ayuda
        <Icon>help_outline</Icon>
      </button>
      <div
        ref={modalRef}
        id={`${editElement ? 'editElement' : 'add-element'}`}
        className='modal'
      >
        <div className='modal-content'>
          <h4>Ayuda</h4>
          <p>{message}</p>
        </div>
        <div className='modal-footer'>
          <button className='modal-close waves-effect waves-green green white-text btn'>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
