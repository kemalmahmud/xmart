import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainPages from './components/Main.jsx';
import QrCode from './components/qrs/QrCode.jsx';
import DataPages from './components/pages/DataPages.jsx';
import DetailCustomerPages from './components/pages/DetailCustomerPages.jsx';
import CustomerTransactionHistoryPages from './components/pages/CustomerTransactionHistoryPages.jsx';
import QRPages from './components/pages/QRPages.jsx';
import TransactionHistoryPages from './components/pages/TransactionHistoryPages.jsx';
import ShopPages from './components/pages/ShopPages.jsx';

const client = new ApolloClient({
    uri: 'http://localhost:3333/graphql',
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path='/' element={<MainPages />} />
                    <Route
                        path='transaction-history'
                        element={<TransactionHistoryPages />}
                    />
                    <Route path='data' element={<DataPages />} />
                    <Route
                        path='customer-detail'
                        element={<DetailCustomerPages />}
                    />
                    <Route path='qrcode' element={<QrCode />} />
                    <Route path='scanner' element={<QRPages />} />
                    <Route path='shop' element={<ShopPages />} />
                    <Route
                        path='customer-transaction-history'
                        element={<CustomerTransactionHistoryPages />}
                    />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}