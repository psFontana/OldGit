import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const PratoList = () => {
  const [pratos, setPratos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await api.get("/prato");
        setPratos(response.data);
      } catch (error) {
        setErro("Erro ao buscar pratos.");
      }
    };
    fetchPratos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este prato?")) {
      try {
        await api.delete(`/prato/${id}`);
        setPratos(pratos.filter((p) => p.id !== id));
      } catch (error) {
        alert("Erro ao deletar prato.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Pratos</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Restaurante ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pratos.length ? (
            pratos.map((prato) => (
              <tr key={prato.id}>
                <td>{prato.nome}</td>
                <td>{prato.descricao}</td>
                <td>{prato.preco}</td>
                <td>{prato.restauranteId}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/prato/update/${prato.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(prato.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum prato encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PratoList;
