const db = require("../../config/db_sequelize");

module.exports = {
  async criar(req, res) {
    try {
      const novoPrato = await db.Prato.create(req.body);
      res.status(201).json(novoPrato);
    } catch (error) {
      console.error("Erro ao criar prato:", error);
      res.status(500).send("Erro interno");
    }
  },

  async listar(req, res) {
    try {
      const pratos = await db.Prato.findAll();
      res.json(pratos);
    } catch (error) {
      console.error("Erro ao listar pratos:", error);
      res.status(500).send("Erro interno");
    }
  },

  async detalhar(req, res) {
    try {
      const prato = await db.Prato.findByPk(req.params.id);
      if (!prato) return res.status(404).json({ erro: "Prato não encontrado" });
      res.json(prato);
    } catch (error) {
      console.error("Erro ao detalhar prato:", error);
      res.status(500).send("Erro interno");
    }
  },

  async atualizar(req, res) {
    try {
      await db.Prato.update(req.body, { where: { id: req.params.id } });
      res.json({ mensagem: "Prato atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
      res.status(500).send("Erro interno");
    }
  },

  async excluir(req, res) {
    try {
      await db.Prato.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir prato:", error);
      res.status(500).send("Erro interno");
    }
  }
};
