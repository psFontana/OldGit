const db = require("../../config/db_sequelize");

module.exports = {
  async criar(req, res) {
    try {
      const novoUsuarioEndereco = await db.UsuarioEndereco.create(req.body);
      res.status(201).json(novoUsuarioEndereco);
    } catch (error) {
      console.error("Erro ao criar usuário-endereço:", error);
      res.status(500).send("Erro interno");
    }
  },

  async listar(req, res) {
    try {
      const usuarioEnderecos = await db.UsuarioEndereco.findAll();
      res.json(usuarioEnderecos);
    } catch (error) {
      console.error("Erro ao listar usuário-endereços:", error);
      res.status(500).send("Erro interno");
    }
  },

  async excluir(req, res) {
    try {
      await db.UsuarioEndereco.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir usuário-endereço:", error);
      res.status(500).send("Erro interno");
    }
  }
};
