const PedidoNoSQL = require("../../models/noSql/pedidos");

module.exports = {
  async criar(req, res) {
    try {
      const novoPedido = await PedidoNoSQL.create(req.body);
      res.status(201).json(novoPedido);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      res.status(500).send("Erro interno");
    }
  },

  async listar(req, res) {
    try {
      const pedidos = await PedidoNoSQL.find();
      res.json(pedidos);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      res.status(500).send("Erro interno");
    }
  },

  async detalhar(req, res) {
    try {
      const pedido = await PedidoNoSQL.findById(req.params.id);
      if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
      res.json(pedido);
    } catch (error) {
      console.error("Erro ao detalhar pedido:", error);
      res.status(500).send("Erro interno");
    }
  },

  async atualizar(req, res) {
    try {
      const pedidoAtualizado = await PedidoNoSQL.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!pedidoAtualizado) return res.status(404).json({ erro: "Pedido não encontrado" });
      res.json(pedidoAtualizado);
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      res.status(500).send("Erro interno");
    }
  },

  async excluir(req, res) {
    try {
      await PedidoNoSQL.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      res.status(500).send("Erro interno");
    }
  }
};
