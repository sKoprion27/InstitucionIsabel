import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllDonors } from '../../../helpers/donors.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'

import { Card, Icon } from 'react-materialize'

export const DonorList = () => {
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
        const donors = await getAllDonors()
        setOriginalList(donors)
        setListFilter(donors)
      } catch (error) {
        console.log(error)
        alert('ERROR')
      }
    }
    getList()
  }, [didFetch])

  return (
    <>
      <NavPage title='Lista de donadores' onePage />
      <MenuPage name='donador' type='nombre' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='donors'
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
