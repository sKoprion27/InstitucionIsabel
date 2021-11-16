import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import { getAllDonations } from '../../../helpers/donations.helpers'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { CSVLink } from 'react-csv'

export const DonationsList = () => {
  const [didFetch, setDidFetch] = useState(false)

  // States for use finder
  const {
    toggle,
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  } = useFinder(['nombre', 'monto', 'donador', 'facturado'])

  // State for excel
  const [excel, setExcel] = useState({
    headers: [
      { label: 'First Name', key: 'firstname' },
      { label: 'Last Name', key: 'lastname' },
      { label: 'Email', key: 'email' }
    ],
    data: [
      { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
      { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
      { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
    ]
  })

  // Get initial list
  useEffect(() => {
    const getList = async () => {
      try {
        const donations = await getAllDonations({})
        const donationsParse = donations.map(d => {
          return {
            ...d,
            facturado: d.facturado === null ? 'No facturado' : d.facturado
          }
        })
        setOriginalList(donationsParse)
        setListFilter(donationsParse)
        setExcel({
          headers: getHeadersCVS(donations),
          data: donations
        })
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar la lista', 'red lighten-2')
      }
    }
    getList()
  }, [didFetch])

  // States for date range
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  // Get range list
  const finderByRange = async () => {
    try {
      if (startDate === null || endDate === null) {
        const donations = await getAllDonations({})
        setOriginalList(donations)
        setListFilter(donations)
        toastInit('Lista actualizada')
        setExcel({
          headers: getHeadersCVS(donations),
          data: donations
        })
      } else {
        const donations = await getAllDonations({
          startDate: startDate.toString().split('GMT')[0],
          endDate: endDate.toString().split('GMT')[0]
        })
        setOriginalList(donations)
        setListFilter(donations)
        toastInit('Lista actualizada')
        setExcel({
          headers: getHeadersCVS(donations),
          data: donations
        })
      }
    } catch (error) {
      console.log(error)
      toastInit('Error al filtrar por fechas', 'red lighten-2')
    }
  }

  const getHeadersCVS = (response, arr = ['id', 'foto_donacion']) => {
    const headers = Object.keys(response[0]).map(key => {
      return {
        label: key,
        key
      }
    })
    const headersFiltered = headers.filter(
      header => !arr.some(k => k === header.key)
    )
    return headersFiltered
  }

  return (
    <>
      <NavPage title='Lista de donaciones' onePage />
      <MenuPage
        name='donaciones'
        type='nombre'
        toggle={toggle}
        handler={handlerFinder}
        backend='donations'
      />
      <div className='report-area'>
        <CSVLink
          className='btn download-excel'
          filename={'donaciones.csv'}
          data={excel.data}
          headers={excel.headers}
        >
          Descargar excel
        </CSVLink>
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
      </div>
      <TableList
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='donations'
        fields={['id', 'creado', 'tipo_donacion']}
      />
    </>
  )
}
