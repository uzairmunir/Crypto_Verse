import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/pages/Home';
import './App.css';
import CryptoCurrencies from './components/crypto-currencies/CryptoCurrencies';
import CryptoNews from './components/crypto-news/CryptoNews';
import Exchanges from './components/exchanges/Exchanges';
import CryptoDetails from './components/crypto-details/CryptoDetails';

const RouteConfig = () => {
  return (
    <div className='main-page'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/currencies' element={<CryptoCurrencies />} />
          <Route path='/news' element={<CryptoNews />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/:id' element={<CryptoDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteConfig;
