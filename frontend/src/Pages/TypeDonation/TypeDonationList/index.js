import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllTypesDonations } from '../../../helpers/typedonations.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'

export const TypeDonationList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const { initLoading, endLoading, loading } = useLoading()
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
        initLoading()
        const categories = await getAllTypesDonations()
        setOriginalList(categories)
        setListFilter(categories)
        toastInit('Lista actualizada')
        endLoading()
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar lista', 'red lighten-2')
        endLoading()
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de tipos de donaciones' onePage />
      <MenuPage
        name='tipo de donación'
        handler={handlerFinder}
        backend='types-donations'
      />
      <TableList
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='types-donations'
        fields={['id']}
      />
    </>
  )
}
