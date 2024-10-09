import { gql, useQuery } from '@apollo/client';
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

// Definisikan query GraphQL
const GET_ALL_TRANSACTION = gql`
  query GetAllTransaction {
    TransactionList {
      _id
      qr_code
      rfid
      product_name
      unit_price
      amount
      total_price
      date
    }
  }
`;

export default function TransactionHistoryPages() {
  const navigate = useNavigate();
  const handleMainPages = () => {
    navigate('/');
  };

  const { loading, error, data } = useQuery(GET_ALL_TRANSACTION);

  if (loading)
    return (
      <div className='loading-spinner bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
        Loading...
      </div>
    );
  if (error) return <div className='error-message'>Error: {error.message}</div>;

  return (
    <div className='bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
      {data.TransactionList.length === 0 ? (
        <div className='mb-5 text-3xl font-semibold text-white empty-data-message'>
          No transaction yet.
        </div>
      ) : (
        <div className='overflow-x-auto table-wrapper'>
          <Typography className='mb-5 text-3xl font-semibold text-center text-black'>
            Transaction History
          </Typography>
          <table className='border border-collapse border-black table-auto'>
            <thead>
              <tr className='bg-gray-400'>
                <th className='px-4 py-2 border border-black'>No.</th>
                <th className='px-4 py-2 border border-black'>Transaction ID</th>
                <th className='px-4 py-2 border border-black'>QR Code</th>
                <th className='px-4 py-2 border border-black'>RFID</th>
                <th className='px-4 py-2 border border-black'>Product Name</th>
                <th className='px-4 py-2 border border-black'>Unit Price</th>
                <th className='px-4 py-2 border border-black'>Amount</th>
                <th className='px-4 py-2 border border-black'>Total Price</th>
                <th className='px-4 py-2 border border-black'>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.TransactionList.map((transaction, index) => (
                <tr key={transaction._id} className='bg-gray-50'>
                  <td className='px-4 py-2 border border-black'>{index + 1}</td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction._id}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction.qr_code}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction.rfid}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                      {transaction.product_name}
                    </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction.unit_price}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction.amount}
                  </td>
                  <td className='px-4 py-2 border border-black'>
                      {transaction.total_price}
                    </td>
                  <td className='px-4 py-2 border border-black'>
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            onClick={handleMainPages}
            className='mt-4 font-semibold text-gray-100 bg-black'
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
}