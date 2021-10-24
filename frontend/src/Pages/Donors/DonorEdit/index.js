import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getOneDonor } from '../../../helpers/donors.helpers'
import { DonorEditForm } from './../../../Components/Donors/DonorEditForm/index'
import { Link } from 'react-router-dom'

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
      <div className='user__header'>
        <h1 className='text-center'>Editar Donador</h1>
        <Link to='/dashboard/donadores' className='btn btn-primary btn-lg' >
          Regresar
        </Link>
      </div>
      <div className='col-12 col-md-6'>
        <DonorEditForm />
      </div>
    </div>
  )
}
