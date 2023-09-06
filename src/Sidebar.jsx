import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-gray-200">
        <div className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block py-2 px-4 rounded-md hover:bg-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="block py-2 px-4 rounded-md hover:bg-gray-300">
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/admin/users" className="block py-2 px-4 rounded-md hover:bg-gray-300">
                Utilizadores
              </Link>
            </li>
            <li>
              <Link to="/admin/sales" className="block py-2 px-4 rounded-md hover:bg-gray-300">
                Vendas
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-0.5 bg-black"></div>
    </div>
  );
};

export default Sidebar;
