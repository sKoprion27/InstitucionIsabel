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
  children,
  initialPage,
  arrayListFiltered = []
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
          previousLabel={
            <span
              className={`btn ${(arrayListFiltered.length === 0) && 'disabled'}`}>
              Anterior
            </span>
          }
          nextLabel={
            <span
              className={`btn ${(arrayListFiltered.length === 0) && 'disabled'}`}>
              Siguiente
            </span>
          }
          breakLabel={'...'}
          prevPageRel={null}
          pageCount={Math.ceil(totalElements)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          forcePage={initialPage}
          onPageActive={handlerPagination}
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
          disableInitialCallback
        />
      </div>
      {children}
    </>
  )
}
