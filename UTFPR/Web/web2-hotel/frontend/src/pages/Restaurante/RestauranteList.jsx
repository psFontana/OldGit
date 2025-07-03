import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const RestauranteList = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await api.get("/restaurante");
        setRestaurantes(response.data);
      } catch (error) {
        setErro("Erro ao buscar restaurantes.");
      }
    };
    fetchRestaurantes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este restaurante?")) {
      try {
        await api.delete(`/restaurante/${id}`);
        setRestaurantes(restaurantes.filter((r) => r.id !== id));
      } catch (error) {
        alert("Erro ao deletar restaurante.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Restaurantes</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {restaurantes.length ? (
            restaurantes.map((restaurante) => (
              <tr key={restaurante.id}>
                <td>{restaurante.id}</td>
                <td>{restaurante.nome}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(`/restaurante/update/${restaurante.id}`)
                    }
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(restaurante.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum restaurante encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default RestauranteList;
