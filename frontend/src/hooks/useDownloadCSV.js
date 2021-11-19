import { useState } from 'react'
import { CSVLink } from 'react-csv'

export const useDownloadCSV = () => {
  // State for excel
  const [excel, setExcel] = useState({
    headers: [],
    data: []
  })

  const setHeadersCSV = (data, listFilter) => {
    setExcel({
      headers: parseHeaders(data, listFilter),
      data: data
    })
  }

  const parseHeaders = (response, listFilter = ['id', 'foto_donacion']) => {
    const headers = Object.keys(response[0]).map(key => {
      return {
        label: key,
        key
      }
    })
    const headersFiltered = headers.filter(
      header => !listFilter.some(k => k === header.key)
    )
    return headersFiltered
  }

  const DownloadCSV = ({ listFiltered }) => (
    <CSVLink
      className={`
          btn download-excel
          ${listFiltered.length === 0 && 'disabled'}
          `}
      filename={'donaciones.csv'}
      data={excel.data}
      headers={excel.headers}
    >
      Descargar excel
    </CSVLink>
  )

  return {
    DownloadCSV,
    setHeadersCSV
  }
}
