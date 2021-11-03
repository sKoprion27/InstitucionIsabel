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
        path='donors'
        fields={['nombre', 'descripcion']}
      />

      <Card
        actions={[
          <a key='1' href='#'>This is a link</a>,
          <a key='2' href='#'>This is a link</a>
        ]}
        className='blue-grey darken-1 hoverable'
        closeIcon={<Icon>close</Icon>}
        revealIcon={<Icon>more_vert</Icon>}
        textClassName='white-text'
        title='Card title'
      >
        <Icon> phonelink_off </Icon>
        I am a very simple card.
      </Card>
    </>
  )
}
