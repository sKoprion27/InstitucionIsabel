import ReactPaginate from 'react-paginate'
import { getAllDonationsPagination } from '../../../helpers/donations.helpers'
import { getAllDonorsPagination } from '../../../helpers/donors.helpers'
import { parseDonations } from '../../../utils'
import './style.scss'
export const PaginationLayout = ({
  backend,
  setOriginalList,
  setListFilter,
  totalElements,
  limitPagination,
  children
}) => {
  const handlerPagination = async ({ selected }) => {
    const pagination = selected
    const query = {
      limit: limitPagination,
      offset: pagination * limitPagination
    }

    switch (backend) {
      case 'donations':
        await queryDonation(query)
        break
      case 'donors':
        await queryDonor(query)
        break
    }
  }
  const queryDonation = async (query) => {
    const { donations } = await getAllDonationsPagination(query)
    setOriginalList(parseDonations(donations))
    setListFilter(parseDonations(donations))
  }

  const queryDonor = async (query) => {
    const { donors } = await getAllDonorsPagination(query)
    setOriginalList(donors)
    setListFilter(donors)
  }

  return (
    <>
      <div className='layout-pagination'>
        <ReactPaginate
          previousLabel={<span className='btn'>Anterior</span>}
          nextLabel={<span className='btn'>Siguiente</span>}
          breakLabel={'...'}
          pageCount={Math.ceil(totalElements)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlerPagination}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
      {children}
    </>
  )
}
