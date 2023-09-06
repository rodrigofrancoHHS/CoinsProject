import React from 'react';
import { Link } from 'react-router-dom';

function Recomendacoes () {

  return (
    <div class="container mx-auto">
  <h2 class="text-5xl font-extrabold text-center mb-6 py-8 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg">RECOMENDAÇÕES</h2>
  <div class="grid grid-cols-2 gap-8">
    <div class="h-96 bg-rec-tshirt bg-cover bg-center">
      <div class="p-4 bg-black bg-opacity-50">
        <h3 class="text-2xl font-bold text-white mb-2">Recomendação T-Shirts</h3>
        <p class="text-gray-300">Descubra as nossas T-Shirts de alta qualidade e estilo.</p>
        <Link to="/MenuTshirts">
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Ver T-Shirts
        </button>
        </Link>
      </div>
    </div>
    <div class="bh-96 bg-rec-sweats bg-cover bg-center">
      <div class="p-4 bg-black bg-opacity-50">
        <h3 class="text-2xl font-bold text-white mb-2">Recomendação Sweats</h3>
        <p class="text-gray-300">Descubra as nossas Sweats confortáveis e estilosas.</p>
        <Link to="/MenuSweats">
        <button class="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Ver Sweats
        </button>
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}

export default Recomendacoes;
