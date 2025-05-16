const db = require('../config/db_sequelize');

module.exports = {
  async getCreate(req, res) {
    res.render('usuarioEndereco/usuarioEnderecoCreate');
  },

  async postCreate(req, res) {
    try {
      await db.UsuarioEndereco.create(req.body);
      res.redirect('/usuarioEnderecoList');
    } catch (error) {
      console.error('Erro ao criar usuário-endereço:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getList(req, res) {
    try {
      const usuarioEnderecos = await db.UsuarioEndereco.findAll();
      res.render('usuarioEndereco/usuarioEnderecoList', { usuarioEnderecos: usuarioEnderecos.map(ue => ue.toJSON()) });
    } catch (error) {
      console.error('Erro ao listar usuário-endereço:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getDelete(req, res) {
    try {
      await db.UsuarioEndereco.destroy({ where: { id: req.params.id } });
      res.redirect('/usuarioEnderecoList');
    } catch (error) {
      console.error('Erro ao deletar usuário-endereço:', error);
      res.status(500).send('Erro interno');
    }
  },
  
  async getUpdate(req, res) {
    try {
      const usuarioEndereco = await db.UsuarioEndereco.findByPk(req.params.id);
      if (usuarioEndereco) {
        res.render('usuarioEndereco/usuarioEnderecoUpdate', { usuarioEndereco: usuarioEndereco.toJSON() });
      } else {
        res.redirect('/usuarioEnderecoList');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário-endereço:', error);
      res.status(500).send('Erro interno');
    }
  },

  async postUpdate(req, res) {
    try {
      await db.UsuarioEndereco.update(req.body, { where: { id: req.body.id } });
      res.redirect('/usuarioEnderecoList');
    } catch (error) {
      console.error('Erro ao atualizar usuário-endereço:', error);
      res.status(500).send('Erro interno');
    }
  }
};
