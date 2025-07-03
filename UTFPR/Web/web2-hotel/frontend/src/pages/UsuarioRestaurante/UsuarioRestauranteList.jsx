import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api"; // Certifique-se de que a baseURL está 'http://localhost:8081'
import { useNavigate } from "react-router-dom";

const UsuarioRestauranteList = () => {
  const [usuariosComRestaurantes, setUsuariosComRestaurantes] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuariosRestaurantes = async () => {
      try {
        const response = await api.get("/usuarioRestaurante");
        console.log(response.data); // Verifique os dados retornados
        // Filtra apenas usuários com restaurantes vinculados
        const usuariosFiltrados = response.data.filter(
          (user) => user.restaurantes && user.restaurantes.length > 0
        );
        setUsuariosComRestaurantes(usuariosFiltrados);
      } catch (error) {
        console.error(
          "Erro ao buscar vínculos:",
          error.response ? error.response.data : error.message
        );
        setErro(
          "Erro ao buscar vínculos de usuário-restaurante. Verifique o console."
        );
      }
    };
    fetchUsuariosRestaurantes();
  }, []);

  const handleDesvincular = async (usuarioId, restauranteId) => {
    if (
      window.confirm(
        `Tem certeza que deseja desvincular o restaurante ID ${restauranteId} do usuário ID ${usuarioId}?`
      )
    ) {
      try {
        await api.delete(`/usuarioRestaurante/${usuarioId}/${restauranteId}`);
        setUsuariosComRestaurantes((prevUsuarios) =>
          prevUsuarios.map((user) => {
            if (user.id === usuarioId) {
              return {
                ...user,
                restaurantes: user.restaurantes.filter(
                  (r) => r.id !== restauranteId
                ),
              };
            }
            return user;
          })
        );
        alert("Restaurante desvinculado com sucesso!");
      } catch (error) {
        console.error(
          "Erro ao desvincular restaurante:",
          error.response ? error.response.data : error.message
        );
        alert("Erro ao desvincular restaurante.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Lista de Usuários com Restaurantes Vinculados</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <div className="table-responsive">
        <Table striped bordered hover className="mt-3">
          <thead className="table-dark">
            <tr>
              <th scope="col">Usuário ID</th>
              <th scope="col">Nome do Usuário</th>
              <th scope="col">Restaurantes Vinculados</th>
              <th scope="col">Ações (Usuário)</th>
            </tr>
          </thead>
          <tbody>
            {usuariosComRestaurantes.length ? (
              usuariosComRestaurantes.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nome}</td>
                  <td>
                    {usuario.restaurantes && usuario.restaurantes.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {usuario.restaurantes.map((restaurante) => (
                          <li key={restaurante.id}>
                            {restaurante.nome} (ID: {restaurante.id})
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="ms-2"
                              onClick={() =>
                                handleDesvincular(usuario.id, restaurante.id)
                              }
                            >
                              Desvincular
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "Nenhum restaurante vinculado."
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() =>
                        navigate(`/usuario-restaurante/update/${usuario.id}`)
                      }
                    >
                      Editar Vínculos
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhum usuário com vínculos encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default UsuarioRestauranteList;
