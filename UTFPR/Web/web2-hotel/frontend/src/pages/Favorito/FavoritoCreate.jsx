import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const FavoritoCreate = () => {
  const [form, setForm] = useState({
    id_usuario: "",
    id_restaurante: "",
  });

  const [usuarioLogado, setUsuarioLogado] = useState({
    id: null,
    perfil: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const perfil = localStorage.getItem("perfil");

    if (token && perfil) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsuarioLogado({ id: payload.id, perfil: payload.perfil });

      if (perfil !== "admin") {
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
      await api.post("/favorito", form);
      navigate("/favoritos/list");
    } catch (err) {
      alert("Erro ao adicionar favorito.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Adicionar Restaurante Favorito</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {usuarioLogado.perfil === "admin" ? (
              <Form.Group className="mb-3">
                <Form.Label>Usuário ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id_usuario"
                  value={form.id_usuario}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label>Usuário ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id_usuario"
                  value={form.id_usuario}
                  disabled
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Restaurante ID</Form.Label>
              <Form.Control
                type="number"
                name="id_restaurante"
                value={form.id_restaurante}
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

export default FavoritoCreate;
