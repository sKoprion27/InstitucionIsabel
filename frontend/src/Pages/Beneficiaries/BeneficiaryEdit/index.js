import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneBeneficiary } from '../../../helpers/beneficiaries.helpers'
import { BeneficiaryEditForm } from './../../../Components/Beneficiaries/BeneficiaryEditForm'

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
      <h1 className='text-center'>Editar Beneficiario</h1>
      <div className='col-6'>
        <BeneficiaryEditForm {...beneficiary} />
      </div>
    </div>
  )
}
