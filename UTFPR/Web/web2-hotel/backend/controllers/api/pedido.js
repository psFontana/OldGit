const db = require("../../config/db_sequelize"); // Importa a configuração do Sequelize
const PedidoNoSQL = require("../../models/noSql/pedidos"); // Importa o modelo Mongoose

module.exports = {
  async criar(req, res) {
    try {
      // Dados que vêm do frontend React
      const { id_usuario, id_restaurante, data, status, total } = req.body; // Removi 'pratos' daqui por enquanto

      // 1. Crie o pedido no banco de dados Relacional (Sequelize)
      const novoPedidoRelacional = await db.Pedido.create({
        id_usuario,
        id_restaurante,
        data,
        status: "Pendente",
      });

      // 2. Crie o pedido correspondente no banco de dados NoSQL (Mongoose)
      await PedidoNoSQL.create({
        id: novoPedidoRelacional.id,
        id_usuario,
        id_restaurante,
        pratos: [], // Vazio, já que não há lógica de pratos ainda
        total: 0,
        status: novoPedidoRelacional.status,
        data: novoPedidoRelacional.data || new Date(),
      });

      res.status(201).json({
        message: "Pedido criado com sucesso em ambos os bancos de dados.",
        pedidoId: novoPedidoRelacional.id,
      });
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Erro de validação ao criar pedido.",
          errors: error.errors,
        });
      }
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao criar pedido." });
    }
  },

  async listar(req, res) {
    try {
      const pedidos = await PedidoNoSQL.find();
      res.json(pedidos);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao listar pedidos." });
    }
  },

  async detalhar(req, res) {
    try {
      const { id } = req.params;
      const pedidoNoSQL = await PedidoNoSQL.findOne({ id: id });

      if (!pedidoNoSQL) {
        return res.status(404).json({ message: "Pedido não encontrado." });
      }
      res.json(pedidoNoSQL);
    } catch (error) {
      console.error("Erro ao detalhar pedido:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao detalhar pedido." });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { id_usuario, id_restaurante, data, status, total } = req.body; // Removi 'pratos' por enquanto

      const [linhasAfetadas] = await db.Pedido.update(
        { id_usuario, id_restaurante, data, status },
        { where: { id: id } }
      );

      if (linhasAfetadas === 0) {
        return res.status(404).json({
          message: "Pedido relacional não encontrado para atualização.",
        });
      }

      // Determine o 'total' para atualização
      const totalParaNoSQL = total || 0; // Ou o valor vindo do frontend

      const pedidoAtualizadoNoSQL = await PedidoNoSQL.findOneAndUpdate(
        { id: id },
        {
          id_usuario,
          id_restaurante,
          data,
          status,
          total: totalParaNoSQL,
          pratos: [],
        }, // 'pratos' vazio
        { new: true, runValidators: true }
      );

      if (!pedidoAtualizadoNoSQL) {
        return res
          .status(404)
          .json({ message: "Pedido NoSQL não encontrado para atualização." });
      }

      res.json({
        message: "Pedido atualizado com sucesso em ambos os bancos de dados.",
        pedidoAtualizado: pedidoAtualizadoNoSQL,
      });
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Erro de validação ao atualizar pedido.",
          errors: error.errors,
        });
      }
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao atualizar pedido." });
    }
  },

  async excluir(req, res) {
    try {
      const { id } = req.params;

      const linhasDeletadasRelacional = await db.Pedido.destroy({
        where: { id: id },
      });

      if (linhasDeletadasRelacional === 0) {
        return res
          .status(404)
          .json({ message: "Pedido relacional não encontrado para exclusão." });
      }

      const resultadoDeleteNoSQL = await PedidoNoSQL.deleteOne({ id: id });

      if (resultadoDeleteNoSQL.deletedCount === 0) {
        console.warn(
          `Aviso: Pedido com ID ${id} foi removido do Sequelize, mas não encontrado no NoSQL.`
        );
      }

      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir pedido:", error);
      res
        .status(500)
        .json({ message: "Erro interno do servidor ao excluir pedido." });
    }
  },
};
