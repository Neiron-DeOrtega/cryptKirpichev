import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { validatePassword } from '../../api/passwordValidate';

const RegisterPage: React.FC = () => { // Компонент страницы регистрации
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const { isValid, errors } = validatePassword(password);
    setPasswordErrors(errors);
    setIsPasswordValid(isValid);
  }, [password]);

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { nickname, password, email });
      localStorage.setItem('accessToken', response.data.accessToken);
      navigate('/profile');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="page">
      <Link to="/" className="home-link">Go to Home</Link>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Nickname"
        className="input"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="password-requirements">
        <ul>
          {passwordErrors.map((error, index) => (
            <li key={index} style={{ color: 'red' }}>{error}</li>
          ))}
        </ul>
      </div>
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="button" onClick={handleRegister} disabled={!isPasswordValid}>
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
