import {
  useEffect,
  useState
} from 'react'
import {
  Link,
  Navigate,
  useParams
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import {
  getOneDonor,
  updateDonor
} from '../../../helpers/donors.helpers'

import './style.scss'
import { MaterialBox } from '../../../Components/Dashboard/MaterialBox'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable, convertToSelectOptionsCFDI } from '../../../utils'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const DonorEdit = ({ justView }) => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(false)
  const [options, setOptions] = useState({
    states: [],
    cfdis: [],
    regimen_fiscal: [{
      label: 'PERSONA MORAL',
      value: true
    },
    {
      label: 'PERSONA FISICA',
      value: false
    }
    ]
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getOne = async () => {
      try {
        const response = await getOneDonor(id)
        setOptions({
          ...options,
          states: convertToSelectOptions(response.estados),
          cfdis: convertToSelectOptionsCFDI(response.cfdis)
        })

        console.log(response)

        const initialStateForm = {
          ...response.donor,

          id_estado: filterSelectsOptiones(
            response.estados,
            [{ id: response.donor.id_estado }],
            'nombre'
          )[0],
          id_cfdi: filterSelectsOptiones(
            response.cfdis,
            [{ id: response.donor.id_cfdi }],
            'descripcion'
          )[0],
          regimen_fiscal: {
            label: response.donor.regimen_fiscal ? 'PERSONA MORAL' : 'PERSONA FISICA',
            value: response.donor.regimen_fiscal
          }
        }
        console.log('INITIAL DATA', initialStateForm)
        reset(initialStateForm)
      } catch (error) {
        console.log(error)
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      console.log('🐊', data)
      const updateData = {
        telefono: data.telefono,
        razon_social: data.razon_social,
        rfc: data.rfc,
        nombre: data.nombre,
        correo_electronico: data.correo_electronico,
        domicilio_fiscal: data.domicilio_fiscal,
        codigo_postal: data.codigo_postal,
        regimen_fiscal: data.regimen_fiscal.value,
        id_estado: data.id_estado.value,
        id_cfdi: data.id_cfdi.value

      }
      console.log('😀', updateData)

      await updateDonor(updateData, id)
      toastInit('Elemento actualizado')
      setEdit(!edit)
    } catch (error) {
      console.log(error)
      toastInit('Error al actualizar', 'red lighten-2')
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage justView={justView} title='Editar donador' path='/dashboard/donadores' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información</h6>
        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Telefono (Ej.1234567890)</label>
            <input
              onChange={register}
              type='tel'
              autoComplete='off'
              pattern='[0-9]{10}'
              {
              ...register('telefono', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })
              }
              disabled={!edit} />
            {errors.telefono &&
              (<span className='red-text'>
                {
                  errors.telefono.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Razón Social</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('razon_social', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.razon_social &&
              (<span className='red-text'>
                {
                  errors.razon_social.message
                }
              </span>)
            }
          </div>
          <div>
            <label>RFC</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              maxLength='13'
              minLength='13'
              {...register('rfc', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.rfc &&
              (<span className='red-text'>
                {
                  errors.rfc.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Nombre</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('nombre', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.nombre &&
              (<span className='red-text'>
                {
                  errors.nombre.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Correo Electrónico</label>
            <input
              onChange={register}
              type='email'
              autoComplete='off'
              {...register('correo_electronico', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Ingresa un correo válido'
                }
              })}
              disabled={!edit}
            />
            {errors.correo_electronico &&
              (<span className='red-text'>
                {
                  errors.correo_electronico.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Domicilio Fiscal</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('domicilio_fiscal', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.domicilio_fiscal &&
              (<span className='red-text'>
                {
                  errors.domicilio_fiscal.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Código Postal</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('codigo_postal', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                pattern: {
                  value: /^(?=.*[0-9])/,
                  message: 'El código postal debe ser únicamente números'
                },
                minLength: {
                  value: 5,
                  message: 'El código postal debe contener 5 digitos'
                }
              })}
              disabled={!edit}
            />
            {errors.codigo_postal &&
              (<span className='red-text'>
                {
                  errors.codigo_postal.message
                }
              </span>)
            }
          </div>
          {/* SELECT REGIMEN FISCAL */}
          <div className='input-select'>
            <label>Selecciona el régimen fiscal</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona un régimen'
                }
              }}
              name='regimen_fiscal'
              render={({ field }) => (
                <Select
                  placeholder='Régimen Fiscal'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.regimen_fiscal}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.regimen_fiscal &&
              (<span
                className='red-text'
              >
                {errors.regimen_fiscal.message}
              </span>)
            }
          </div>
          {/* SELECT ESTADO */}
          <div className='input-select'>
            <label>Selecciona el Estado</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona el Estado'
                }
              }}
              name='id_estado'
              render={({ field }) => (
                <Select
                  placeholder='Estado'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.states}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.id_estado &&
              (<span
                className='red-text'
              >
                {errors.id_estado.message}
              </span>)
            }
          </div>
          {/* SELECT CFDIS */}
          <div className='input-select'>
            <label>Selecciona el CFDI</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona un CFDI'
                }
              }}
              name='id_cfdi'
              render={({ field }) => (
                <Select
                  placeholder='Claves de CFDI'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.cfdis}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.id_cfdi &&
              (<span
                className='red-text'
              >
                {errors.id_cfdi.message}
              </span>)
            }
          </div>

          {/* BOTONES DE OPCIONES */}
          {
            !justView && (<div className='user__btn__container'>
              <button
                type='submit'
                className='btn btn-success  '
                disabled={!edit}
              >
                Actualizar
              </button>

              <button
                type='button'
                className={`btn ${edit ? 'red' : 'teal'} `}
                onClick={handlerEdit}
              >
                {
                  edit ? 'Cancelar' : 'Editar'
                }
              </button>
            </div>)
          }
        </form>
      </Card>
    </>
  )
}
