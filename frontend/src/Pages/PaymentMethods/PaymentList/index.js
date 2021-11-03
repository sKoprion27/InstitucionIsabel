import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllPayments } from '../../../helpers/payment.helpers'

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
      } catch (error) {
        console.log(error)
        alert('ERROR')
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de métodos de pago' onePage />
      <MenuPage name='método pago' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        path='payment-methods'
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
