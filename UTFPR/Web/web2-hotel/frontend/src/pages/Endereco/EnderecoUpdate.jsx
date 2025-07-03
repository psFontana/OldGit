import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const EnderecoUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    cep: "",
    numero: "",
    complemento: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/endereco/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Erro ao buscar dados do endereço."));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/endereco/${id}`, form);
      navigate("/endereco/list");
    } catch (err) {
      alert("Erro ao atualizar endereço.");
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Editar Endereço</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={form.cep}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                name="numero"
                value={form.numero}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                type="text"
                name="complemento"
                value={form.complemento}
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

export default EnderecoUpdate;
