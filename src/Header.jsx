import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingCart } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';

function Header() {
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
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Remover o cookie do userId
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('hidden');
  }

  return (
    <header className="bg-gradient-to-r from-yellow-600 to-gray-900 text-white py-6 pb-4">
  <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-4">
    <div className="flex items-center">
      <Link to="/">
        <img src="/stalogo.png" alt="Logotipo" className="h-16 pb-0" />
      </Link>
    </div>

    {/* Menu para computadores (oculto em dispositivos móveis) */}
    <nav className="hidden sm:flex mt-4 sm:mt-0 justify-center sm:flex-grow">
      <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-xl">
        <li>
          <Link to="/MenuSweats" className="hover:bg-black hover:text-white px-4 py-2 rounded-lg">
            Sweats
          </Link>
        </li>
        <li>
          <Link to="/MenuTshirts" className="hover:bg-black hover:text-white px-4 py-2 rounded-lg">
            T-Shirts
          </Link>
        </li>
        <li>
          <Link to="/MenuCaps" className="hover:bg-black hover:text-white px-4 py-2 rounded-lg">
            Chapéus
          </Link>
        </li>
        <li>
          <Link to="/SobreNos/" className="hover:bg-black hover:text-white px-4 py-2 rounded-lg">
            Sobre Nós
          </Link>
        </li>
        <li>
          <Link to="/ContactPage/" className="hover:bg-black hover:text-white px-4 py-2 rounded-lg">
            Contactos
          </Link>
        </li>
      </ul>
    </nav>

    {/* Menu suspenso para dispositivos móveis (oculto em telas maiores) */}
    <div className="sm:hidden">
      <button
        onClick={() => toggleDropdown()} // Esta função mostrará/ocultará o menu
        className="block text-xl text-white px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-gray-900"
      >
        Menu
      </button>
      <ul
        id="dropdown-menu"
        className="hidden bg-gray-900 mt-2 p-2 rounded-lg"
      >
        <li>
          <Link to="/MenuSweats" className="text-white hover:text-yellow-600 block py-2">
            Sweats
          </Link>
        </li>
        <li>
          <Link to="/MenuTshirts" className="text-white hover:text-yellow-600 block py-2">
            T-Shirts
          </Link>
        </li>
        <li>
          <Link to="/MenuCaps" className="text-white hover:text-yellow-600 block py-2">
            Chapéus
          </Link>
        </li>
        <li>
          <Link to="/SobreNos/" className="text-white hover:text-yellow-600 block py-2">
            Sobre Nós
          </Link>
        </li>
        <li>
          <Link to="/ContactPage/" className="text-white hover:text-yellow-600 block py-2">
            Contactos
          </Link>
        </li>
      </ul>
    </div>

    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <span>Bem-vindo,<Link to="/personal-info"> {username}! </Link></span>
          <button className="hover:bg-black hover:text-white rounded-full p-2" onClick={handleLogout}>
            <IoLogOutOutline className="h-6 w-6 text-gray-900 hover:text-white" />
          </button>
          <button className="hover:bg-black hover:text-white rounded-full p-2">
            <Link to="/cart">
              <FiShoppingCart className="h-6 w-6 text-gray-900 hover:text-white" />
            </Link>
          </button>
        </>
      ) : (
        <button className="bg-black hover:bg-white hover:text-white rounded-full p-2">
          <Link to="/login">
            <FiUser className="h-6 w-6 text-white hover:text-black" />
          </Link>
        </button>
      )}
    </div>
  </div>
</header>




  );
}

export default Header;
