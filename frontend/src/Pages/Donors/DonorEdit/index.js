import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneDonor } from '../../../helpers/donors.helpers'
import { DonorEditForm } from './../../../Components/Donors/DonorEditForm/index'

export const DonorEdit = () => {
  const { id } = useParams()
  const [donor, setDonor] = useState({})

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
  }, [id])
  return (
    <div className='row justify-content-center'>
      <h1 className='text-center'>Editar donador</h1>
      <div className='col-6'>
        <DonorEditForm {...donor} />
      </div>
    </div>
  )
}
