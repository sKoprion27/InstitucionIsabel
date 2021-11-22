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
import { parseDonations } from '../../../utils'
import { PaginationLayout } from '../../../Components/Dashboard/PaginationLayout'

export const DonationsList = () => {
  const [didFetch, setDidFetch] = useState(false)
  // States for pagination
  const [totalElements, setTotalElements] = useState(null)
  const [initialPage, setInitialPage] = useState(0)
  const limitPagination = 10
  const initialQuery = {
    limit: limitPagination,
    offset: 0
  }
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
        setInitialPage(-1)
        initLoading()
        const { donations, total } = await getAllDonationsPagination(initialQuery)
        if (!(donations.length === 0)) {
          setHeadersCSV(donations)
        }
        setOriginalList(parseDonations(donations))
        setListFilter(parseDonations(donations))
        setTotalElements(total / limitPagination)
        toastInit('Lista actualizada')
        setDateRange([null, null])
        setInitialPage(0)
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
      setInitialPage(0)
      initLoading()
      if (!startDate || !endDate) {
        const { donations, total } = await getAllDonationsPagination(initialQuery)
        setOriginalList(parseDonations(donations))
        setListFilter(parseDonations(donations))
        setTotalElements(total / limitPagination)
        setInitialPage(-1)
        toastInit('Lista filtrada')
        setHeadersCSV(donations)
        endLoading()
      } else {
        const initDate = startDate.toString().split('00')[0]
        const finishDate = endDate.toString().split('00')[0]
        const { donations, total } = await getAllDonationsByRange({
          startDate: initDate,
          endDate: finishDate
        })

        setOriginalList(donations)
        setListFilter(donations)
        setTotalElements(total / limitPagination)
        setInitialPage(0)
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
              dateFormat='yyyy-MM-dd'
              valueFormat='yyyy-MM-dd'
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

      <PaginationLayout
        backend='donations'
        limitPagination={limitPagination}
        setOriginalList={setOriginalList}
        setListFilter={setListFilter}
        totalElements={totalElements}
        initialPage={initialPage}
        arrayListFiltered={listFiltered}
      >
        <TableList
          loading={loading}
          arrayList={originalList}
          arrayListFiltered={listFiltered}
          setFetchAction={setDidFetch}
          backend='donations'
          fields={['id', 'creado', 'tipo_donacion']}
        />
      </PaginationLayout>
    </>
  )
}
