import { Icon } from 'react-materialize'
import ReactPaginate from 'react-paginate'
export const usePagination = () => {
  const Pagination = () => {
    return (
      <ReactPaginate
        previousLabel={<span className='btn'>Anterior</span>}
        nextLabel={<span className='btn'>Siguiente</span>}
        breakLabel={'...'}
        pageCount={Math.ceil(totalDonations)}
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
    )
  }
}
