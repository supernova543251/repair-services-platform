import React from 'react';
import './BrandGrid.css';
import brand from '../../data';
import { useNavigate } from 'react-router-dom';

const BrandGrid = () => {
  const navigate = useNavigate();

  const slugify = (str) => {
    return str.toLowerCase().replace(/\s+/g, '-');
  };

  const handleBrandClick = (brandName, e) => {
    const item = e.currentTarget;
    item.classList.add('clicked');

    setTimeout(() => {
      navigate(`/brand/${slugify(brandName)}`);
    }, 300);
  };

  return (
    <div className="brand-grid-container">
      <h2 className="title-of-brands">Brands We Service</h2>
      <div className="brand-grid">
        {brand.map((brand, index) => (
          <div
            key={index}
            className="brand-item"
            onClick={(e) => handleBrandClick(brand.name, e)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleBrandClick(brand.name, e)}
          >
            <img
              src={brand.Image}
              alt={brand.name}
              className="brand-logo"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Brand+Logo';
                e.target.style.objectFit = 'contain';
              }}
            />
            <p className="brand-name">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandGrid;