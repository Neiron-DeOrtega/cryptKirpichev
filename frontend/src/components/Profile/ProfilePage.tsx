import React, { useState, useEffect } from 'react';
import axios from '../../api/axios'; 
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => { // Компонент профиля пользователя
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('/secured', {
          headers: { authorization: accessToken },
        });
        setNickname(response.data.nickname);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    validatePassword(newPassword);  
  }, [newPassword]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    const hasMinLength = password.length >= 12;
    const hasMaxLength = password.length <= 24;
    const hasDigits = (password.match(/\d/g) || []).length >= 1;
    const hasLetters = (password.match(/[a-zA-Z]/g) || []).length >= 2;
    const hasSpecialChars = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= 3;

    if (!hasMinLength) errors.push('Мин. длина пароля: 12 символов');
    if (!hasMaxLength) errors.push('Макс. длина пароля: 24 символа');
    if (!hasDigits) errors.push('Цифр не менее: 1');
    if (!hasLetters) errors.push('Латинских букв не менее: 2');
    if (!hasSpecialChars) errors.push('Спец. символов не менее: 3');

    setPasswordErrors(errors);
    setIsPasswordValid(errors.length === 0);
  };

  const handleChangePassword = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(
        '/changepass',
        { password, newPassword },
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setPassword('')
      setNewPassword('')
      alert('Password changed successfully');
    } catch (error) {
      alert('Password change failed');
    }
  };

  return (
    <div className="page">
      <Link to="/" className="home-link">Go to Home</Link>
      <h1>Профиль</h1>
      <p>Ваш Никнейм: <b>{nickname}</b></p>
      <div>
        <h1>Смена пароля</h1>
        <input
          type="password"
          className="input"
          placeholder="Текущий пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div className="password-requirements">
          <ul>
            {passwordErrors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>{error}</li>
            ))}
          </ul>
        </div>
        <button
          className="button"
          onClick={handleChangePassword}
          disabled={!isPasswordValid} 
        >
          Изменить пароль
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
