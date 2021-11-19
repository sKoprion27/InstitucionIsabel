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
import { HelpShorcut } from '../../../Components/Dashboard/HelpShorcut'
import { useLoading } from '../../../hooks/useLoading'

export const DonationEdit = ({ justView }) => {
  const { id } = useParams()
  const animatedComponents = makeAnimated()
  const { initLoading, endLoading, Spinner, loading } = useLoading()
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
        initLoading()
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
        endLoading()
      } catch (error) {
        console.log(error)
        endLoading()
        setEdit(null)
      }
    }
    getOne()
  }, [id, edit])

  // Use Effect for selects info

  const handlerSubmit = async (data, e) => {
    try {
      initLoading()
      console.log(data.foto_donacion[0] ? data.foto_donacion[0] : null)
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
        foto_donacion: data.foto_donacion[0] ? data.foto_donacion[0] : null
      }
      await updateDonation(donation, id)// envio al server
      toastInit('Elemento actualizado')
      endLoading()
      setEdit(!edit)
      e.target.reset()
    } catch (error) {
      console.log(error)
      toastInit('Error al actualizar', 'red lighten-2')
      endLoading()
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
            justView && (<HelpShorcut
              path={`donadores/${idsOptions.idDonador}`}
              text='Click para ver detalle de donador'
            />)
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
            justView && (<HelpShorcut
              path={`metodos-pago/${idsOptions.idMetodo}`}
              text='Click para ver detalle de método de pago'
            />)
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
            justView && (<HelpShorcut
              path={`tipo-donacion/${idsOptions.idTipoDonacion}`}
              text='Click para ver detalle de tipo de donativo' />)
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
          {/* AGREGAR DE FOTO */}
          {
            !justView && (<div className='img-container-input'>
              <div className='file-field input-field'>
                <div className={`btn ${!edit && 'disabled'}`}>
                  <span>Cambiar foto</span>
                  <input
                    type='file'
                    {...register('foto_donacion')}
                    disabled={!edit}
                  />
                </div>
                <div className='file-path-wrapper'>
                  <input
                    className='file-path validate'
                    type='text'
                    disabled={!edit}
                  />
                </div>
              </div>
              {errors.foto_donacion &&
                (<span
                  className='red-text img-error'
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
            loading && (<Spinner />)
          }
        </form>
      </Card>
    </>
  )
}
