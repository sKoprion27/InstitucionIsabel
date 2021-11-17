import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllPayments } from '../../../helpers/payment.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const PaymentList = () => {
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
        const categories = await getAllPayments()
        setOriginalList(categories)
        setListFilter(categories)
        toastInit('Lista actualizada')
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar lista', 'red lighten-2')
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de métodos de pago' onePage />
      <MenuPage name='método pago' backend='payment-methods' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='payment-methods'
        fields={['id']}
      />
    </>
  )
}
