import './style.scss'
import { useEffect, useState } from 'react'
import { getOneBeneficiary, updateBeneficiary } from './../../../helpers/beneficiaries.helpers'
import { useParams } from 'react-router'
export const BeneficiaryEditForm = () => {
  const { id } = useParams()
  const [beneficiary, setBeneficiary] = useState({
    nombre_beneficiario: '',
    descripcion: ''
  })
  const { nombre_beneficiario, descripcion } = beneficiary

  useEffect(() => {
    const getBeneficiary = async () => {
      try {
        const beneficiary = await getOneBeneficiary(id)
        setBeneficiary(beneficiary)
      } catch (error) {
        console.log(error)
      }
    }
    getBeneficiary()
  }, [])

  const handlerChange = (e) => {
    setBeneficiary(() => {
      return {
        ...beneficiary
      }
    })
  }
  console.log(beneficiary)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    console.log(beneficiary, '🚀')
    try {
      const beneficiarynew = { id, ...beneficiary }
      const response = await updateBeneficiary(beneficiarynew, id)
      console.log(response, '😀')
    } catch (error) {
      console.log(error.response, '😆')
    }
  }
  return (
    <form className='donor__form' onSubmit={handlerSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Nombre Beneficiario</label>
        <input onChange={handlerChange} type='text' className='form-control' name='nombre_beneficiario' value={nombre_beneficiario} />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Descripción</label>
        <input onChange={handlerChange} type='text' className='form-control' name='descripcion' value={descripcion} />
      </div>
      <div className='mb-3'>
      </div>
      <div className='user__btn__container'>
        <button type='submit' className='btn btn-secondary btn-lg' >Actualizar donador</button>
      </div>

    </form>
  )
}
