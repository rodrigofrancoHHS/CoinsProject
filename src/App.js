import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu';
import ContactPage from './ContactPage';
import SobreNos from './SobreNos';
import ProductDetails from './ProductDetails';
import MenuSweats from './MenuSweats';
import MenuTshirts from './MenuTshirts';
import MenuCaps from './MenuCaps';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
import Checkout from './checkout';
import AdminPage from './AdminPage';
import AdminProdutos from './AdminProdutos';
import AdminUtilizadores from './AdminUtilizadores';
import AdminVendas from './AdminVendas';
import UserOrdersPage from './UserOrdersPage';
import PersonalInfoPage from './PersonalInfoPage';
import Personal from './Personal';

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/SobreNos" element={<SobreNos />} />
          <Route
            path="/product-details/:id"
            element={<ProductDetails />}
          />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/MenuSweats" element={<MenuSweats />} />
          <Route path="/MenuTshirts" element={<MenuTshirts />} />
          <Route path="/MenuCaps" element={<MenuCaps />} />
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart  />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/admin/products' element={<AdminProdutos />} />
          <Route path='/admin/users' element={<AdminUtilizadores />} />
          <Route path='/admin/sales' element={<AdminVendas />} />
          <Route path='/orders-page' element={<UserOrdersPage />} />
          <Route path='/personal-info' element={<PersonalInfoPage />} />
          <Route path='/personal' element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
