import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import api from "../../services/api";

const UsuarioRestauranteUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    usuarioId: "",
    restaurantes: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/usuarioRestaurante`);
        const usuario = response.data.find((u) => u.id === parseInt(id));

        if (usuario) {
          setForm({
            usuarioId: usuario.id,
            restaurantes: usuario.restaurantes.map((r) => r.id).join(", "),
          });
          console.log(typeof usuario.restaurantes);
          console.log(usuario.restaurantes);
        } else {
          setErro("Usuário não encontrado ou sem vínculos para editar.");
        }
      } catch (err) {
        console.error("Erro ao buscar dados do vínculo:", err);
        setErro("Erro ao buscar dados do vínculo.");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const restauranteIds = form.restaurantes
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id));
    console.log(typeof restauranteIds);
    console.log(restauranteIds);
    try {
      await api.put(`/usuarioRestaurante/${form.usuarioId}`, {
        restaurantes: restauranteIds,
      });
      navigate("/usuario-restaurante/list");
    } catch (err) {
      console.error("Erro ao atualizar vínculo:", err);
      alert("Erro ao atualizar vínculo.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Atualizar Vínculo Usuário-Restaurante</h5>
        </Card.Header>
        <Card.Body>
          {erro && <Alert variant="danger">{erro}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuário ID:</Form.Label>
              <Form.Control
                type="number"
                name="usuarioId"
                value={form.usuarioId}
                onChange={handleChange}
                required
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Restaurantes Vinculados (IDs):</Form.Label>
              <Form.Control
                type="text"
                name="restaurantes"
                value={form.restaurantes}
                onChange={handleChange}
                placeholder="IDs de restaurantes separados por vírgula (ex: 1,2,3)"
                required
              />
              <Form.Text className="text-muted">
                Para desvincular, remova o ID da lista. Para vincular, adicione
                o ID.
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Atualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuarioRestauranteUpdate;
