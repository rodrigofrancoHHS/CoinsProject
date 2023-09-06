import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';

function AdminHeader() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verifica se o cookie existe
  useEffect(() => {
    const cookieUsername = getCookie('username');
    if (cookieUsername) {
      setIsLoggedIn(true);
      setUsername(cookieUsername);
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

  // Função para fazer logout e eliminar o cookie
  const handleLogout = () => {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  return (
    <header className="bg-gray-200 text-gray-900 py-6 pb-4 border-b-2 border-black">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <img src="/stalogo.png" alt="Logotipo" className="h-16 pb-0" />
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <span className="mr-2">Bem-vindo, {username}!</span>
              <button className="hover:bg-black hover:text-black rounded-full p-2" onClick={handleLogout}>
                <IoLogOutOutline className="h-6 w-6 text-gray-900 hover:text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
