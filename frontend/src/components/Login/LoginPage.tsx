import React, { useState } from 'react';
import axios from '../../api/axios'; 
import "../../App.css"
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => { // Компонент страницы авторизации
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { nickname, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.daysUntilExpired < 7) {
        setMessage(`Осталось ${response.data.daysUntilExpired} суток до блокировки аккаунта. Смените пароль.`)
        setTimeout(() => {
          navigate('/profile')
        }, 5000)
      } else {
        console.log(response.data.daysUntilExpired)
        navigate('/profile')
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className='page'>
      {message && <p className='message error'>{message}</p>}
      <Link to="/" className="home-link">Go to Home</Link>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Nickname"
        className='input'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className='input'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='button' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
