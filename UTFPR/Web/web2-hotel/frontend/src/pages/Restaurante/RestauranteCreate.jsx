import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const RestauranteCreate = () => {
  const [form, setForm] = useState({
    nome: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/restaurante", form);
      navigate("/restaurante/list");
    } catch (err) {
      alert("Erro ao cadastrar restaurante.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Cadastrar Novo Restaurante</h5>
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
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestauranteCreate;
