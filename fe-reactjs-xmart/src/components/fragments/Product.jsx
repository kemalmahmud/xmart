import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

export default function Product() {
  const [dataProduct, setDataProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/product',
        );
        setDataProduct(response.data);
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
        Products
      </Typography>
      <table className='border border-collapse border-black table-auto'>
        <thead>
          <tr className='bg-gray-400'>
            <th className='px-4 py-2 border border-black'>No.</th>
            <th className='px-4 py-2 border border-black'>RFID</th>
            <th className='px-4 py-2 border border-black'>Name</th>
            <th className='px-4 py-2 border border-black'>Price</th>
          </tr>
        </thead>
        <tbody>
          {dataProduct.map((product, index) => (
            <tr key={index} className='bg-gray-50'>
              <td className='px-4 py-2 border border-black'>{index + 1}</td>
              <td className='px-4 py-2 border border-black'>{product.rfid}</td>
              <td className='px-4 py-2 border border-black'>
                {product.productName}
              </td>
              <td className='px-4 py-2 border border-black'>
                {product.unitPrice}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}