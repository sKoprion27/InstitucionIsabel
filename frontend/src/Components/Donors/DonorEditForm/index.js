import './style.scss'
import { useEffect, useState } from 'react'
import { getOneDonor, updateDonor } from './../../../helpers/donors.helpers'
import { useParams } from 'react-router'
export const DonorEditForm = () => {
  const { id } = useParams()
  const [donor, setDonor] = useState({
    telefono: '',
    razon_social: '',
    rfc: '',
    correo_electronico: '',
    codigo_postal: '',
    domicilio_fiscal: '',
    regimen_fiscal: '',
    estado: '',
    clave_cfdi: '',
    descripcion_cfdi: ''
  })
  const { telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, estado, clave_cfdi, descripcion_cfdi } = donor

  useEffect(() => {
    const getDonor = async () => {
      try {
        const donor = await getOneDonor(id)
        setDonor(donor)
      } catch (error) {
        console.log(error)
      }
    }
    getDonor()
  }, [])

  const handlerChange = (e) => {
    setDonor(() => {
      return {
        ...donor,
        [e.target.regimenFiscal]: e.target.regimenFiscal === 'regimen_fiscal'
          ? Number(e.target.value)
          : e.target.value
      }
    })
  }
  console.log(donor)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    console.log(donor, '🚀')
    try {
      const donornew = { id, ...donor }
      const response = await updateDonor(donornew, id)
      console.log(response, '😀')
    } catch (error) {
      console.log(error.response, '😆')
    }
  }
  return (
    <form className='donor__form' onSubmit={handlerSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Telefono</label>
        <input onChange={handlerChange} type='text' className='form-control' name='telefono' value={telefono} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Razon Social</label>
        <input onChange={handlerChange} type='text' className='form-control' name='razon_social' value={razon_social} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>RFC</label>
        <input onChange={handlerChange} type='text' className='form-control' name='rfc' value={rfc} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Email</label>
        <input onChange={handlerChange} type='text' className='form-control' name='correo_electronico' value={correo_electronico} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Código Postal</label>
        <input onChange={handlerChange} type='text' className='form-control' name='codigo_postal' value={codigo_postal} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Domicilio Fiscal</label>
        <input onChange={handlerChange} type='text' className='form-control' name='domicilio_fiscal' value={domicilio_fiscal} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Régimen Fiscal</label>
        <input onChange={handlerChange} type='text' className='form-control' name='regimen_fiscal' value={regimen_fiscal} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Estado</label>
        <input onChange={handlerChange} type='text' className='form-control' name='estado' value={estado} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Clave CFDI</label>
        <input onChange={handlerChange} type='text' className='form-control' name='clave_cfdi' value={clave_cfdi} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Descripción CFDI</label>
        <input onChange={handlerChange} type='text' className='form-control' name='descripcion_cfdi' value={descripcion_cfdi} />
      </div>
      <div className='mb-3'>
      </div>
      <div className='user__btn__container'>
        <button type='submit' className='btn btn-secondary btn-lg' >Actualizar donador</button>
      </div>

    </form>
  )
}
