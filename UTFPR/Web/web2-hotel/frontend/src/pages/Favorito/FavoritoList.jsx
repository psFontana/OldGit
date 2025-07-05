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
        const perfil = localStorage.getItem("perfil");
        const token = localStorage.getItem("token");

        if (!perfil || !token) {
          setErro("Usuário não autenticado.");
          return;
        }

        const payload = JSON.parse(atob(token.split(".")[1]));
        const idLogado = payload.id;

        const res = await api.get("/favorito");
        let lista = res.data;

        if (perfil === "cliente") {
          lista = lista.filter(
            (f) => Number(f.id_usuario) === Number(idLogado)
          );
        } else if (perfil === "dono") {
          const usuariosRes = await api.get("/usuarioRestaurante");
          const dono = usuariosRes.data.find(
            (u) => Number(u.id) === Number(idLogado)
          );
          if (!dono) {
            setErro("Dados do dono não encontrados.");
            return;
          }
          const idsRestaurantes = dono.restaurantes.map((r) => r.id);

          lista = lista.filter(
            (f) =>
              idsRestaurantes.includes(Number(f.id_restaurante)) ||
              Number(f.id_usuario) === Number(idLogado)
          );
        }
        // Admin vê todos (sem filtro)

        setFavoritos(lista);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        setErro("Erro ao buscar favoritos.");
      }
    };

    fetchFavoritos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este favorito?")) {
      try {
        await api.delete(`/favorito/${id}`);
        setFavoritos((prev) => prev.filter((f) => f.id !== id));
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
            favoritos.map((fav) => (
              <tr key={fav.id}>
                <td>{fav.id_usuario}</td>
                <td>{fav.id_restaurante}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/favoritos/update/${fav.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(fav.id)}
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
