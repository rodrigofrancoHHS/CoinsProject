import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const apiUrl = 'https://localhost:7241';

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/TodosProdutos/Apenas${id}`);
        const productDetails = await response.json();

        setProduct(productDetails);
      } catch (error) {
        console.error('Erro ao obter os detalhes do produto da API:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const userId = getUserIdFromCookie(); // Obtém o ID do usuário do cookie
    if (!userId) {
      console.error('ID do usuário não encontrado');
      setError('Erro ao adicionar o produto ao carrinho. Realize o Login primeiro');
      setSuccessMessage('');
      return;
    }

    const cartItemsKey = `cartItems_${userId}`; // Chave do LocalStorage específica do usuário
    const cartItems = JSON.parse(localStorage.getItem(cartItemsKey)) || [];

    // Verifica se o produto já está no carrinho
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Atualiza a quantidade do produto no carrinho
      const updatedItems = cartItems.map((item) => {
        if (item.id === product.id) {
          // Verifica se a quantidade atualizada não excede a quantidade disponível do produto
          const newQuantity = item.quantity + quantity;
          if (newQuantity > product.quantity) {
            // Excede a quantidade disponível, mantém a quantidade atual
            return item;
          } else {
            // Atualiza a quantidade
            return { ...item, quantity: newQuantity };
          }
        } else {
          return item;
        }
      });

      setSuccessMessage('');
      localStorage.setItem(cartItemsKey, JSON.stringify(updatedItems));
      setSuccessMessage('O produto foi adicionado ao carrinho');
      setError('');
    } else {
      // Adiciona o produto ao carrinho
      const newItem = {
        id: product.id,
        img: product.img,
        name: product.name,
        price: product.price,
        quantitymax: product.quantity,
        quantity: quantity,
      };
      setSuccessMessage('');
      localStorage.setItem(cartItemsKey, JSON.stringify([...cartItems, newItem]));
      setSuccessMessage('O produto foi adicionado ao carrinho');
      setError('');
    }

    // Limpa a quantidade selecionada
    setQuantity(1);
  };

  const getUserIdFromCookie = () => {
    return getCookie('userId');
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

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img src={product.img} alt={product.name} className="w-full h-auto" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-lg mb-4">Preço: {product.price.toFixed(2)}</p>
            <div className="mb-4">
              <label htmlFor="quantity" className="block font-medium text-gray-700">
                Quantidade:
              </label>
              <div className="flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border border-gray-300 px-3 py-2 rounded-md mx-2"
                />
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.quantity}
                >
                  +
                </button>
              </div>
              {product.quantity === 0 && (
                <p className="text-red-500 mt-2 bg-red-100 px-3 py-2 rounded-md">
                  O stock não está disponível.
                </p>
              )}
            </div>
            {product.quantity > 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </button>
            )}
            {error && <div className="text-red-500 mb-4 mt-4">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4 mt-4">{successMessage}</div>}
            <br /><br /><br />
            <p className="text-gray-700 mb-4">{product.desc}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;