import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const RestauranteUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    endereco: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/restaurante/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao buscar dados do restaurante."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/restaurante/${id}`, form);
      navigate("/restaurante/list");
    } catch (err) {
      alert("Erro ao atualizar restaurante.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Editar Restaurante</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
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

export default RestauranteUpdate;
