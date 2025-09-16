import React from 'react';
import './ServicesPage.css';
import Services from '../../../components/Services/Services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ServicesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { brand, model } = useParams();
  const variant = location.state?.variant;

  const handleBack = () => navigate(`/brand/${brand}/${model}`); // Updated navigation

  return (
    <div className="services-page-container">
      <Services 
        onBack={handleBack}
        variant={variant}
      />
    </div>
  );
}

export default ServicesPage;