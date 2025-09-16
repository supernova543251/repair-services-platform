import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length > 1) { // Only auto-advance if multiple slides exist
      const interval = setInterval(() => {
        goToNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (slides.length === 0) {
    return <div className="slider-placeholder">No slides to display</div>;
  }

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div 
          className="slider" 
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        />
        
        {/* Only show arrows if multiple slides exist */}
        {slides.length > 1 && (
          <>
            <div className="left-arrow" onClick={goToPrevious}>
              ❮
            </div>
            <div className="right-arrow" onClick={goToNext}>
              ❯
            </div>
          </>
        )}
      </div>

      {/* Only show dots if multiple slides exist */}
      {slides.length > 1 && (
        <div className="dots-container">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;