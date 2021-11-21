import React, { useEffect, useRef, useState } from 'react'
import { Icon } from 'react-materialize'
import './style.scss'
import { toastInit } from '../AlertToast'
import { useForm } from 'react-hook-form'
import { updateOneDonationInvoce } from '../../../helpers/donations.helpers'
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
export const InvoiceModal = ({ id, setFetch, facturado, nombreDonacion }) => {
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

  const [submit, setSubmit] = useState(false)

  const handlerSubmit = async (data) => {
    try {
      console.log(data)
      await updateOneDonationInvoce(id, data)
      toastInit('Donación facturada')
      setSubmit(true)
    } catch (error) {
      console.log(error)
      toastInit('Error al facturar', 'red lighten-2')
      reset()
    }
  }

  const handlerDeleteInvoice = async () => {
    try {
      await updateOneDonationInvoce(id, { esta_facturado: null })
      setFetch((fetch) => setFetch(!fetch))
      toastInit('Factura eliminada')
    } catch (error) {
      console.log(error)
      toastInit('Error al borrar fecha', 'red lighten-2')
      reset()
    }
  }
  const handlerExit = () => {
    setSubmit(false)
    setFetch((fetch) => setFetch(!fetch))
  }

  return (
    <>
      <button
        className={`btn
        ${facturado === 'No facturado'
            ? 'indigo'
            : 'red'
          }
          modal-trigger`
        }
        data-target={`modal-invoice-${id}`}
        type='button'>
        <Icon>
          {facturado === 'No facturado' ? 'check_circle' : 'restore'}
        </Icon>
      </button>

      <div
        ref={modalRef}
        id={`modal-invoice-${id}`}
        className='modal'
      >
        {
          facturado === 'No facturado'
            ? (<div className='modal-layout'>
              <div className='modal-content'>
                {
                  !submit && (<h4>¿Deseas marcar como facturada esta donación?</h4>)
                }
                <h6 className='indigo-text'>Donación: {nombreDonacion}</h6>
                {
                  !submit
                    ? (<p>Selecciona la fecha de la factura</p>)
                    : (<p className='green-text'>Fecha facturada para esta donación</p>)
                }
              </div>
              <form onSubmit={handleSubmit(handlerSubmit)}>
                <div className='date-select'>
                  <span className='red-text'>
                    {errors.esta_facturado && errors.esta_facturado.message}
                  </span>

                  <input
                    disabled={submit}
                    type='date' {...register('esta_facturado', {
                      required: {
                        value: true,
                        message: 'Selecciona cuando facturaste la donación'
                      }
                    })} />
                </div>

                {
                  !submit
                    ? (<div className='footer'>
                      <button id='close-btn-invoice'
                        type='button'
                        className='modal-close waves-effect red white-text btn'>
                        Cancelar
                      </button>
                      <button type='submit' className='waves-effect waves-green green white-text btn'>
                        Aceptar
                      </button>
                    </div>)
                    : (<div className='footer-exit'>
                      <button id='close-btn-invoice'
                        type='button'
                        onClick={handlerExit}
                        className='modal-close waves-effect red white-text btn'>
                        Cerrar ventana
                      </button>
                    </div>)
                }

              </form>
            </div>)
            : (
              <div className='modal-layout'>
                <div className='modal-content'>
                  <h4>¿Deseas borrar la fecha de factura?</h4>
                  <h6 className='indigo-text'>Donación: {nombreDonacion}</h6>
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
