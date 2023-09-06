import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const getUserIdFromCookie = () => {
    return getCookie('userId');
  };

  useEffect(() => {
    const cookieUsername = getCookie('username');
    const userId = getUserIdFromCookie();

    if (!cookieUsername) {
      window.location.href = '/login'; // Redireciona para a página de login
    } else {
      const cartItemsKey = `cartItems_${userId}`;
      const storedCartItems = localStorage.getItem(cartItemsKey);
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, []);

  const removeFromCart = (productId) => {
    const userId = getUserIdFromCookie();
    const cartItemsKey = `cartItems_${userId}`;

    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem(cartItemsKey, JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (productId, newQuantity) => {
    const userId = getUserIdFromCookie();
    const cartItemsKey = `cartItems_${userId}`;

    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        // Verifica se a nova quantidade não excede a quantidade máxima disponível
        const quantitymax = item.quantitymax;
        if (newQuantity > quantitymax) {
          return { ...item, quantity: quantitymax };
        } else if (newQuantity < 1) {
          return { ...item, quantity: 1 };
        } else {
          return { ...item, quantity: newQuantity };
        }
      } else {
        return item;
      }
    });

    setCartItems(updatedCartItems);
    localStorage.setItem(cartItemsKey, JSON.stringify(updatedCartItems));
  };

  const clearCart = () => {
    const userId = getUserIdFromCookie();
    const cartItemsKey = `cartItems_${userId}`;

    setCartItems([]);
    localStorage.removeItem(cartItemsKey);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

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






  const hasScrollbar = cartItems.length > 3; // Verifica se precisa de barra de rolagem

  return (
    <div>
    <Header />
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div className={hasScrollbar ? 'overflow-y-auto h-96' : ''}>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center mb-6 border border-gray-300 p-6 rounded">
                <img src={item.img} alt={item.name} className="w-32 h-32 object-cover mr-6" />
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">Preço: {item.price.toFixed(2)} €</p>
                  <div className="flex items-center mt-4">
                    <button
                      className="text-gray-500 hover:text-gray-700 border border-gray-300 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={item.quantitymax}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="border border-gray-300 px-3 py-1 rounded mx-2 w-20 text-center"
                    />
                    <button
                      className="text-gray-500 hover:text-gray-700 border border-gray-300 px-2 py-1 rounded"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.quantitymax}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 mt-4"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="font-bold text-2xl mt-6">Total: {calculateTotalPrice()} €</p>
            <div className="flex mt-6">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
                onClick={clearCart}
              >
                Remover Todos
              </button>
              <Link to="/checkout">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Finalizar Compra
                </button>
              </Link>
            </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;