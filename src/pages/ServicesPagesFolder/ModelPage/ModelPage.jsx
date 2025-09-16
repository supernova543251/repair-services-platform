import React, { useState, useEffect } from 'react';
import './ModelPage.css';
import ModelGrid from '../../../components/ModelGrid/ModelGrid';
import { useParams } from 'react-router';
import { models_variant } from '../../../data';
import NotFoundPage from '../../NotFoundPage/NotFoundPage';

function ModelPage() {
  const { brand } = useParams();
  const [isValidBrand, setIsValidBrand] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Check if brand exists in your data
    const valid = brand && models_variant[brand];
    setIsValidBrand(valid);
    setIsLoading(false);
  }, [brand]);

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isValidBrand) {
    return <NotFoundPage />;
  }

  return (
    <div className="model-page-container">
      <ModelGrid />
    </div>
  );
}

export default ModelPage;