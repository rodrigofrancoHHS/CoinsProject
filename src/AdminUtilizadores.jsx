import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';

const AdminUtilizadores = () => {
  const [utilizadores, setUtilizadores] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // Estado para controlar o formulário

  useEffect(() => {
    fetch('https://localhost:7241/api/Login/GetUsers')
      .then((response) => response.json())
      .then((data) => setUtilizadores(data))
      .catch((error) => console.error('Erro ao obter os utilizadores:', error));
  }, []);










  const handleTipoChange = async (utilizadorId, novoTipo) => {
    try {
      await fetch(`https://localhost:7241/api/Login/ChangeUserType/${utilizadorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const novosUtilizadores = utilizadores.map((utilizador) => {
        if (utilizador.id === utilizadorId) {
          return { ...utilizador, type: novoTipo };
        }
        return utilizador;
      });
  
      setUtilizadores(novosUtilizadores);
    } catch (error) {
      console.error('Erro ao alterar o tipo do utilizador:', error);
    }
  };









  const handleDeleteUser = async (utilizadorId) => {
    try {
      await fetch(`https://localhost:7241/api/Login/DeleteUser/${utilizadorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const novosUtilizadores = utilizadores.filter((utilizador) => utilizador.id !== utilizadorId);

      setUtilizadores(novosUtilizadores);
    } catch (error) {
      console.error('Erro ao eliminar o utilizador:', error);
    }
  };








  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Função para atualizar os valores dos inputs do formulário
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };










  const handleAddUser = async (username, password, email) => {
    try {
      const response = await fetch(`https://localhost:7241/api/Login/register?username=${username}&password=${password}&email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json(); // Capturar os dados da resposta
  
        // Utilizador adicionado com sucesso, atualizar a lista de utilizadores
        setUtilizadores([...utilizadores, { id: data.id, username, email, type: 1 }]);
        setIsFormOpen(false); // Fechar o formulário
        setNewUser("");
      } else {
        console.error('Erro ao adicionar o utilizador.');
      }
    } catch (error) {
      console.error('Erro ao adicionar o utilizador:', error);
    }
  };


  


  const resetNewUser = () => {
    setNewUser({
      username: "",
      password: "",
      email: "",
    });
  };




  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="flex-grow p-8">
          <h2 className="text-3xl font-bold mb-4">Administração de Utilizadores</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Tipo</th>
                  <th className="border px-4 py-2">Ação</th>
                </tr>
              </thead>
              <tbody>
                {utilizadores.map((utilizador) => (
                  <tr key={utilizador.id}>
                    <td className="border px-4 py-2">{utilizador.id}</td>
                    <td className="border px-4 py-2">{utilizador.username}</td>
                    <td className="border px-4 py-2">{utilizador.email}</td>
                    <td className="border px-4 py-2">
                      {utilizador.type === 0 ? (
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded"
                          onClick={() => handleTipoChange(utilizador.id, 1)}
                        >
                          Admin
                        </button>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                          onClick={() => handleTipoChange(utilizador.id, 0)}
                        >
                          User
                        </button>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                        onClick={() => handleDeleteUser(utilizador.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isFormOpen ? (
            <div className="mt-8 p-4 border rounded shadow-md">
              <h3 className="text-2xl font-bold mb-4">Adicionar Novo Utilizador</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border rounded px-4 py-2"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
                <input
                  className="border rounded px-4 py-2"
                  type="text"
                  placeholder="Password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />
                <input
                  className="border rounded px-4 py-2"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
                  onClick={() => handleAddUser(newUser.username, newUser.password, newUser.email)}
                >
                  Adicionar Utilizador
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                  setIsFormOpen(false);
                  resetNewUser(); // Chama a função para redefinir o estado newUser
                  }}
                >
                Cancelar
              </button>
              </div>
            </div>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={() => setIsFormOpen(true)}
            >
              Adicionar Novo Utilizador
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUtilizadores;
