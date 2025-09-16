import React, { useState, useEffect } from 'react';
import './VariantGrid.css';
import { useNavigate } from 'react-router';

function VariantGrid({ model, brand }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slugify = (str) => str.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-');

  const handleVariantSelect = (variant) => {
    navigate(`/brand/${brand}/${slugify(model.name)}/services`, { // Updated navigation
      state: { variant }
    });
  };

  const handleBack = () => navigate(`/brand/${brand}`); // Updated navigation

  const getGridColumns = () => {
    if (windowWidth < 600) return 'repeat(3, 1fr)';
    if (windowWidth < 900) return 'repeat(4, 1fr)';
    return 'repeat(auto-fill, minmax(200px, 1fr))';
  };

  return (
    <div className="variant-grid-container">
      <div className="model-grid-header">
        <h2>Choose a Variant for: {model.name}</h2>
      </div>
      <div className="variants-grid" style={{ gridTemplateColumns: getGridColumns() }}>
        {model.variants.map((variant, index) => (
          <div
            key={index}
            className="variant-card"
            onClick={() => handleVariantSelect(variant)}
          >
            <div className="variant-image-container">
              <img
                src={variant.image}
                alt={variant.name}
                className="variant-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/250x250?text=Image+Not+Found';
                  e.target.style.objectFit = 'cover';
                }}
              />
            </div>
            <p className="variant-name">{variant.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VariantGrid;