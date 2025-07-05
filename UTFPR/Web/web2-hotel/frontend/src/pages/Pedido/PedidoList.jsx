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
        const perfil = localStorage.getItem("perfil");
        const token = localStorage.getItem("token");

        if (!perfil || !token) {
          setErro("Usuário não autenticado.");
          return;
        }

        // Extrai o ID do usuário a partir do payload do token manualmente (sem jwt-decode)
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        const idLogado = payload.id;

        // Busca todos os pedidos
        const pedidosRes = await api.get("/pedido");
        let pedidosFiltrados = pedidosRes.data;

        if (perfil === "cliente") {
          pedidosFiltrados = pedidosFiltrados.filter(
            (p) => Number(p.id_usuario) === Number(idLogado)
          );
        } else if (perfil === "dono") {
          // Busca os restaurantes vinculados ao dono
          const usuarioRes = await api.get("/usuarioRestaurante");
          const dono = usuarioRes.data.find(
            (u) => Number(u.id) === Number(idLogado)
          );

          if (!dono) {
            setErro("Dados do dono não encontrados.");
            return;
          }

          const idsRestaurantes = dono.restaurantes.map((r) => r.id);

          pedidosFiltrados = pedidosFiltrados.filter((p) =>
            idsRestaurantes.includes(Number(p.id_restaurante))
          );
        }

        setPedidos(pedidosFiltrados);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        setErro("Erro ao buscar pedidos.");
      }
    };

    fetchPedidos();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este pedido?")) {
      try {
        await api.delete(`/pedido/${id}`);
        setPedidos((prev) => prev.filter((p) => p.id !== id));
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
                <td>{new Date(pedido.data).toLocaleDateString()}</td>
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
