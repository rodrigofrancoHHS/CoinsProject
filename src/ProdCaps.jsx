import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProdCaps() {

  const [products, setProducts] = useState([]);
  
  const apiUrl = 'https://localhost:7241';
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/TodosProdutos/ListadeCaps`);
        const produtosCarregados = await response.json();
  
        setProducts(produtosCarregados);
      } catch (error) {
        console.error('Erro ao obter os produtos da API:', error);
      }
    };
  
    fetchProducts();
  }, []);
  // Array de produtos


  return (
<div>
  <div class="container mx-auto">
  <h2 class="text-5xl font-extrabold text-center mb-6 py-8 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg">CHAPÉUS</h2>
    <div class="grid grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.name} class="border border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <div class="relative">
            {product.img ? (
              <div class="group">
                <img src={product.img} alt={product.name} class="w-full h-64 object-cover" />
                <div class="absolute bottom-0 left-0 right-0 px-6 py-4 opacity-0 transition-opacity duration-300 bg-black bg-opacity-75 text-white group-hover:opacity-100">
                  <h3 class="text-2xl font-bold mb-2">{product.name}</h3>
                  <p class="text-gray-300 mb-2">Preço: {product.price.toFixed(2)} €</p>
                </div>
              </div>
            ) : (
              <div class="w-full h-64 bg-gray-200"></div>
            )}
          </div>
          <div class="p-6">
          <Link to={`/product-details/${product.id}`}>
            <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-full">
              Selecionar
            </button>
          </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
  
</div>


  );
}

export default ProdCaps;