import React, { useRef, useState, useEffect } from 'react';
import './ServicesCardView.css';
import { services } from '../../data';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function ServicesCardView() {
    const scrollContainerRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkIfDesktop = () => {
            const isDesktop = window.innerWidth > 768;
            setShowArrows(isDesktop);
            checkScrollPosition();
        };

        const checkScrollPosition = () => {
            if (!scrollContainerRef.current) return;

            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setIsAtStart(scrollLeft < 10);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
        };

        checkIfDesktop();

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
        }

        window.addEventListener('resize', checkIfDesktop);
        return () => {
            window.removeEventListener('resize', checkIfDesktop);
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleBrandClick = (e) => {
        const item = e.currentTarget;
        item.classList.add('clicked');

        setTimeout(() => {
            navigate(`/brand`);
        });
    };

    return (
        <div className="services-container">
            <div className="services-wrapper">
                {showArrows && !isAtStart && (
                    <button
                        className="scroll-arrow left-arrow"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <FiChevronLeft size={24} />
                    </button>
                )}

                <div
                    ref={scrollContainerRef}
                    className="services-scroll"
                >
                    {services.services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            onClick={(e) => handleBrandClick(e)}
                        >
                            <div className="image-container">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="service-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                                    }}
                                />
                            </div>
                            <h3 className="service-name">{service.name}</h3>
                        </div>
                    ))}
                </div>

                {showArrows && !isAtEnd && (
                    <button
                        className="scroll-arrow right-arrow"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <FiChevronRight size={24} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default ServicesCardView;