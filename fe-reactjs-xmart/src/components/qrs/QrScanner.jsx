import { Scanner } from '@yudiel/react-qr-scanner';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(true); // make scanner active
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (scanning && data) {
      setResult(data);
      setScanning(false); // deactivate scanner after done
      axios
        .get(`http://localhost:8080/api/customer/${data}`)
        .then((response) => {
          console.log('customer data from qr:', response.data);
          navigate('/shop', { state: { customerData: response.data } }); // redirect to /shop and set state for customer data
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setScanning(true); // reactivate scanner
        });
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Scanner
//       onScan={(result) => console.log(result[0].rawValue)}
        onScan={(result) => handleScan(result[0].rawValue)}
        onError={(error) => handleError(error)}
      />
      <p>{result}</p>
    </div>
  );
};

export default QRScanner;