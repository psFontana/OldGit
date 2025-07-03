import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioRestauranteList = () => {
  const [usuariosRestaurantes, setUsuariosRestaurantes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuariosRestaurantes = async () => {
      try {
        const response = await api.get("/usuarioRestaurante");
        setUsuariosRestaurantes(response.data);
      } catch (error) {
        setErro("Erro ao buscar vínculos de usuário-restaurante.");
      }
    };
    fetchUsuariosRestaurantes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este vínculo?")) {
      try {
        await api.delete(`/usuarioRestaurante/${id}`);
        setUsuariosRestaurantes(
          usuariosRestaurantes.filter((ur) => ur.id !== id)
        );
      } catch (error) {
        alert("Erro ao deletar vínculo.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Vínculos Usuário-Restaurante</h2>
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
          {usuariosRestaurantes.length ? (
            usuariosRestaurantes.map((usuarioRestaurante) => (
              <tr key={usuarioRestaurante.id}>
                <td>{usuarioRestaurante.id_usuario}</td>
                <td>{usuarioRestaurante.id_restaurante}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      navigate(
                        `/usuario-restaurante/update/${usuarioRestaurante.id}`
                      )
                    }
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuarioRestaurante.id)}
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

export default UsuarioRestauranteList;
