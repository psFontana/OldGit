import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioRestauranteCreate = () => {
  const [form, setForm] = useState({
    id_usuario: "",
    id_restaurante: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Converta os IDs para números antes de enviar
      const dataToSend = {
        usuarioId: Number(form.id_usuario), // Converte para número
        restauranteId: Number(form.id_restaurante), // Converte para número
      };

      await api.post("/usuarioRestaurante", dataToSend);
      alert("Usuário vinculado ao restaurante com sucesso!");
      navigate("/usuario-restaurante/list");
    } catch (err) {
      console.error(
        "Erro ao vincular usuário ao restaurante:",
        err.response ? err.response.data : err.message
      );
      alert(
        "Erro ao vincular usuário ao restaurante. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Vincular Usuário a Restaurante</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuário ID:</Form.Label>
              <Form.Control
                type="number"
                name="id_usuario"
                value={form.id_usuario}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Restaurante ID:</Form.Label>
              <Form.Control
                type="number"
                name="id_restaurante"
                value={form.id_restaurante}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Vincular
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuarioRestauranteCreate;
