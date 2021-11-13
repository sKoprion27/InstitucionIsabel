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
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const DonationAdd = () => {
  const animatedComponents = makeAnimated()
  const [edit, setEdit] = useState(true)
  const [options, setOptions] = useState({
    donors: [],
    paymentMethods: [],
    typesDonations: [],
    categories: []
  })
  const schema = yup.object().shape({
    foto_donacion: yup.mixed()
      .test('required', 'Es requerida una imagen', (value) => {
        return value && value.length
      })
      .test('fileSize', 'El archivo es muy pesado', (value, context) => {
        return value && value[0] && value[0].size <= 200000
      })
      .test('type', 'Solo es válido JPEG, JPG, PNG', function (value) {
        return value &&
          value[0] &&
          (value[0].type === 'image/jpeg' ||
            value[0].type === 'image/png' ||
            value[0].type === 'image/jpg')
      }),
    id_donador: yup.mixed()
      .test('required', 'Selecciona un donador', (value) => {
        return value
      }),
    id_metodo_pago: yup.mixed()
      .test('required', 'Selecciona un método de pago', (value) => {
        return value
      }),
    id_tipo_donacion: yup.mixed()
      .test('required', 'Selecciona un tipo de donativo', (value) => {
        return value
      }),
    categorias: yup.mixed()
      .test('required', 'Selecciona al menos una categoria', (value) => {
        return value && value.length
      }),
    beneficiarios: yup.mixed()
      .test('required', 'Selecciona al menos un beneficiario', (value) => {
        return value && value.length
      }),
    nombre: yup.mixed()
      .test('required', 'Ingresa el nombre del donativo', (value) => {
        return value && value.length
      }),
    monto: yup.mixed()
      .test('required', 'Ingresa el monto de la donación', (value) => {
        return value && value.length
      })
      .test('number', 'El numero debe ser un número', (value) => {
        return !isNaN(value)
      })
      .test('positive', 'El numero debe ser positivo', (value) => {
        return value > 0
      })
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onChange = (e) => {
    console.log(e.target.files[0])
  }

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
          foto_donacion: data.foto_donacion[0]
        },
        categories: [...data.categorias.map(c => { return { id: c.value } })],
        beneficiaries: [...data.beneficiarios.map(b => { return { id: b.value } })]
      }
      console.log(dataPost)
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
              ...register('nombre')
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
              {...register('monto')}
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
            <input
              id='foto_donacion'
              type='file'
              {...register('foto_donacion')}
              onChange={onChange}
            />
            {errors.foto_donacion &&
              (<span
                className='red-text'
              >
                {errors.foto_donacion.message}
              </span>)
            }
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
