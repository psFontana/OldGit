import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const PratoUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    restauranteId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/prato/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao buscar dados do prato."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/prato/${id}`, form);
      navigate("/prato/list");
    } catch (err) {
      alert("Erro ao atualizar prato.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Editar Prato</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome:</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preço:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="preco"
                value={form.preco}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Restaurante ID:</Form.Label>
              <Form.Control
                type="number"
                name="restauranteId"
                value={form.restauranteId}
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

export default PratoUpdate;
