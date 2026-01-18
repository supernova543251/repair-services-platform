import React from 'react';
import './ServicesPage.css';
import Services from '../../../components/Services/Services';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function ServicesPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { brand, model } = useParams();
    
    // Get all data from location state including device ID
    const variant = location.state?.variant;
    const modelName = location.state?.modelName || model;
    const isCustomDevice = location.state?.isCustomDevice || false;
    const brandName = location.state?.brand || brand;
    const deviceId = location.state?.deviceId; // Device ID from ModelGrid

    const handleBack = () => navigate(-1);

    return (
        <div className="services-page-container">
            <Services 
                variant={variant}
                modelName={modelName}
                brand={brandName}
                isCustomDevice={isCustomDevice}
                deviceId={deviceId} // Pass device ID to Services component
            />
        </div>
    );
}

export default ServicesPage;