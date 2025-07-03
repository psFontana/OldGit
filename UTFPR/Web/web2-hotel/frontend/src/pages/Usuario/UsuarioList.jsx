// src/pages/Usuario/UsuarioList.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get("/usuario/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        setErro("Erro ao buscar usuários.");
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await api.delete(`/usuario/usuarios/${id}`);
        setUsuarios(usuarios.filter((u) => u.id !== id));
      } catch (error) {
        alert("Erro ao deletar usuário.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Usuários</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Nascimento</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nascimento}</td>
                <td>{usuario.perfil}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/usuario/update/${usuario.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsuarioList;
