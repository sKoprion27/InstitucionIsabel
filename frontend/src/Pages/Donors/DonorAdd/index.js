/* eslint-disable no-useless-escape */
import {
  useEffect,
  useState
} from 'react'
import {
  Navigate
} from 'react-router-dom'
import {
  Controller,
  useForm
} from 'react-hook-form'

import { NavPage } from '../../../Components/Dashboard/NavPage'
import { Card } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import { postDonor } from '../../../helpers/donors.helpers'

import './style.scss'
import { convertToSelectOptions, convertToSelectOptionsCFDI } from '../../../utils'
import { getAllStates } from '../../../helpers/states.helpers'
import { getAllCfdis } from './../../../helpers/cfdis.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { yupResolver } from '@hookform/resolvers/yup'

export const DonorAdd = () => {
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(true)
  const [loading, setLoading] = useState(false)
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
    setValue,
    formState: { errors }
  } = useForm()

  const onChange = (e) => {
    console.log(e.target.files[0])
  }

  useEffect(() => {
    const getInfoSelects = async () => {
      try {
        const estados = await getAllStates()
        const cfdis = await getAllCfdis()

        setOptions({
          ...options,
          states: convertToSelectOptions(estados),
          cfdis: convertToSelectOptionsCFDI(cfdis)
        })
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar la página', 'red lighten-2')
        setEdit(null)
      }
    }
    getInfoSelects()
  }, [edit])

  // Use Effect for selects info

  const handlerSubmit = async (data) => {
    try {
      setLoading(true)
      setEdit(false)
      const dataPost = {
        donor: {
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
      }
      await postDonor(dataPost)
      toastInit('Elemento agregado')
      setEdit(true)
      setLoading(false)
      resetForm()
    } catch (error) {
      console.log(error)
      toastInit('Error al agregar', 'red lighten-2')
      setEdit(true)
      resetForm()
    }
  }

  const resetForm = () => {
    reset({})
    setValue('id_estado', 'value', { shouldDirty: true })
    setValue('id_cfdi', 'value', { shouldDirty: true })
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage title='Agregar donador' path='/dashboard/donadores' />
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
              type='number'
              autoComplete='off'
              max='99999'
              {...register('codigo_postal', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
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
                  message: 'Selecciona al menos un método de pago'
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
            {errors.estado &&
              (<span
                className='red-text'
              >
                {errors.estado.message}
              </span>)
            }
          </div>
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
            {errors.cfdi &&
              (<span
                className='red-text'
              >
                {errors.cfdi.message}
              </span>)
            }
          </div>
          {/* BOTONES DE OPCIONES */}
          <div className='user__btn__container'>
            <button
              type='submit'
              className='btn btn-success  '
              disabled={loading || !edit}
            >
              Agregar donación
            </button>
          </div>
          {
            loading && (
              <div className='progress'>
                <div className='indeterminate' />
              </div>
            )
          }
        </form>
      </Card>
    </>
  )
}
