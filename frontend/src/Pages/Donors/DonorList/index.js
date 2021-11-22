import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllDonorsPagination } from '../../../helpers/donors.helpers'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'
import { PaginationLayout } from '../../../Components/Dashboard/PaginationLayout'

export const DonorList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const { endLoading, initLoading, loading } = useLoading()
  const [totalElements, setTotalElements] = useState(null)
  const limitPagination = 10
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
        const { donors, total } = await getAllDonorsPagination({
          limit: limitPagination,
          offset: 0
        })
        setOriginalList(donors)
        setListFilter(donors)
        setTotalElements(total / limitPagination)
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
      <NavPage title='Lista de donadores' onePage />
      <MenuPage
        name='donador'
        type='nombre'
        handler={handlerFinder}
        backend='donors'
      />
      <PaginationLayout
        setOriginalList={setOriginalList}
        setListFilter={setListFilter}
        backend='donors'
        limitPagination={limitPagination}
        totalElements={totalElements}
        arrayListFiltered={listFiltered}
      >
        <TableList
          loading={loading}
          arrayList={originalList}
          arrayListFiltered={listFiltered}
          setFetchAction={setDidFetch}
          backend='donors'
          fields={['id', 'creado', 'correo_electronico', 'regimen_fiscal', 'clave_cfdi', 'codigo_postal', 'domicilio_fiscal', 'descripcion_cfdi']}
        />
      </PaginationLayout>
    </>
  )
}
