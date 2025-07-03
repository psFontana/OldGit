import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import api from "../../services/api";

const PedidoUpdate = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    id_usuario: "",
    id_restaurante: "",
    data: "",
    status: "Pendente",
  });

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/pedido/${id}`)
      .then((res) => {
        const pedidoData = res.data;

        let formattedDate = "";
        if (pedidoData.data) {
          const dateObj = new Date(pedidoData.data);

          const year = dateObj.getUTCFullYear();
          const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getUTCDate()).padStart(2, "0");

          formattedDate = `${year}-${month}-${day}`;
        }

        setForm({
          id_usuario: pedidoData.id_usuario,
          id_restaurante: pedidoData.id_restaurante,
          data: formattedDate, // Usa a data formatada
          status: pedidoData.status,
          // Inclua outros campos aqui se necessário
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do pedido:", error);
        alert("Erro ao buscar dados do pedido. Verifique o console.");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Quando o input type="date" envia, ele já envia YYYY-MM-DD.
      // O backend geralmente consegue parsear isso como UTC 00:00:00 do dia.
      // Se seu backend espera uma ISO string completa, você pode converter aqui:
      // const dataParaEnviar = new Date(form.data).toISOString();
      // await api.put(`/pedido/${id}`, { ...form, data: dataParaEnviar });

      await api.put(`/pedido/${id}`, form);
      alert("Pedido atualizado com sucesso!");
      navigate("/pedido/list");
    } catch (err) {
      console.error(
        "Erro ao atualizar pedido:",
        err.response ? err.response.data : err.message
      );
      alert(
        "Erro ao atualizar pedido. Verifique o console para mais detalhes."
      );
    }
  };

  return (
    <Container className="mt-4 d-flex justify-content-center">
      <Card style={{ width: "40rem" }}>
        <Card.Header>
          <h5>Atualizar Pedido</h5>
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
              <Form.Label>Restaurante ID:</Form.Label>
              <Form.Control
                type="number"
                name="id_restaurante"
                value={form.id_restaurante}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data:</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="Em Preparação">Em Preparação</option>
                <option value="Entregue">Entregue</option>
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

export default PedidoUpdate;
