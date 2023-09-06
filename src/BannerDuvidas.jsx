import React from 'react';
import { Link } from 'react-router-dom';

function BannerDuvidas () {

  return (
    <div class="relative">
    <div class="h-96 bg-banner-image bg-cover bg-center">
      <div class="h-full bg-black bg-opacity-50 flex items-center justify-center ">
        <div class="text-center">
          <h2 class="text-5xl font-bold text-white mb-4">Tens alguma questão?</h2>
          <p class="text-lg text-white mb-6">Torna tudo mais fácil ao enviar uma mensagem</p>
          <Link to="/ContactPage/">
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl">Enviar</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default BannerDuvidas;
