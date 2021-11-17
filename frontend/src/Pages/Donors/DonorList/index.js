import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllDonors } from '../../../helpers/donors.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

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
      <NavPage title='Lista de donadores' onePage />
      <MenuPage
        name='donador'
        type='nombre'
        handler={handlerFinder}
        backend='donors'
      />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='donors'
        fields={['id', 'creado', 'correo_electronico', 'regimen_fiscal']}
      />
    </>
  )
}
