import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllTypesDonations } from '../../../helpers/typedonations.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'

export const TypeDonationList = () => {
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
        const categories = await getAllTypesDonations()
        setOriginalList(categories)
        setListFilter(categories)
      } catch (error) {
        console.log(error)
        alert('ERROR')
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de tipos de donaciones' onePage />
      <MenuPage name='tipo de donación' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
