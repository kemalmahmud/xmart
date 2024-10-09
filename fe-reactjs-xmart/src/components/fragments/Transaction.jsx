import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

export default function Transaction() {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/transaction',
        );
        setDataTransaction(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=''>
      <Typography className='mb-1 font-medium text-center text-black text-5'>
        Data Transaction
      </Typography>
      <div className='overflow-auto max-h-96'>
        <table className='border border-collapse border-black table-auto'>
          <thead>
            <tr className='bg-gray-400'>
              <th className='px-4 py-2 border border-black'>No.</th>
              <th className='px-4 py-2 border border-black'>QRCode</th>
              <th className='px-4 py-2 border border-black'>RFID</th>
              <th className='px-4 py-2 border border-black'>Product Name</th>
              <th className='px-4 py-2 border border-black'>Unit Price</th>
              <th className='px-4 py-2 border border-black'>Amount</th>
              <th className='px-4 py-2 border border-black'>Total Price</th>
              <th className='px-4 py-2 border border-black'>Date</th>
            </tr>
          </thead>
          <tbody>
            {dataTransaction.map((transaction, index) => (
              <tr key={index} className='bg-gray-50'>
                <td className='px-4 py-2 border border-black'>{index + 1}</td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.qrCode}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.rfid}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.product_name}
                </td>
                <td className='px-4 py-2 border border-black'>
                  Rp.{transaction.unitPrice}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.amount}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.totalPrice}
                </td>
                <td className='px-4 py-2 border border-black'>
                  {transaction.transactionDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}