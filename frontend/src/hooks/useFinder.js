import { useState } from 'react'

export const useFinder = (finderList = ['nombre']) => {
  const [originalList, setOriginalList] = useState([])
  const [listFiltered, setListFilter] = useState([])

  const toggle = (ref) => {
    ref.value = ''
    setListFilter(originalList)
  }

  const handlerFinder = ({ target }) => {
    console.log(target.value)
    if (target.value === '') {
      setListFilter(originalList)
    } else {
      setListFilter(
        [...listFiltered.filter(element => (
          element.nombre.toLowerCase().includes(target.value.toLowerCase())
        ))]
      )
    }
  }

  return {
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder,
    toggle
  }
}
