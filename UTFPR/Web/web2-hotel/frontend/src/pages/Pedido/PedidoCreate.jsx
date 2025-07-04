import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const PedidoCreate = () => {
  const [form, setForm] = useState({
    id_usuario: "",
    id_restaurante: "",
    data: "",
    status: "Pendente",
  });

  const [usuarioLogado, setUsuarioLogado] = useState({
    id: null,
    perfil: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsuarioLogado({ id: payload.id, perfil: payload.perfil });

      if (payload.perfil === "cliente") {
        setForm((prev) => ({ ...prev, id_usuario: payload.id }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pedido", form);
      navigate("/pedido/list");
    } catch (err) {
      alert("Erro ao fazer pedido.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Fazer Novo Pedido</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {(usuarioLogado.perfil === "admin" ||
              usuarioLogado.perfil === "dono") && (
              <Form.Group className="mb-3">
                <Form.Label>ID do Usuário</Form.Label>
                <Form.Control
                  type="number"
                  name="id_usuario"
                  value={form.id_usuario}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            {usuarioLogado.perfil === "cliente" && (
              <Form.Group className="mb-3">
                <Form.Label>ID do Usuário</Form.Label>
                <Form.Control
                  type="number"
                  name="id_usuario"
                  value={form.id_usuario}
                  disabled
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>ID do Restaurante</Form.Label>
              <Form.Control
                type="number"
                name="id_restaurante"
                value={form.id_restaurante}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={form.data}
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

export default PedidoCreate;
