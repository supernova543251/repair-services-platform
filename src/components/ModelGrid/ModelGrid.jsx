import React, { useState, useEffect, useRef } from 'react';
import { models_variant } from '../../data';
import './ModelGrid.css';
import { useNavigate, useParams } from 'react-router';

function ModelGrid() {
  const { brand } = useParams();
  const [allModels, setAllModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const searchInputRef = useRef(null);
  const searchButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slugify = (str) => {
    return str.toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const getDisplayVariant = (variants) => {
    const whiteVariant = variants.find(v => v.name.toLowerCase().includes('white'));
    return whiteVariant || variants[0];
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/250x250?text=Image+Not+Found';
    e.target.style.objectFit = 'cover';
    e.target.onerror = null;
  };

  useEffect(() => {
    if (brand && models_variant[brand]) {
      const processedModels = models_variant[brand].map(model => ({
        ...model,
        displayVariant: getDisplayVariant(model.variants)
      }));
      setAllModels(processedModels);
      setFilteredModels(processedModels);
    }
  }, [brand]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target) &&
          searchButtonRef.current && !searchButtonRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updateSearchResults = (value) => {
    if (value.length > 0) {
      const matched = allModels.filter(model =>
        model.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matched);
      setShowSuggestions(true);
      setFilteredModels(matched);
    } else {
      setShowSuggestions(false);
      setFilteredModels(allModels);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchResults(value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.length > 0) {
      const matched = allModels.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matched.length === 1) {
        setFilteredModels([matched[0]]);
      }
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const selectSuggestion = (model) => {
    setSearchTerm(model.name);
    setFilteredModels([model]);
    setShowSuggestions(false);
    searchInputRef.current.focus();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredModels(allModels);
    setShowSuggestions(false);
    searchInputRef.current.focus();
  };

  const handleModelSelect = (model) => {
    if (model.variants && model.variants.length > 0) {
      navigate(`/brand/${brand}/${slugify(model.name)}`); // Updated navigation
    }
  };

  const getGridColumns = () => {
    if (windowWidth < 600) return 'repeat(3, 1fr)';
    if (windowWidth < 900) return 'repeat(4, 1fr)';
    return 'repeat(auto-fill, minmax(200px, 1fr))';
  };

  return (
    <div className="model-grid-container">
      <div className="model-grid-header">
        <h1>{brand ? `${brand.charAt(0).toUpperCase() + brand.slice(1)} Models` : 'Select a Brand'}</h1>

        <div className="model-search-container">
          <div className="search-input-wrapper" ref={searchInputRef}>
            <input
              type="text"
              placeholder="Search your phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="model-search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={clearSearch}>
                ×
              </button>
            )}
            <button
              className="search-icon-button"
              onClick={handleSearchSubmit}
              ref={searchButtonRef}
            >
              <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
              </svg>
            </button>
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((model, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => selectSuggestion(model)}
                >
                  <img
                    src={model.displayVariant.image}
                    alt=""
                    className="suggestion-image"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <span>{model.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="models-grid"
        style={{ gridTemplateColumns: getGridColumns() }}
      >
        {filteredModels.map((model, index) => (
          <div
            key={index}
            className="model-card"
            onClick={() => handleModelSelect(model)}
          >
            <div className="model-image-container">
              <img
                src={model.displayVariant.image}
                alt={model.name}
                className="model-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            <p className="model-name" title={model.name}>{model.name}</p>
          </div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <p className="no-models">
          {searchTerm ? 'No matching models found' : 'No models available'}
        </p>
      )}
    </div>
  );
}

export default ModelGrid;