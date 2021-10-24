import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneBeneficiary } from '../../../helpers/beneficiaries.helpers'
import { BeneficiaryEditForm } from './../../../Components/Beneficiaries/BeneficiaryEditForm'
import { Link } from 'react-router-dom'

export const BeneficiaryEdit = () => {
  const { id } = useParams()
  const [beneficiary, setBeneficiary] = useState({})

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
  }, [id])
  return (
    <div className='row justify-content-center'>
      <div className='user__header'>
        <h1 className='text-center'>Editar Beneficiario</h1>
        <Link to='/dashboard/beneficiarios' className='btn btn-primary btn-lg' >
          Regresar
        </Link>
      </div>
      <div className='col-12 col-md-6'>
        <BeneficiaryEditForm {...beneficiary} />
      </div>
    </div>
  )
}
