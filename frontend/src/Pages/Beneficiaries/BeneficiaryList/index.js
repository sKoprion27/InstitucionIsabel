import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllBeneficiaries } from '../../../helpers/beneficiaries.helpers'

export const BeneficiaryList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  } = useFinder()

  useEffect(() => {
    const getList = async () => {
      try {
        const beneficiaries = await getAllBeneficiaries()
        setOriginalList(beneficiaries)
        setListFilter(beneficiaries)
      } catch (error) {
        console.log(error)
        alert('ERROR')
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de beneficiarios' onePage />
      <MenuPage name='beneficiario' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
