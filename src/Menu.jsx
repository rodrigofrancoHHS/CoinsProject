import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProdDestaque from './ProdDestaque';
import BannerDuvidas from './BannerDuvidas';
import Recomendacoes from './Recomendações';


function Menu() {

  


  return (

    <div>
      <Header/>
      <div>
      <img src="/PainelInicial.png" alt="Imagem Grande" className="w-full" />
      </div>
      <br/><br/><br/>
      <ProdDestaque/>
      <br/><br/><br/><br/><br/>
      <Recomendacoes/>
      <br/><br/><br/>
      <BannerDuvidas/>
      <Footer/>
    </div>
  );
}

export default Menu;