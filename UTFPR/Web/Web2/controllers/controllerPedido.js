const db = require('../config/db_sequelize');
const PedidoNoSQL = require('../models/noSql/pedidos');

module.exports = {
  // Página de criação
  async getCreate(req, res) {
    res.render('pedido/pedidoCreate');
  },

  // Ação de criação
  async postCreate(req, res) {
    try {
      const { id_usuario, id_restaurante, data } = req.body;
      // Cria no relacional
      const novoPedido = await db.Pedido.create({
        id_usuario,
        id_restaurante,
        data,
        status: 'Pendente'
      });

      // Cria no NoSQL usando o mesmo id
      await PedidoNoSQL.create({
        id: novoPedido.id,
        id_usuario,
        id_restaurante,
        pratos: [], 
        total: 0,   
        status: 'Pendente',
        data: data || new Date()
      });

      res.redirect('/pedidoList');
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Listagem de pedidos
  async getList(req, res) {
    try {
      const pedidos = await db.Pedido.findAll();
      res.render('pedido/pedidoList', {
        pedidos: pedidos.map(p => p.toJSON())
      });
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Página de edição
  async getUpdate(req, res) {
    try {
      const pedido = await db.Pedido.findByPk(req.params.id);
      if (pedido) {
        res.render('pedido/pedidoUpdate', {
          pedido: pedido.toJSON()
        });
      } else {
        res.status(404).send('Pedido não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Ação de atualização
  async postUpdate(req, res) {
    try {
      const { id, id_usuario, id_restaurante, data, status } = req.body;

      await db.Pedido.update(
        { id_usuario, id_restaurante, data, status },
        { where: { id } }
      );

      // Atualiza no NoSQL também
      await PedidoNoSQL.updateOne(
        { id: id },
        { id_usuario, id_restaurante, status, data }
      );

      res.redirect('/pedidoList');
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Ação de exclusão
  async getDelete(req, res) {
    try {
      await db.Pedido.destroy({ where: { id: req.params.id } });

      // Remove do NoSQL também
      await PedidoNoSQL.deleteOne({ id: req.params.id });

      await db.sequelize.query(`ALTER SEQUENCE pedidos_id_seq RESTART WITH 1`);
      res.redirect('/pedidoList');
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      res.status(500).send('Erro interno');
    }
  }
};
