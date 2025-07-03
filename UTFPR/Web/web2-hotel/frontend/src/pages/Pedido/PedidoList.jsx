import React, { useEffect, useState } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import api from "../../services/api.js";
import { useNavigate } from "react-router-dom";

const PedidoList = () => {
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get("/pedido");
        setPedidos(response.data);
      } catch (error) {
        setErro("Erro ao buscar pedidos.");
      }
    };
    fetchPedidos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
      try {
        await api.delete(`/pedido/${id}`);
        setPedidos(pedidos.filter((p) => p.id !== id));
      } catch (error) {
        alert("Erro ao deletar pedido.");
      }
    }
  };

  return (
    <Container>
      <h2>Lista de Pedidos</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Usuário ID</th>
            <th>Restaurante ID</th>
            <th>Data</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length ? (
            pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id_usuario}</td>
                <td>{pedido.id_restaurante}</td>
                <td>{pedido.data}</td>
                <td>{pedido.status}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/pedido/update/${pedido.id}`)}
                  >
                    Editar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pedido.id)}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum pedido encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default PedidoList;
