const db = require('../config/db_sequelize');

module.exports = {
  async getCreate(req, res) {
    res.render('prato/pratoCreate');
  },

  async postCreate(req, res) {
    try {
      await db.Prato.create(req.body);
      res.redirect('/pratoList');
    } catch (error) {
      console.error('Erro ao criar prato:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getList(req, res) {
    try {
      const pratos = await db.Prato.findAll();
      res.render('prato/pratoList', { pratos: pratos.map(p => p.toJSON()) });
    } catch (error) {
      console.error('Erro ao listar pratos:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getDelete(req, res) {
    try {
      await db.Prato.destroy({ where: { id: req.params.id } });
      await db.sequelize.query(`ALTER SEQUENCE pratos_id_seq RESTART WITH 1`);
      res.redirect('/pratoList');
    } catch (error) {
      console.error('Erro ao deletar prato:', error);
      res.status(500).send('Erro interno');
    }
  }
};
