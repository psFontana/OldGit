const UsuarioMongo = require("../../models/noSql/usuario");
const RestauranteMongo = require("../../models/noSql/restaurante");

module.exports = {
  async vincular(req, res) {
    try {
      const { usuarioId, restauranteId } = req.body;

      if (!usuarioId || isNaN(restauranteId)) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const usuario = await UsuarioMongo.findOne({ id: usuarioId });
      const restaurante = await RestauranteMongo.findOne({ id: restauranteId });

      if (!usuario || !restaurante) {
        return res.status(404).json({ error: "Usuário ou restaurante não encontrado" });
      }

      await UsuarioMongo.updateOne(
        { id: usuarioId },
        { $addToSet: { restaurantes: restauranteId } }
      );

      return res.status(201).json({ message: "Restaurante vinculado com sucesso" });
    } catch (error) {
      console.error("Erro ao vincular restaurante:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await UsuarioMongo.find();

      const usuariosComRestaurantes = await Promise.all(
        usuarios.map(async (usuario) => {
          const restaurantes = await RestauranteMongo.find({
            id: { $in: usuario.restaurantes || [] }
          });

          return {
            ...usuario.toObject(),
            restaurantes: restaurantes.map(r => r.toObject())
          };
        })
      );

      return res.json(usuariosComRestaurantes);
    } catch (error) {
      console.error("Erro ao listar vínculos:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },

  async desvincular(req, res) {
    try {
      const { usuarioId, restauranteId } = req.body;

      if (!usuarioId || isNaN(restauranteId)) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const usuario = await UsuarioMongo.findOne({ id: usuarioId });

      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await UsuarioMongo.updateOne(
        { id: usuarioId },
        { $pull: { restaurantes: restauranteId } }
      );

      return res.status(200).json({ message: "Restaurante desvinculado com sucesso" });
    } catch (error) {
      console.error("Erro ao desvincular restaurante:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
};
