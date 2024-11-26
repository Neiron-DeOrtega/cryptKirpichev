import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import ProfilePage from './components/Profile/ProfilePage';
import AdminPanel from './components/Admin/AdminPage';
import Main from './components/Main/Main';

const App: React.FC = () => { // Роутинг страниц
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
