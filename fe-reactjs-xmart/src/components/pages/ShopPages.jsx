import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Shirt from '../../assets/shirt.png';
import Cart from '../../assets/cart.png';

const GET_CUSTOMER_TRANSACTION_HISTORY = gql`
  query GetCustomerTransactionHistory($qrCode: String) {
    TransactionListByCustomer(qrCode: $qrCode) {
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

const EDIT_TRANSACTION_AMOUNT = gql`
  mutation EditTransactionAmount($id: ID!, $amount: Int!) {
    UpdateTransaction(_id: $id, amount: $amount) {
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

const ADD_TO_CART = gql`
  mutation AddCustomerTransaction(
    $qrCode: String!
    $rfid: String!
    $productName: String!
    $unitPrice: Int!
    $amount: Int!
  ) {
    AddTransaction( data : {
      qr_code: $qrCode,
      rfid: $rfid,
      product_name: $productName,
      unit_price: $unitPrice,
      amount: $amount
    }) {
      _id
      qr_code
      rfid
      product_name
      unit_price
      amount
      date
    }
  }
`;

export default function ShopPages() {
  const [dataProduct, setDataProduct] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState(null);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [editTransactionAmount] = useMutation(EDIT_TRANSACTION_AMOUNT);
  const [createTransaction, { loading: loadingAddToCart }] =
    useMutation(ADD_TO_CART);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/product',
        );
        setDataProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    const { rfid, unitPrice, productName } = product;
    console.log("name" + productName);
    const transactionData = {
      qrCode: customerData.qrCode,
      rfid: rfid,
      productName: productName,
      unitPrice: unitPrice,
      amount: 1,
    };

    try {
      await createTransaction({
        variables: {
          qrCode: customerData.qrCode,
          rfid: rfid,
          productName : productName,
          unitPrice: unitPrice,
          amount: 1,
        },
      });
      console.log('Success add transaction!');
      window.location.reload();
    } catch (error) {
      console.error('Error add transaction:', error);
    }
  };

  const handleAddAmount = async (id, currentAmount) => {
    try {
      await editTransactionAmount({
        variables: { id: id, amount: parseInt(currentAmount, 10) + 1 },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating amount transaction:', error);
    }
  };

  const handleReduceAmount = async (id, currentAmount) => {
    try {
      await editTransactionAmount({
        variables: { id: id, amount: parseInt(currentAmount, 10) - 1 },
      });

      window.location.reload();
    } catch (error) {
      console.error('Error updating amount transaction:', error);
    }
  };

  const handleSaveTransaction = async () => {
    try {
      navigate('/customer-transaction-history', {
        state: { customerData: customerData },
      });
      alert('Success');
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleMainPages = () => {
    navigate('/');
  };

  const transactionPages = () => {
    navigate('/shop', { state: { customerData: customerData } });
  };

  const historyTransactionPages = () => {
    navigate('/customer-transaction-history', {
      state: { customerData: customerData },
    });
  };

  useEffect(() => {
    if (location.state && location.state.customerData) {
      setCustomerData(location.state.customerData);
    }
  }, [location]);

  useEffect(() => {
    if (deletedSuccess) {
      window.location.reload();
    }
  }, [deletedSuccess]);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/transaction/${transactionId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        setDeletedSuccess(true);
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  let qrCode = '';
  if (customerData && customerData.qrCode) {
    qrCode = customerData.qrCode;
  }
  const { loading, error, data } = useQuery(
    GET_CUSTOMER_TRANSACTION_HISTORY,
    {
      variables: { qrCode: qrCode },
    },
  );

  if (loading)
    return (
      <div className='loading-spinner bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'></div>
    );
  if (error) return <div className='error-message'>Error: {error.message}</div>;

  return (
    <div className='bg-[#3AAFA9] min-h-screen flex flex-col justify-center items-center'>
      <div className='absolute top-0 h-20 bg-white left-0 w-full flex justify-between bg-[#3AAFA9]'>
        <div className='flex items-center'>
          <Typography className='ml-4 font-bold text-black'>X-Mart</Typography>
          <Button
            onClick={transactionPages}
            className='mx-2 font-semibold text-gray-100 bg-black'
          >
            Shop
          </Button>
          <Button
            onClick={historyTransactionPages}
            className='mx-2 font-semibold text-gray-100 bg-black'
          >
            History Transaction
          </Button>
        </div>
        <div className='flex items-center font-semibold'>
          {customerData && (
            <div className='flex '>
              <p className='mx-2 text-black bg-transparent'>
                {customerData.name}
              </p>
            </div>
          )}
          <Button
            onClick={handleMainPages}
            className='mx-4 font-semibold text-gray-100 bg-black'
          >
            Logout
          </Button>
        </div>
      </div>

      <div className='flex mt-[5rem] justify-center items-center'>
        <div className=' w-5/5'>
          <div className='flex justify-center p-3 '>
            {dataProduct.map((product, index) => (
              <Button
                key={index}
                className='mx-2 text-black bg-[#3ebbb5] p-0 '
                onClick={() => handleAddToCart(product)}
              >
                <Card className='flex-grow bg-white '>
                  <img src={Shirt} className='mt-2 size-40' />
                  <div className='text-lg'>
                    <p>{product.productName}</p>
                    <p className='mb-2'>Rp.{product.unitPrice}</p>
                  </div>
                </Card>
                <div className='flex justify-center my-2 text-sm text-white'>
                  <div className='flex items-center '>
                    <img src={Cart} className='size-5' />
                    <Typography className='ml-1 text-sm font-medium'>
                      Add
                    </Typography>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className='w-5/5'>
          <div className='flex justify-center p-3 mt-3 ml-2 overflow-auto bg-white min-h-64 max-h-[35rem] '>
            {data.TransactionListByCustomer.length === 0 ? (
              <div className='mb-5 text-lg font-semibold text-black empty-data-message'>
                No Transaction.
              </div>
            ) : (
              <div className='overflow-x-auto table-wrapper'>
                <Typography className='flex justify-center mb-2 text-xl font-bold'>
                  Cart
                </Typography>

                <table className='min-w-full'>
                  <thead>
                    <tr>
                      <th className='p-2 text-center'>RFID</th>
                      <th className='p-2 text-center'>Product</th>
                      <th className='p-2 text-center'>Price</th>
                      <th className='p-2 text-center'>Amount</th>
                      <th className='p-2 text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.TransactionListByCustomer.map((transactionByQRCode) => (
                      <tr
                        key={transactionByQRCode._id}
                        className='bg-blue-gray-50'
                      >
                        <td className='text-center'>
                          {transactionByQRCode.rfid}
                        </td>
                        <td className='text-center'>
                          {transactionByQRCode.product_name}
                        </td>
                        <td className='text-center'>
                          {transactionByQRCode.unit_price}
                        </td>
                        <td className='text-center'>
                          {transactionByQRCode.amount}
                        </td>
                        <Button
                          onClick={() =>
                            handleReduceAmount(
                              transactionByQRCode._id,
                              transactionByQRCode.amount,
                            )
                          }
                          className='text-black bg-transparent'
                        >
                          -
                        </Button>
                        <Button
                          onClick={() =>
                            handleAddAmount(
                              transactionByQRCode._id,
                              transactionByQRCode.amount,
                            )
                          }
                          className='text-black bg-transparent'
                        >
                          +
                        </Button>

                        <td>
                          <Button
                            onClick={() =>
                              handleDeleteTransaction(transactionByQRCode._id)
                            }
                            className='text-red-400 bg-transparent'
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className='mt-4'
                  onClick={handleSaveTransaction}
                  disabled={loadingAddToCart}
                >
                  Save Transaction
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}