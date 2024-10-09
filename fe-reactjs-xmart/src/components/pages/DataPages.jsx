import { Button, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../fragments/Product';
import Customer from '../fragments/Customer';
import Transaction from '../fragments/Transaction';

export default function DataPages() {
    const navigate = useNavigate();
    const handleMainPages = () => {
        navigate('/');
    };
    const [activeTab, setActiveTab] = useState('transaction');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
            <div className='overflow-x-auto table-wrapper'>
                <Typography className='mb-5 text-3xl font-semibold text-center text-black'>
                    All Transaction
                </Typography>
                <div className='flex justify-center '>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('transaction')}
                    >
                        Transaction
                    </Button>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('customer')}
                    >
                        Customer
                    </Button>
                    <Button
                        className='m-10 text-gray-100 bg-black'
                        onClick={() => handleTabChange('product')}
                    >
                        Product
                    </Button>
                </div>
                <div className='flex justify-center'>
                    {activeTab === 'transaction' && <Transaction />}
                    {activeTab === 'customer' && <Customer />}
                    {activeTab === 'product' && <Product />}
                </div>
                <Button
                    onClick={handleMainPages}
                    className='mt-4 font-semibold text-gray-100 bg-black'
                >
                    Back
                </Button>
            </div>
        </div>
    );
}