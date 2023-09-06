import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const AdminPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const userId = getCookie('userId');
    if (userId) {
      fetch(`https://localhost:7241/api/Login/${userId}/Type`)
        .then(response => response.json())
        .then(data => {
          setUserType(data);
        })
        .catch(error => {
          console.error('Erro ao obter o tipo de utilizador:', error);
        });
    } else {
      // Redirecionar para a página de login se o cookie não existir
      navigate('/login');
    }
  }, []);

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  };

  if (userType === 0) {
    return (
        <div className="flex flex-col h-screen">
        <AdminHeader />
        <div className="flex flex-grow">
          <Sidebar />
          <div className="flex-grow p-8">
            <h2 className="text-3xl font-bold mb-4">Painel de Administração</h2>
            <p>Bem-vindo ao painel de administração. Aqui poderás controlar as configurações e recursos do sistema.</p>
          </div>
        </div>
      </div>
    );
  } else if (userType === 1) {
    // Redirecionar para a página inicial
    navigate('/');
    return null;
  } else {
    return <div>Carregando...</div>;
  }
};

export default AdminPage;
