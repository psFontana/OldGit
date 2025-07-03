import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const UsuarioEnderecoUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    id_usuario: "",
    id_endereco: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/usuarioEndereco/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao buscar dados do vínculo."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/usuarioEndereco/${id}`, form);
      navigate("/usuario-endereco/list");
    } catch (err) {
      alert("Erro ao atualizar vínculo.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Atualizar Vínculo Usuário-Endereço</h5>
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
              Atualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuarioEnderecoUpdate;
