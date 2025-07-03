const db = require("../../config/db_sequelize");

module.exports = {
  async criar(req, res) {
    try {
      const novoFavorito = await db.Favoritos.create(req.body);
      res.status(201).json(novoFavorito);
    } catch (error) {
      console.error("Erro ao criar favorito:", error);
      res.status(500).send("Erro interno");
    }
  },

  async listar(req, res) {
    try {
      const favoritos = await db.Favoritos.findAll();
      res.json(favoritos);
    } catch (error) {
      console.error("Erro ao listar favoritos:", error);
      res.status(500).send("Erro interno");
    }
  },

  async excluir(req, res) {
    try {
      await db.Favoritos.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir favorito:", error);
      res.status(500).send("Erro interno");
    }
  }
};