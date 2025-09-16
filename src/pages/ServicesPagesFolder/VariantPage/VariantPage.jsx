import React, { useState, useEffect } from 'react';
import './VariantPage.css';
import VariantGrid from '../../../components/VariantGrid/VariantGrid';
import { useParams } from 'react-router';
import { models_variant } from '../../../data';
import NotFoundPage from '../../NotFoundPage/NotFoundPage';

function VariantPage() {
  const { brand, model } = useParams();
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slugify = (str) => {
      return str.toLowerCase()
        .replace(/[()]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };

    setIsLoading(true);
    let foundModel = null;
    
    if (brand && model && models_variant[brand]) {
      foundModel = models_variant[brand].find(m => 
        slugify(m.name) === model
      );
    }

    if (foundModel) {
      setSelectedModel(foundModel);
    } else {
      console.error(`Model not found: ${brand}/${model}`);
    }
    setIsLoading(false);
  }, [brand, model]);

  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!selectedModel) {
    return <NotFoundPage />;
  }

  return (
    <div className="variant-page-container">
      <VariantGrid model={selectedModel} brand={brand} />
    </div>
  );
}

export default VariantPage;