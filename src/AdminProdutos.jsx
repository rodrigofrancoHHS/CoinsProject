import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const AdminProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    name: '',
    desc: '',
    price: '',
    rrp: '',
    quantity: '',
    img: '',
    type: '',
  });  
  const [produtoAtualizar, setProdutoAtualizar] = useState("");

  useEffect(() => {
    fetch('https://localhost:7241/api/TodosProdutos/ListadeProdutos')
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error('Erro ao obter os produtos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7241/api/TodosProdutos/InserirAtualizarProdutos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([novoProduto]),
      });

      if (response.ok) {
        // Produto inserido ou atualizado com sucesso
        console.log('Produto inserido ou atualizado com sucesso');
        const produtoExistente = produtos.find((produto) => produto.id === novoProduto.id);
        if (produtoExistente) {
          // O produto já existe, atualizar na lista
          const updatedProdutos = produtos.map((produto) =>
            produto.id === novoProduto.id ? novoProduto : produto
          );
          setProdutos(updatedProdutos);
        } else {
          // O produto é novo, adicioná-lo à lista
          setProdutos([...produtos, novoProduto]);
        }
        // Limpar o formulário
        setNovoProduto({
          name: '',
          desc: '',
          price: '',
          rrp: '',
          quantity: '',
          img: '',
          type: '',
        });
        setProdutoAtualizar(null);
      } else {
        console.error('Erro ao inserir ou atualizar o produto');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  const handleUpdateProduct = async (produto) => {
    // Define o produto a ser atualizado
    setProdutoAtualizar(produto);
    // Preenche o formulário com os dados do produto selecionado
    setNovoProduto(produto);
  };

  const handleCancelUpdate = () => {
    // Cancela a atualização do produto
    setProdutoAtualizar(null);
    // Limpa o formulário
    setNovoProduto({
      name: '',
      desc: '',
      price: '',
      rrp: '',
      quantity: '',
      img: '',
      type: '',
    });
  };





  
const handleDeleteProduto = async (id) => {
  try {
    const response = await fetch(
      'https://localhost:7241/api/TodosProdutos/EliminarProdutos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([id]),
      }
    );

    if (response.ok) {
      // Produto eliminado com sucesso
      console.log('Produto eliminado com sucesso');
      // Atualizar a lista de produtos removendo o produto eliminado
      const updatedProdutos = produtos.filter((produto) => produto.id !== id);
      setProdutos(updatedProdutos);
    } else {
      console.error('Erro ao eliminar o produto');
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
          <h2 className="text-3xl font-bold mb-4">Administração de Produtos</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Nome</th>
                  <th className="border px-4 py-2">Descrição</th>
                  <th className="border px-4 py-2">Preço</th>
                  <th className="border px-4 py-2">Preço Anterior ao Desconto</th>
                  <th className="border px-4 py-2">Quantidade</th>
                  <th className="border px-4 py-2">Imagem</th>
                  <th className="border px-4 py-2">Tipo</th>
                  <th className="border px-4 py-2">Ação</th>
                  <th className="border px-4 py-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td className="border px-4 py-2">{produto.id}</td>
                    <td className="border px-4 py-2">{produto.name}</td>
                    <td className="border px-4 py-2">{produto.desc}</td>
                    <td className="border px-4 py-2">{produto.price}</td>
                    <td className="border px-4 py-2">{produto.rrp}</td>
                    <td className="border px-4 py-2">{produto.quantity}</td>
                    <td className="border px-4 py-2">{produto.img}</td>
                    <td className="border px-4 py-2">{produto.type}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2"
                        onClick={() => handleUpdateProduct(produto)}
                      >
                        Atualizar
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleDeleteProduto(produto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleFormSubmit} className="mt-8">
            <h3 className="text-xl font-bold mb-4">Inserir Novo Produto</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Nome:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={novoProduto.name}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="desc" className="block text-gray-700 font-medium">
                  Descrição:
                </label>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  value={novoProduto.desc}
                  onChange={handleInputChange}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-medium">
                  Preço:
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={novoProduto.price}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rrp" className="block text-gray-700 font-medium">
                Preço Anterior ao Desconto:
                </label>
                <input
                  type="text"
                  id="rrp"
                  name="rrp"
                  value={novoProduto.rrp}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-gray-700 font-medium">
                  Quantidade:
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={novoProduto.quantity}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="img" className="block text-gray-700 font-medium">
                  Imagem:
                </label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={novoProduto.img}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-medium">
                  Tipo:
                </label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={novoProduto.type}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
            </div>
            {produtoAtualizar ? (
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2"
                >
                  Atualizar Produto
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
                  onClick={handleCancelUpdate}
                >
                  Cancelar Atualização
                </button>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Inserir Produto
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProdutos;
