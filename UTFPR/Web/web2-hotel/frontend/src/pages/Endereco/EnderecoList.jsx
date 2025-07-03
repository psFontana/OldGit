import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const EnderecoList = () => {
  const [enderecos, setEnderecos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        const response = await api.get("/endereco");
        setEnderecos(response.data);
      } catch (error) {
        setErro("Erro ao buscar endereços.");
      }
    };
    fetchEnderecos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este endereço?")) {
      try {
        await api.delete(`/endereco/${id}`);
        setEnderecos(enderecos.filter((e) => e.id !== id));
      } catch (error) {
        alert("Erro ao deletar endereço.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Endereços</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>CEP</th>
            <th>Número</th>
            <th>Complemento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {enderecos.length ? (
            enderecos.map((endereco) => (
              <tr key={endereco.id}>
                <td>{endereco.id}</td>
                <td>{endereco.cep}</td>
                <td>{endereco.numero}</td>
                <td>{endereco.complemento}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/endereco/update/${endereco.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(endereco.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum endereço encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default EnderecoList;
