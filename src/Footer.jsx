import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          
          





          <div className="col-span-1 text-center">
            <h2 className="text-2xl font-bold mb-4">A NOSSA EMPRESA</h2>
            <ul className="space-y-2">
              <li><Link to="/SobreNos/" className="text-gray-400 hover:text-white">Sobre</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">Termos e Condições</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Informação legal</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Resolução Alternativa de Litígios de Consumo</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Livro de Reclamações Electrónico</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Copyright</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Devolução e Troca</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Envio e Pagamento</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Direito de Livre Resolução</Link></li>
              <li><Link to="/ContactPage/" className="text-gray-400 hover:text-white">Contacte-nos</Link></li>
            </ul>
          </div>





          <div className="col-span-1 text-center">
            <h2 className="text-2xl font-bold mb-4">A SUA CONTA</h2>
            <ul className="space-y-2">
              <li><Link to="/personal" className="text-gray-400 hover:text-white">Informação pessoal</Link></li>
              <li><Link to="/orders-page" className="text-gray-400 hover:text-white">Encomendas</Link></li>
            </ul>
          </div>





          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">INFORMAÇÃO DA LOJA</h2>
            <ul>
              <li>StaCruz</li>
              <li>Carlos Manuel Coelho Dias, Lda | NIF: PT50 504 552 392</li>
              <li>Rua José Verissimo - Loja A - Prédio AMJ - Santa Cruz</li>
              <li>2560-499 SILVEIRA</li>
              <li>Portugal</li>
              <li>Ligue-nos: +351 261931617 (Chamada para rede fixa nacional)</li>
              <li>Envie-nos um e-mail: manelsport@manelsport.com</li>
            </ul>
          </div>
          



        </div>
        </div>
    </footer>
  );
}

export default Footer;