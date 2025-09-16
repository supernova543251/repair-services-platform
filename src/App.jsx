import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BrandPage from './pages/BrandPage/BrandPage';
import VariantPage from './pages/ServicesPagesFolder/VariantPage/VariantPage';
import ModelPage from './pages/ServicesPagesFolder/ModelPage/ModelPage';
import ServicesPage from './pages/ServicesPagesFolder/ServicesPage/ServicesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/brand" element={<BrandPage />} />
          <Route path="/brand/:brand" element={<ModelPage />} />
          <Route path="/brand/:brand/:model" element={<VariantPage />} />
          <Route path="/brand/:brand/:model/services" element={<ServicesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;