// src/pages/Usuario/UsuarioUpdate.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const UsuarioUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    nascimento: "",
    perfil: "cliente",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/usuario/usuarios/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao buscar dados do usuário."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuario/usuarios/${id}`, form);
      navigate("/usuario/list");
    } catch (err) {
      alert("Erro ao atualizar usuário.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Editar Usuário</h5>
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
                value={form.nascimento?.split("T")[0]}
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
              Atualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuarioUpdate;
