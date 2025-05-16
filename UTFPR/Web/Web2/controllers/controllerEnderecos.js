const db = require('../config/db_sequelize');

module.exports = {
  async getCreate(req, res) {
    res.render('enderecos/enderecosCreate');
  },

  async postCreate(req, res) {
    try {
      await db.Enderecos.create(req.body);
      res.redirect('/enderecosList');
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getList(req, res) {
    try {
      const enderecos = await db.Enderecos.findAll();
      res.render('enderecos/enderecosList', { enderecos: enderecos.map(e => e.toJSON()) });
    } catch (error) {
      console.error('Erro ao listar endereços:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getUpdate(req, res) {
    try {
      const endereco = await db.Enderecos.findByPk(req.params.id);
      if (endereco) {
        res.render('enderecos/enderecosUpdate', { endereco: endereco.toJSON() });
      } else {
        res.redirect('/enderecosList');
      }
    } catch (error) {
      console.error('Erro ao carregar endereço:', error);
      res.status(500).send('Erro interno');
    }
  },

  async postUpdate(req, res) {
    try {
      await db.Enderecos.update(req.body, { where: { id: req.body.id } });
      res.redirect('/enderecosList');
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      res.status(500).send('Erro interno ao listar');
    }
  },

  async getDelete(req, res) {
    try {
      await db.Enderecos.destroy({ where: { id: req.params.id } });
      await db.sequelize.query(`ALTER SEQUENCE enderecos_id_seq RESTART WITH 1`);
      res.redirect('/enderecosList');
    } catch (error) {
      console.error('Erro ao deletar endereço:', error);
      res.status(500).send('Erro interno');
    }
  }
};
