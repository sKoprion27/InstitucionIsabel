import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllDonations } from '../../../helpers/donations.helpers'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'
import es from 'date-fns/locale/es'
import { toastInit } from '../../../Components/Dashboard/AlertToast'

export const DonationsList = () => {
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
        const donations = await getAllDonations({})
        setOriginalList(donations)
        setListFilter(donations)
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar la lista', 'red lighten-2')
      }
    }
    getList()
  }, [didFetch])
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const finderByRange = async () => {
    try {
      if (startDate === null || endDate === null) {
        const donations = await getAllDonations({})
        setOriginalList(donations)
        setListFilter(donations)
        toastInit('Lista actualizada')
      } else {
        const donations = await getAllDonations({
          startDate: startDate.toString().split('GMT')[0],
          endDate: endDate.toString().split('GMT')[0]
        })
        setOriginalList(donations)
        setListFilter(donations)
        toastInit('Lista actualizada')
      }
    } catch (error) {
      console.log(error)
      toastInit('Error al filtrar por fechas', 'red lighten-2')
    }
  }

  return (
    <>
      <NavPage title='Lista de donaciones' onePage />
      <MenuPage
        name='donaciones'
        type='nombre'
        handler={handlerFinder}
        backend='donations'
      />
      <div className='date-picker-options'>
        <label>Selecciona rango de fechas de facturas</label>
        <div className='finder'>
          <button
            className='btn'
            onClick={finderByRange}
          >
            Filtrar
          </button>
          <DatePicker

            dateFormat='yyyy/MM/dd'
            valueFormat='yyyy/MM/dd'
            placeholderText='Click para seleccionar rango'
            showTimeSelect={false}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={
              (update) => {
                setDateRange(update)
              }}
            isClearable={true}
            withPortal
          />
        </div>
      </div>
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='donations'
        fields={['nombre', 'descripcion']}
      />
    </>
  )
}
