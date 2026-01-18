import React, { useState, useEffect } from 'react';
import './ModelPage.css';
import ModelGrid from '../../../components/ModelGrid/ModelGrid';
import { useParams } from 'react-router';
import { default as brands } from '../../../data';
import NotFoundPage from '../../NotFoundPage/NotFoundPage';

function ModelPage() {
    const { brand } = useParams();
    const [isValidBrand, setIsValidBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        // Check if brand exists in our brands data (for logo)
        if (brand) {
            const brandExists = brands.find(
                b => b.name.toLowerCase() === brand.toLowerCase()
            );
            setIsValidBrand(true); // Always valid now since we get data from backend
        } else {
            setIsValidBrand(false);
        }
        setIsLoading(false);
    }, [brand]);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    // We don't show NotFound anymore since we get data from backend
    // But we can still check if we have the brand logo
    return (
        <div className="model-page-container">
            <ModelGrid />
        </div>
    );
}

export default ModelPage;