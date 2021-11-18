import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllBeneficiaries } from '../../../helpers/beneficiaries.helpers'
import { getAllStates } from '../../../helpers/states.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'

export const BeneficiaryList = () => {
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
        const beneficiaries = await getAllBeneficiaries()
        setOriginalList(beneficiaries)
        setListFilter(beneficiaries)
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
      <NavPage title='Lista de beneficiarios' onePage />
      <MenuPage
        name='beneficiario'
        handler={handlerFinder}
        backend='beneficiaries'
      />
      <TableList
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='beneficiaries'
      />
    </>
  )
}
