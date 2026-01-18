import React, { useEffect } from 'react';
import './CustomToast.css';

const CustomerToast = ({ message, type = 'success', duration = 3000, onClose, className = '' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`customer-toast ${type} ${className}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {type === 'success' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 10L9.5 12L12.5 7.5M10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10C18.5 14.6944 14.6944 18.5 10 18.5Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'error' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6.5V10.5M10 13.5H10.01M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'warning' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6.5V10.5M10 13.5H10.01M8.5 3.5L2.5 15.5C2.22344 16.0281 2.07031 16.6116 2.05215 17.2075C2.03399 17.8034 2.15137 18.3953 2.39448 18.9381C2.63759 19.4809 2.99956 19.9602 3.45278 20.3388C3.906 20.7174 4.43836 20.985 5.007 21.1215C5.57564 21.258 6.16561 21.2599 6.735 21.1271C7.30439 20.9943 7.838 20.7303 8.293 20.355L17.5 12.5C18.4205 11.5795 19 10.3365 19 9.035C19 7.73353 18.4205 6.49054 17.5 5.57L14.43 2.5C13.5095 1.57955 12.2665 1 10.965 1C9.66353 1 8.42054 1.57955 7.5 2.5L8.5 3.5Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {type === 'info' && (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 6.5V10.5M10 13.5H10.01M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <div className="toast-message">{message}</div>
        <button className="toast-close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      <div className="toast-progress">
        <div className="toast-progress-bar"></div>
      </div>
    </div>
  );
};

export default CustomerToast;