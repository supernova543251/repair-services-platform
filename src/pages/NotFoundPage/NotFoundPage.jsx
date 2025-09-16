import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default NotFoundPage;