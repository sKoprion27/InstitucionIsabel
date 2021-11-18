import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllPayments } from '../../../helpers/payment.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'

export const PaymentList = () => {
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
        const categories = await getAllPayments()
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
      <NavPage title='Lista de métodos de pago' onePage />
      <MenuPage name='método pago' backend='payment-methods' handler={handlerFinder} />
      <TableList
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='payment-methods'
        fields={['id']}
      />
    </>
  )
}
