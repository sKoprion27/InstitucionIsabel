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
import { Card, TextInput } from 'react-materialize'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import {
  deletePhotoDonation,
  getOneDonation,
  updateDonation
} from '../../../helpers/donations.helpers'

import './style.scss'
import { MaterialBox } from '../../../Components/Dashboard/MaterialBox'
import { convertToSelectOptions, filterSelectsOptiones, formatDateTable } from '../../../utils'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { yupResolver } from '@hookform/resolvers/yup'
import { donationSchema } from '../../../utils/schemas'

export const DonationEdit = ({ justView }) => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [urlFoto, setUrlFoto] = useState('')
  const [idsOptions, setIdsOptions] = useState({
    idDonador: '',
    idMetodo: '',
    idTipoDonacion: '',
    esta_facturado: null
  })
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(donationSchema)
  })

  useEffect(() => {
    const getOne = async () => {
      try {
        const response = await getOneDonation(id)
        // console.log(response.donation)
        setUrlFoto(response.donation.foto_donacion)
        const idOptions = {
          idDonador: response.donation.id_donador,
          idMetodo: response.donation.id_metodo_pago,
          idTipoDonacion: response.donation.id_tipo_donacion,
          esta_facturado: response.donation.esta_facturado
        }
        setIdsOptions(idOptions)

        setOptions({
          donors: convertToSelectOptions(response.donadores, 'razon_social'),
          paymentMethods: convertToSelectOptions(response.metodos_pago),
          categories: convertToSelectOptions(response.categorias),
          typesDonations: convertToSelectOptions(response.tipos_donacion),
          beneficiaries: convertToSelectOptions(response.beneficiarios)
        })

        // console.log(response.donation)

        const initialStateForm = {
          nombre: response.donation.nombre,
          monto: response.donation.monto,
          esta_facturado:
            response.donation.esta_facturado
              ? formatDateTable(response.donation.esta_facturado)
              : '',
          id_donador: filterSelectsOptiones(
            response.donadores,
            [{ id: response.donation.id_donador }],
            'razon_social'
          )[0],
          id_metodo_pago: filterSelectsOptiones(
            response.metodos_pago,
            [{ id: response.donation.id_metodo_pago }],
            'nombre'
          )[0],
          id_tipo_donacion: filterSelectsOptiones(
            response.tipos_donacion, // catalogo
            [{ id: response.donation.id_tipo_donacion }],
            'nombre'
          )[0],
          categorias: filterSelectsOptiones(
            response.categorias, // catalogo
            response.donation.categorias,
            'nombre'
          ),
          beneficiarios: filterSelectsOptiones(
            response.beneficiarios, // catalogo
            response.donation.beneficiarios,
            'nombre'
          )
        }
        // console.log('INITIAL', initialStateForm)
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
      setLoading(true)
      const donation = {
        data: {
          nombre: data.nombre,
          monto: data.monto,
          esta_facturado: data.esta_facturado || null,
          id_donador: data.id_donador.value,
          id_metodo_pago: data.id_metodo_pago.value,
          id_tipo_donacion: data.id_tipo_donacion.value,
          categories: [...data.categorias.map(c => { return { id: c.value } })],
          beneficiaries: [...data.beneficiarios.map(b => { return { id: b.value } })]
        },
        foto_donacion: data.foto_donacion[0]
      }
      await updateDonation(donation, id)// envio al server
      toastInit('Elemento actualizado')
      setLoading(false)
      setEdit(!edit)
    } catch (error) {
      console.log(error)
      toastInit('Error al actualizar', 'red lighten-2')
      setLoading(false)
    }
  }
  const handlerEdit = () => {
    setEdit(!edit)
  }

  const handlerDeleteImage = async () => {
    try {
      toastInit('Foto eliminada')
      await deletePhotoDonation(id)
      setEdit(!edit)
    } catch (error) {
      toastInit('Error al eliminar foto', 'red lighten-2')
    }
  }

  if (edit === null) {
    return <Navigate to='/dashboard/NOTFOUND' />
  }

  return (
    <>
      <NavPage title='Editar donación' justView={justView} path='/dashboard/donaciones' />
      <Card className='hoverable'>
        <h6 className='teal-text'>Información</h6>
        <div className='img-donacion'>
          <p>Foto de la donación</p>
          <div className='img-wrapper-delete'>
            <MaterialBox element={urlFoto} keyValue={null} />
            {
              !justView && (<button
                className='btn red'
                disabled={!edit || urlFoto === null}
                onClick={handlerDeleteImage}
              >
                Eliminar foto
              </button>)
            }
          </div>
        </div>
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
          <div>
            <label>Facturado</label>
            {
              idsOptions.esta_facturado === null
                ? (
                  <>
                    <input type='text' value='No facturado' disabled={true} />
                  </>)
                : (
                  <>
                    <input
                      onChange={register}
                      type='date'
                      autoComplete='off'
                      {...register('esta_facturado')}
                      disabled={true}
                    />
                    {errors.descripcion &&
                      (<span className='red-text'>
                        {
                          errors.descripcion.message
                        }
                      </span>)
                    }
                  </>)
            }

          </div>
          {/* SELECT DONDADOR */}
          <div className='input-select'>
            <label>Selecciona donador</label>
            <Controller
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
          {
            justView && (<div className='input-field'>
              <Link
                className='teal-text'
                target='_blank' to={`/dashboard/donadores/ver/${idsOptions.idDonador}`}
              >
                Clik para ver detalle de donador
              </Link>
            </div>)
          }
          {/* SELECT MÉTODO DE PAGO */}
          <div className='input-select'>
            <label>Selecciona un método de pago</label>
            <Controller
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
          {
            justView && (<div className='input-field'>
              <Link
                className='teal-text'
                target='_blank' to={`/dashboard/metodos-pago/ver/${idsOptions.idMetodo}`}
              >
                Clik para ver detalle de método de pago
              </Link>
            </div>)
          }
          {/* SELECT TIPO DE DONACIÓN */}
          <div className='input-select'>
            <label>Selecciona que tipo de donativo</label>
            <Controller
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
          {
            justView && (<div className='input-field'>
              <Link
                className='teal-text'
                target='_blank' to={`/dashboard/tipo-donacion/ver/${idsOptions.idTipoDonacion}`}
              >
                Clik para ver detalle de tipo de donativo
              </Link>
            </div>)
          }
          {/* SELECT CATEGORIAS_DONACIONES */}
          <div className='input-select'>
            <label>Selecciona las categorias del donativo</label>
            <Controller
              control={control}
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
          {/* CAMBIO DE FOTO */}

          {
            !justView && (<div className='img-container-input'>
              <div className='img-donacion'>
                <p>Foto de la donación</p>
                <input
                  id='foto_donacion'
                  type='file'
                  {...register('foto_donacion')}
                  disabled={!edit}
                />
              </div>
              {errors.foto_donacion &&
                (<span
                  className='red-text  img-error'
                >
                  {errors.foto_donacion.message}
                </span>)
              }
            </div>)
          }
          {/* BOTONES DE OPCIONES */}
          {
            !justView && (<div className='user__btn__container'>
              <button
                type='submit'
                className='btn btn-success  '
                disabled={loading || !edit}
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
