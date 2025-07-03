import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UsuarioEnderecoCreate = () => {
  const [form, setForm] = useState({
    id_usuario: "",
    id_endereco: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/usuarioEndereco", form);
      navigate("/usuario-endereco/list");
    } catch (err) {
      alert("Erro ao vincular usuário ao endereço.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Vincular Usuário a Endereço</h5>
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
              <Form.Label>Endereço ID:</Form.Label>
              <Form.Control
                type="number"
                name="id_endereco"
                value={form.id_endereco}
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

export default UsuarioEnderecoCreate;
