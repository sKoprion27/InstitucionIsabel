import { Link } from 'react-router-dom'
export const DonationsList = () => {
  const mock = [1, 2, 3, 4]
  return (
    <div>
      <h1>Donation List</h1>
      {
        mock.map(m => (
          <Link
            className='btn btn-secondary m-3'
            key={m}
            to={`${m}`}
          >
            {m}
          </Link>)
        )
      }
    </div>
  )
}
