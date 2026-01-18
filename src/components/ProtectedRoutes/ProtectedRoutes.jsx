import React from 'react';
import { useLogin } from '../../Context/LoginContext/LoginContext';
import LoginOverlay from '../LoginOverlay/LoginOverlay';

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useLogin();

  const handleLoginSuccess = () => {
    // Login context will update isLoggedIn to true
    // The overlay will close automatically as ProtectedRoute re-renders
  };

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // If not logged in, show ONLY the login overlay (not children)
  if (!isLoggedIn) {
    return (
      <div className="protected-route-overlay">
        <LoginOverlay 
          onClose={() => {}} // Keep overlay open until login
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  // If logged in, show the children normally
  return children;
}

export default ProtectedRoute;