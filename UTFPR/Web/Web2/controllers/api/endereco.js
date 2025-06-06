const db = require("../../config/db_sequelize");

module.exports = {
  async criar(req, res) {
    try {
      const novoEndereco = await db.Enderecos.create(req.body);
      res.status(201).json(novoEndereco);
    } catch (error) {
      console.error("Erro ao criar endereço:", error);
      res.status(500).send("Erro interno");
    }
  },

  async listar(req, res) {
    try {
      const enderecos = await db.Enderecos.findAll();
      res.json(enderecos);
    } catch (error) {
      console.error("Erro ao listar endereços:", error);
      res.status(500).send("Erro interno");
    }
  },

  async detalhar(req, res) {
    try {
      const endereco = await db.Enderecos.findByPk(req.params.id);
      if (!endereco) return res.status(404).json({ erro: "Endereço não encontrado" });
      res.json(endereco);
    } catch (error) {
      console.error("Erro ao detalhar endereço:", error);
      res.status(500).send("Erro interno");
    }
  },

  async atualizar(req, res) {
    try {
      await db.Enderecos.update(req.body, { where: { id: req.params.id } });
      res.json({ mensagem: "Endereço atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      res.status(500).send("Erro interno");
    }
  },

  async excluir(req, res) {
    try {
      await db.Enderecos.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir endereço:", error);
      res.status(500).send("Erro interno");
    }
  }
};
