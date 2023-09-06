import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Personal = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(""); // Estado para armazenar as informações do usuário

  // Verifica se o cookie existe
  useEffect(() => {
    const cookieUserId = getCookie('userId');

    if (cookieUserId) {
      setIsLoggedIn(true);
      setUserId(cookieUserId);
      fetchOrdersByUserId(cookieUserId);
      fetchUserInfo(cookieUserId); // Obtém as informações do usuário pelo ID
    } else {
      navigate('/login'); // Redirecionar para a página de login se o cookie não existir
    }
  }, []);

  // Função para obter um cookie pelo nome
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

  // Função para obter os pedidos do usuário pelo ID
  const fetchOrdersByUserId = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Orders/GetOrdersByUserId/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Erro ao obter os pedidos');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  // Função para obter as informações do usuário pelo ID
  const fetchUserInfo = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Login/GetUser/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        console.error('Erro ao obter as informações do usuário');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div>
      <Header />
      {/* Painel informativo */}
      <div className="bg-gray-100 h-auto flex flex-col items-center justify-center">
        <div className="max-w-lg w-full mx-auto p-8">
          <h2 className="text-3xl font-bold mb-4">Informações Pessoais</h2>
          <p>Nome de utilizador: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Personal;
