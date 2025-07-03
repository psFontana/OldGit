import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioEnderecoList = () => {
  const [usuarioEnderecos, setUsuarioEnderecos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarioEnderecos = async () => {
      try {
        const response = await api.get("/usuarioEndereco");
        setUsuarioEnderecos(response.data);
      } catch (error) {
        setErro("Erro ao buscar vínculos de usuário-endereço.");
      }
    };
    fetchUsuarioEnderecos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este vínculo?")) {
      try {
        await api.delete(`/usuarioEndereco/${id}`);
        setUsuarioEnderecos(usuarioEnderecos.filter((ue) => ue.id !== id));
      } catch (error) {
        alert("Erro ao deletar vínculo.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Vínculos Usuário-Endereço</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Endereço ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarioEnderecos.length ? (
            usuarioEnderecos.map((usuarioEndereco) => (
              <tr key={usuarioEndereco.id}>
                <td>{usuarioEndereco.id_usuario}</td>
                <td>{usuarioEndereco.id_endereco}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/usuario-endereco/update/${usuarioEndereco.id}`)
                    }
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuarioEndereco.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhum vínculo encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsuarioEnderecoList;
