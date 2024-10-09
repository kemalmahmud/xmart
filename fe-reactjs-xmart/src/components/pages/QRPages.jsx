import { useState } from 'react';

import QRScanner from '../qrs/QrScanner';

export default function QRPages() {
    const handleScan = (data) => {
        if (data) {
            fetch(`http://localhost:8080/api/customer/${data}`)
                .then((response) => {
                    if (response.ok) {
                        alert('Success');
                    } else {
                        alert('Invalid data');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            alert('No Data Found');
        }
    };
    return (
        <div className='bg-[#3AAFA9] min-h-screen flex flex-wrap justify-center items-center'>
            <div className='overflow-x-auto table-wrapper'>
                <div className='w-80 h-80'>
                    <QRScanner onScan={handleScan} />
                </div>
            </div>
        </div>
    );
}