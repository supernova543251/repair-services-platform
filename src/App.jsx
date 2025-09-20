// App.js (updated)
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BrandPage from './pages/BrandPage/BrandPage';
import VariantPage from './pages/ServicesPagesFolder/VariantPage/VariantPage';
import ModelPage from './pages/ServicesPagesFolder/ModelPage/ModelPage';
import ServicesPage from './pages/ServicesPagesFolder/ServicesPage/ServicesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { LoginProvider } from './Context/LoginContext/LoginContext';
import YourOrders from './pages/YourOrders/YourOrders';
import AccountAndPrivacy from './pages/AccountAndPrivacy/AccountAndPrivacy';
import Addresses from './pages/Addresses/Addresses';
import HelpAndSupport from './pages/HelpAndSupport/HelpAndSupport';
import AboutUs from './pages/AboutUs/AboutUs';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/brand" element={<BrandPage />} />
            <Route path="/brand/:brand" element={<ModelPage />} />
            <Route path="/brand/:brand/:model" element={<VariantPage />} />
            <Route path="/brand/:brand/:model/services" element={<ServicesPage />} />
            <Route path="/your-orders" element={<YourOrders />} />
            <Route path="/account-privacy" element={<AccountAndPrivacy />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/help-support" element={<HelpAndSupport />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </LoginProvider>
  );
}

export default App;