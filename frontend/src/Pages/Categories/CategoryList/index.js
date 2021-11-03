import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { getAllCategories } from '../../../helpers/categories.helpers'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'

export const CategoryList = () => {
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
        const categories = await getAllCategories()
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
      <NavPage title='Lista de categorias' onePage />
      <MenuPage name='categoria' handler={handlerFinder} />
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
