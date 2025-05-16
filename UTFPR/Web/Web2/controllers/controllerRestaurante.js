const db = require('../config/db_sequelize');
const RestauranteNoSQL = require('../models/noSql/restaurante');

module.exports = {
  // Página de criação de restaurante
  async getCreate(req, res) {
    res.render('restaurante/restauranteCreate');
  },

  // Ação de criação de restaurante
  async postCreate(req, res) {
    try {
      // Cria no relacional
      const novoRestaurante = await db.Restaurante.create(req.body);

      // Cria no NoSQL usando o mesmo id
      await RestauranteNoSQL.create({
        id: novoRestaurante.id, // use _id para o MongoDB
        nome: novoRestaurante.nome
      });

      res.redirect('/restauranteList');
    } catch (error) {
      console.error('Erro ao criar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Listagem de restaurantes
  async getList(req, res) {
    try {
      const restaurantes = await db.Restaurante.findAll();
      res.render('restaurante/restauranteList', {
        restaurantes: restaurantes.map(r => r.toJSON())
      });
    } catch (error) {
      console.error('Erro ao listar restaurantes:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Página de edição de restaurante
  async getUpdate(req, res) {
    try {
      const restaurante = await db.Restaurante.findByPk(req.params.id);
      if (restaurante) {
        res.render('restaurante/restauranteUpdate', {
          restaurante: restaurante.toJSON()
        });
      } else {
        res.status(404).send('Restaurante não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Ação de atualização de restaurante
  async postUpdate(req, res) {
    try {
      const { id, nome, descricao, endereco } = req.body;

      await db.Restaurante.update(
        { nome, descricao, endereco },
        { where: { id } }
      );

      // Atualiza no NoSQL também
      await RestauranteNoSQL.updateOne(
        { id: id },
        { nome }
      );

      res.redirect('/restauranteList');
    } catch (error) {
      console.error('Erro ao atualizar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  },

  // Ação de exclusão de restaurante
  async getDelete(req, res) {
    try {
      await db.Restaurante.destroy({
        where: { id: req.params.id }
      });

      // Remove do NoSQL também
      await RestauranteNoSQL.deleteOne({ id: req.params.id });

      await db.sequelize.query(`ALTER SEQUENCE restaurantes_id_seq RESTART WITH 1`);
      res.redirect('/restauranteList');
    } catch (error) {
      console.error('Erro ao deletar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  }
};
