// src/pages/Usuario/UsuarioCreate.jsx
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioCreate = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    nascimento: "",
    senha: "",
    perfil: "cliente",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuario/usuarios", form);
      navigate("/usuario/list");
    } catch (err) {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Cadastrar Novo Usuário</h5>
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
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="nascimento"
                value={form.nascimento}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Perfil</Form.Label>
              <Form.Select
                name="perfil"
                value={form.perfil}
                onChange={handleChange}
                required
              >
                <option value="admin">Administrador</option>
                <option value="dono">Dono de Restaurante</option>
                <option value="cliente">Cliente</option>
              </Form.Select>
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

export default UsuarioCreate;
