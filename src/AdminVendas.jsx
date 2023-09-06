import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const AdminVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7241/api/Orders')
      .then((response) => response.json())
      .then((data) => setVendas(data))
      .catch((error) => console.error('Erro ao obter as vendas:', error));
  }, []);

  const handleDeleteVenda = async (id) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Orders/DeleteOrder/${id}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Venda eliminada com sucesso
        console.log('Venda eliminada com sucesso');
        // Atualizar a lista de vendas removendo a venda eliminada
        const updatedVendas = vendas.filter((venda) => venda.id !== id);
        setVendas(updatedVendas);
      } else {
        console.error('Erro ao eliminar a venda');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  const handleTipoChange = async (vendaId) => {
    try {
      const venda = vendas.find((venda) => venda.id === vendaId);
      const novoTipo = venda.type === 0 ? 1 : 0;

      const response = await fetch(`https://localhost:7241/api/Orders/ChangeOrderType/${vendaId}`, {
        method: 'POST',
      });

      if (response.ok) {
        // Tipo da venda alterado com sucesso
        console.log('Tipo da venda alterado com sucesso');
        // Atualizar o tipo da venda no estado local
        const updatedVendas = vendas.map((venda) => {
          if (venda.id === vendaId) {
            return { ...venda, type: novoTipo };
          }
          return venda;
        });
        setVendas(updatedVendas);
      } else {
        console.error('Erro ao alterar o tipo da venda');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-grow p-8">
          <h2 className="text-3xl font-bold mb-4">Administração de Compras</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">User_ID</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Telefone</th>
                  <th className="border px-4 py-2">Morada</th>
                  <th className="border px-4 py-2">Metodo de Pagamento</th>
                  <th className="border px-4 py-2">Preço Total</th>
                  <th className="border px-4 py-2">Data</th>
                  <th className="border px-4 py-2">Produtos</th>
                  <th className="border px-4 py-2">Ação</th>
                  <th className="border px-4 py-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => (
                  <tr key={venda.id}>
                    <td className="border px-4 py-2">{venda.id}</td>
                    <td className="border px-4 py-2">{venda.user_id}</td>
                    <td className="border px-4 py-2">{venda.email}</td>
                    <td className="border px-4 py-2">{venda.phone}</td>
                    <td className="border px-4 py-2">{venda.address}</td>
                    <td className="border px-4 py-2">{venda.payment_method}</td>
                    <td className="border px-4 py-2">{venda.total_price.toFixed(2)}</td>
                    <td className="border px-4 py-2">{venda.created_at}</td>
                    <td className="border px-4 py-2">{venda.products}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleDeleteVenda(venda.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className={classnames('font-semibold py-2 px-4 rounded ml-2', {
                          'bg-green-500 hover:bg-green-700 text-white': venda.type === 0,
                          'bg-orange-500 hover:bg-orange-700 text-white': venda.type === 1,
                        })}
                        onClick={() => handleTipoChange(venda.id)}
                      >
                        {venda.type === 0 ? 'Concluída' : 'Pendente'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVendas;