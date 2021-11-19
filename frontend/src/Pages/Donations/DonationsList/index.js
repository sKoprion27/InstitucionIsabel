import { NavPage } from '../../../Components/Dashboard/NavPage'
import { MenuPage } from '../../../Components/Dashboard/MenuPage'
import { useEffect, useState } from 'react'
import { useFinder } from '../../../hooks/useFinder'
import { TableList } from '../../../Components/Dashboard/TableList'
import {
  getAllDonations,
  getAllDonationsByRange,
  getAllDonationsPagination
} from '../../../helpers/donations.helpers'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'
import { toastInit } from '../../../Components/Dashboard/AlertToast'
import { useLoading } from '../../../hooks/useLoading'
import { useDownloadCSV } from '../../../hooks/useDownloadCSV'

export const DonationsList = () => {
  const [didFetch, setDidFetch] = useState(false)
  const [totalDonations, setTotalDonations] = useState(null)
  const limitPagination = 10

  // States for use finder
  const {
    toggle,
    setOriginalList,
    setListFilter,
    originalList,
    listFiltered,
    handlerFinder
  } = useFinder(['nombre', 'monto', 'donador', 'facturado'])

  const { DownloadCSV, setHeadersCSV } = useDownloadCSV()

  const { initLoading, endLoading, loading } = useLoading()
  // Get initial list
  useEffect(() => {
    const getList = async () => {
      try {
        initLoading()
        const { donations, total } = await getAllDonations()
        if (!(donations.length === 0)) {
          setHeadersCSV(donations)
        }
        setTotalDonations(total / limitPagination)
        setOriginalList(parseDonations(donations))
        setListFilter(parseDonations(donations))
        toastInit('Lista actualizada')
        endLoading()
      } catch (error) {
        console.log(error)
        toastInit('Error al cargar la lista', 'red lighten-2')
        endLoading()
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
      initLoading()
      if (!startDate || !endDate) {
        const { donations } = await getAllDonations()
        setOriginalList(parseDonations(donations))
        setListFilter(parseDonations(donations))
        toastInit('Lista filtrada')
        setHeadersCSV(donations)
        endLoading()
      } else {
        const donations = await getAllDonationsByRange({
          startDate: '2021/11/25',
          endDate: '2021/11/30'
        })
        setOriginalList(donations)
        setListFilter(donations)
        toastInit('Lista actualizada')
        if (!(donations.length === 0)) {
          setHeadersCSV(donations)
        }
        endLoading()
      }
    } catch (error) {
      console.log(error)
      toastInit('Error al filtrar por fechas', 'red lighten-2')
      endLoading()
    }
  }

  const handlerPagination = async ({ selected }) => {
    const pagination = selected
    const donations = await getAllDonationsPagination(
      {
        limit: (pagination * limitPagination) + limitPagination,
        offset: pagination * limitPagination
      }
    )
    setOriginalList(parseDonations(donations))
    setListFilter(parseDonations(donations))
    console.log(donations)
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
        <DownloadCSV listFiltered={listFiltered} />
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
        loading={loading}
        arrayList={originalList}
        arrayListFiltered={listFiltered}
        setFetchAction={setDidFetch}
        backend='donations'
        fields={['id', 'creado', 'tipo_donacion']}
      />
    </>
  )
}
const parseDonations = (donations) => {
  return donations.map(d => {
    return {
      ...d,
      facturado: d.facturado === null ? 'No facturado' : d.facturado
    }
  })
}
