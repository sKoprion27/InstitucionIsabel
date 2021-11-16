import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import { Icon } from 'react-materialize'
import { useAuth } from '../../../hooks/useAuth'
import './style.scss'
import { toastInit } from '../AlertToast'
import { useForm } from 'react-hook-form'
import { updateOneDonationInvoce } from '../../../helpers/donations.helpers'
export const InvoiceModal = ({ id, setFetch, facturado }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
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

  const handlerSubmit = async (data) => {
    try {
      console.log(data)
      await updateOneDonationInvoce(id, data)
      toastInit('Donación facturada')
      reset()
      setFetch((fetch) => setFetch(!fetch))
      M.Modal.getInstance(modalRef.current).close()
    } catch (error) {
      toastInit('Error al facturar', 'red lighten-2')
      reset()
    }
  }

  const handlerDeleteInvoice = async () => {
    try {
      toastInit('Factura eliminada')
      await updateOneDonationInvoce(id, { esta_facturado: null })
      setFetch((fetch) => setFetch(!fetch))
      M.Modal.getInstance(modalRef.current).close()
    } catch (error) {
      toastInit('Error al borrar fecha', 'red lighten-2')
      reset()
    }
  }

  return (
    <>
      <button
        className={`btn
        ${facturado === null
            ? 'indigo'
            : 'red'
          }
          modal-trigger`
        }
        data-target={`modal-invoice${id}`}
        type='button'>
        <Icon>
          {facturado === null ? 'check_circle' : 'restore'}
        </Icon>
      </button>

      <div
        ref={modalRef}
        id={`modal-invoice${id}`}
        className='modal'
      >
        {
          facturado === null
            ? (<div className='modal-layout'>
              <div className='modal-content'>
                <h4>¿Deseas marcar como facturada esta donación?</h4>
                <p>Selecciona la fecha de la factura</p>
              </div>
              <form onSubmit={handleSubmit(handlerSubmit)}>
                <div className='date-select'>
                  <span className='red-text'>
                    {errors.esta_facturado && errors.esta_facturado.message}
                  </span>

                  <input type='date' {...register('esta_facturado', {
                    required: {
                      value: true,
                      message: 'Selecciona cuando facturaste la donación'
                    }
                  })} />
                </div>

                <div className='footer'>
                  <button id='close-btn-invoice'
                    type='button'
                    className='modal-close waves-effect red white-text btn'>
                    Cancelar
                  </button>
                  <button type='submit' className='waves-effect waves-green green white-text btn'>
                    Aceptar
                  </button>
                </div>
              </form>
            </div>)
            : (
              <div className='modal-layout'>
                <div className='modal-content'>
                  <h4>¿Deseas borrar la fecha de factura?</h4>
                </div>

                <div className='footer'>
                  <button id='close-btn-invoice'
                    type='button'
                    className='modal-close waves-effect red white-text btn'>
                    Cancelar
                  </button>
                  <button
                    type='button'
                    className='modal-close waves-effect waves-green green white-text btn'
                    onClick={handlerDeleteInvoice}
                  >
                    Aceptar
                  </button>
                </div>
              </div>)
        }
      </div>
    </>)
}
