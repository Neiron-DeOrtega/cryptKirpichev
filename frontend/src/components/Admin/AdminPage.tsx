import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import "../../App.css"

const AdminPanel: React.FC = () => { // Компонент админ панели
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          setMessage('Access token is missing. Please log in.');
          navigate('/login');
          return;
        }

        await axios.get('/admin', {
          headers: {
            Authorization: accessToken,
          },
        });
        setIsAuthorized(true);
      } catch (error: any) {
        setMessage('Access denied. Admin rights are required.');
        navigate('/login');
      }
    };

    verifyAdmin();
  }, [navigate]);

  const handleResetPassword = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setMessage('Access token is missing. Please log in.');
        return;
      }

      const response = await axios.post(
        '/admin/resetpass',
        { user: nickname },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setMessage(`New password for "${nickname}": ${response.data.password}`);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to reset password');
    }
  };

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <Link to="/" className="home-link">Go to Home</Link>
      <h1>Admin Panel</h1>
      <div className="form-container">
        <h2>Reset User Password</h2>
        <input
          type="text"
          placeholder="Enter user nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="input"
        />
        <button onClick={handleResetPassword} className="button">
          Reset Password
        </button>
      </div>
      {message && <div className="message success">{message}</div>}
    </div>
  );
};

export default AdminPanel;
