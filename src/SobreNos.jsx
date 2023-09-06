import React from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link se estiver usando o React Router
import Header from './Header';
import Footer from './Footer';

const SobreNos = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 pt-8 pb-8">
        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <div>
                <h1 className="text-5xl font-bold mb-6">Conheça a STA - A sua loja de roupas em Santa Cruz</h1>
                <p className="text-lg leading-relaxed mb-6">
                A STA é uma loja especializada na venda de roupas da moda, oferecendo uma ampla variedade de peças exclusivas, como t-shirts, sweats e caps. Estamos localizados em Santa Cruz, uma localidade conhecida pela sua atmosfera descontraída e estilo único.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                Além de oferecer uma ampla seleção de roupas, também nos orgulhamos do nosso excelente atendimento ao cliente. A nossa equipa está sempre pronta para ajudar, fornecendo orientações e sugestões personalizadas para ajudá-lo a encontrar as peças perfeitas que se adequem ao seu estilo e personalidade.
                </p>
                
                <Link to="/ContactPage/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg inline-block">
                  Entre em contato
                </Link>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-full h-auto rounded-lg shadow-lg" style={{ maxWidth: '800px' }}>
                <img
                  src="/Sobre.png"
                  alt="Equipe"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SobreNos;
