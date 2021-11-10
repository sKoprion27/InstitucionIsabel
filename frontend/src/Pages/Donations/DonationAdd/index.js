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

import { postDonation } from '../../../helpers/donations.helpers'

import './style.scss'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable } from '../../../utils'
import { getAllDonors } from '../../../helpers/donors.helpers'
import { getAllPayments } from '../../../helpers/payment.helpers'
import { getAllCategories } from '../../../helpers/categories.helpers'
import { getAllTypesDonations } from '../../../helpers/typedonations.helpers'
import { getAllBeneficiaries } from '../../../helpers/beneficiaries.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const DonationAdd = () => {
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(true)
  const [options, setOptions] = useState({
    donors: [],
    paymentMethods: [],
    typesDonations: [],
    categories: []
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    const getInfoSelects = async () => {
      try {
        const donadores = await getAllDonors()
        const metodos_pago = await getAllPayments()
        const categorias = await getAllCategories()
        const tipos_donacion = await getAllTypesDonations()
        const beneficiarios = await getAllBeneficiaries()

        setOptions({
          donors: convertToSelectOptions(donadores, 'razon_social'),
          paymentMethods: convertToSelectOptions(metodos_pago),
          categories: convertToSelectOptions(categorias),
          typesDonations: convertToSelectOptions(tipos_donacion),
          beneficiaries: convertToSelectOptions(beneficiarios)
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
      setEdit(false)
      const dataPost = {
        donation: {
          nombre: data.nombre,
          monto: data.monto,
          esta_facturado: false,
          id_donador: data.id_donador.value,
          id_metodo_pago: data.id_metodo_pago.value,
          id_tipo_donacion: data.id_tipo_donacion.value,
          foto_donacion: null
        },
        categories: [...data.categorias.map(c => { return { id: c.value } })],
        beneficiaries: [...data.beneficiarios.map(b => { return { id: b.value } })]
      }
      console.log('😀', dataPost)
      await postDonation(dataPost)
      toastInit('Elemento agregado')
      setEdit(true)
      reset({})
      setValue('id_donador', 'value', { shouldDirty: true })
      setValue('id_metodo_pago', 'value', { shouldDirty: true })
      setValue('id_tipo_donacion', 'value', { shouldDirty: true })
      setValue('categorias', 'value', { shouldDirty: true })
      setValue('beneficiarios', 'value', { shouldDirty: true })
    } catch (error) {
      console.log(error)
      toastInit('Error al agregar', 'red lighten-2')
      setEdit(true)
      reset()
    }
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage title='Agregar donación' path='/dashboard/donaciones' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información</h6>

        <form
          className='user__form '
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <div>
            <label>Nombre de la donación</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {
              ...register('nombre', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })
              }
              disabled={!edit} />
            {errors.nombre &&
              (<span className='red-text'>
                {
                  errors.nombre.message
                }
              </span>)
            }
          </div>
          <div>
            <label>Monto</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('monto', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                validate: { isNumber: (value) => !isNaN(value) || 'Ingresa un número' }
              })}
              disabled={!edit}
            />
            {errors.monto &&
              (<span className='red-text'>
                {
                  errors.monto.message
                }
              </span>)
            }
          </div>
          {/* <div>
            <label>Facturado</label>
            <input
              onChange={register}
              type='text'
              autoComplete='off'
              {...register('esta_facturado', {
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              })}
              disabled={!edit}
            />
            {errors.descripcion &&
              (<span className='red-text'>
                {
                  errors.descripcion.message
                }
              </span>)
            }
          </div> */}
          {/* SELECT DONDADOR */}
          <div className='input-select'>
            <label>Selecciona donador</label>
            <Controller
              defaultValue={false}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos un donador'
                }
              }}
              name='id_donador'
              render={({ field }) => (
                <Select
                  placeholder='Donador'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.donors}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.id_donador &&
              (<span
                className='red-text'
              >
                {errors.id_donador.message}
              </span>)
            }
          </div>
          {/* SELECT MÉTODO DE PAGO */}
          <div className='input-select'>
            <label>Selecciona un método de pago</label>
            <Controller
              defaultValue={false}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos un método de pago'
                }
              }}
              name='id_metodo_pago'
              render={({ field }) => (
                <Select
                  placeholder='Método de pago'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.paymentMethods}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.id_metodo_pago &&
              (<span
                className='red-text'
              >
                {errors.id_metodo_pago.message}
              </span>)
            }
          </div>
          {/* SELECT TIPO DE DONACIÓN */}
          <div className='input-select'>
            <label>Selecciona que tipo de donativo</label>
            <Controller
              defaultValue={false}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona el tipo de donación'
                }
              }}
              name='id_tipo_donacion'
              render={({ field }) => (
                <Select
                  placeholder='Tipo donativo'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.typesDonations}
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.id_tipo_donacion &&
              (<span
                className='red-text'
              >
                {errors.id_tipo_donacion.message}
              </span>)
            }
          </div>
          {/* SELECT CATEGORIAS_DONACIONES */}
          <div className='input-select'>
            <label>Selecciona las categorias del donativo</label>
            <Controller
              control={control}
              defaultValue={false}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos una categoria'
                }
              }}
              name='categorias'
              render={({ field }) => (
                <Select
                  placeholder='Categorias de donativo'
                  closeMenuOnSelect
                  components={animatedComponents}
                  options={options.categories}
                  isMulti
                  {...field}
                  isDisabled={!edit}
                />
              )}
            />
            {errors.categorias &&
              (<span
                className='red-text'
              >
                {errors.categorias.message}
              </span>)
            }
          </div>
          {/* SELECT DONACIONES_BENEFICIARIOS */}
          <div className='input-select'>
            <label>Selecciona los beneficiarios del donativo</label>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Selecciona al menos una beneficiario'
                }
              }}
              defaultValue={false}
              name='beneficiarios'
              render={({ field }) => (
                <Select
                  placeholder='Beneficiarios del donativo'
                  closeMenuOnSelect
                  isMulti
                  components={animatedComponents}
                  options={options.beneficiaries}
                  {...field}
                  isDisabled={!edit}

                />
              )}
            />
            {errors.beneficiarios &&
              (<span
                className='red-text'
              >
                {errors.beneficiarios.message}
              </span>)
            }
          </div>
          {/* AGREGAR DE FOTO */}
          <div className='img-donacion'>
            <p>Foto de la donación</p>
            <input type='file' />
          </div>

          {/* BOTONES DE OPCIONES */}
          <div className='user__btn__container'>
            <button
              type='submit'
              className='btn btn-success  '
              disabled={!edit}
            >
              Agregar donación
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}
