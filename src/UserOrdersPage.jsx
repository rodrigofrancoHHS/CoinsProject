import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const UserOrdersPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);

  // Verifica se o cookie existe
  useEffect(() => {
    const cookieUserId = getCookie('userId');

    if (cookieUserId) {
      setIsLoggedIn(true);
      setUserId(cookieUserId);
      fetchOrdersByUserId(cookieUserId);
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

  // Função para retornar o texto do tipo de pedido
  const getOrderTypeText = (type) => {
    return type === 0 ? 'Concluída' : 'Pendente';
  };

  // Função para cancelar um pedido
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Orders/DeleteOrder/${orderId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Pedido cancelado com sucesso
        console.log('Pedido cancelado com sucesso');

        // Atualizar a lista de pedidos removendo o pedido cancelado
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
      } else {
        console.error('Erro ao cancelar o pedido');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        {isLoggedIn ? (
          <div className="max-w-lg w-full mx-auto p-8">
            <h2 className="text-3xl font-bold mb-4">Compras</h2>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-300 p-4 mb-4">
                    <h3 className="text-xl font-bold mb-2">Detalhes das Compras</h3>
                    <p>Produtos: {order.products}</p>
                    <p>Preço Total: {order.total_price.toFixed(2)}</p>
                    <p>Método de Pagamento: {order.payment_method}</p>
                    <p>Telefone: {order.phone}</p>
                    <p>Endereço: {order.address}</p>
                    <p>Data: {order.created_at}</p>
                    <p>Estado: {getOrderTypeText(order.type)}</p>
                    {order.type !== 0 && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-4"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>Você não tem pedidos.</p>
            )}
          </div>
        ) : (
          <p>Faça login para ver seus pedidos.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserOrdersPage;
