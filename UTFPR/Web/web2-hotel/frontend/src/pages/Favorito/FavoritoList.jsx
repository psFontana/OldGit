import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const FavoritoList = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await api.get("/favoritos");
        setFavoritos(response.data);
      } catch (error) {
        setErro("Erro ao buscar favoritos.");
      }
    };
    fetchFavoritos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este favorito?")) {
      try {
        await api.delete(`/favoritos/${id}`);
        setFavoritos(favoritos.filter((f) => f.id !== id));
      } catch (error) {
        alert("Erro ao deletar favorito.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Favoritos</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Restaurante ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {favoritos.length ? (
            favoritos.map((favorito) => (
              <tr key={favorito.id}>
                <td>{favorito.id_usuario}</td>
                <td>{favorito.id_restaurante}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/favoritos/update/${favorito.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(favorito.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhum favorito encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default FavoritoList;
