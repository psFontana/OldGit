const db = require('../config/db_sequelize');

module.exports = {
  async getCreate(req, res) {
    res.render('favoritos/favoritosCreate');
  },

  async postCreate(req, res) {
    try {
      await db.Favoritos.create(req.body);
      res.redirect('/favoritosList');
    } catch (error) {
      console.error('Erro ao criar favorito:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getList(req, res) {
    try {
      const favoritos = await db.Favoritos.findAll();
      res.render('favoritos/favoritosList', { favoritos: favoritos.map(f => f.toJSON()) });
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getDelete(req, res) {
    try {
      await db.Favoritos.destroy({ where: { id: req.params.id } });
      await db.sequelize.query(`ALTER SEQUENCE favoritos_id_seq RESTART WITH 1`);
      res.redirect('/favoritosList');
    } catch (error) {
      console.error('Erro ao deletar favorito:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getUpdate(req, res) {
    try {
      const favorito = await db.Favoritos.findByPk(req.params.id);
      if (favorito) {
        res.render('favoritos/favoritosUpdate', { favorito: favorito.toJSON() });
      } else {
        res.redirect('/favoritosList');
      }
    } catch (error) {
      console.error('Erro ao carregar favorito:', error);
      res.status(500).send('Erro interno');
    }
  },

  async postUpdate(req, res) {
    try {
      await db.Favoritos.update(req.body, { where: { id: req.body.id } });
      res.redirect('/favoritosList');
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
      res.status(500).send('Erro interno');
    }
  }
};
