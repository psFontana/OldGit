const UsuarioMongo = require("../../models/noSql/usuario");
const RestauranteMongo = require("../../models/noSql/restaurante");

module.exports = {
  // GET /usuarioRestaurante
  async listar(req, res) {
    try {
      const usuarios = await UsuarioMongo.find();
      const usuariosComRestaurantes = await Promise.all(
        usuarios.map(async (usuario) => {
          const restaurantes = await RestauranteMongo.find({
            id: { $in: usuario.restaurantes || [] },
          });
          return {
            ...usuario.toObject(),
            restaurantes: restaurantes.map((r) => r.toObject()),
          };
        })
      );
      return res.json(usuariosComRestaurantes);
    } catch (error) {
      console.error("Erro ao listar vínculos:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },

  // POST /usuarioRestaurante
  async vincular(req, res) {
    try {
      const { usuarioId, restauranteId } = req.body;

      if (!usuarioId || isNaN(usuarioId) || isNaN(restauranteId)) {
        return res.status(400).json({ error: "IDs inválidos" });
      }

      const usuario = await UsuarioMongo.findOne({ id: Number(usuarioId) });
      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      const restaurante = await RestauranteMongo.findOne({
        id: Number(restauranteId),
      });
      if (!restaurante)
        return res.status(404).json({ error: "Restaurante não encontrado" });

      // Evita duplicatas
      if (!usuario.restaurantes.includes(restaurante.id)) {
        usuario.restaurantes.push(restaurante.id);
        await usuario.save();
      }

      return res
        .status(201)
        .json({ message: "Restaurante vinculado com sucesso" });
    } catch (error) {
      console.error("Erro ao vincular restaurante:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },

  // PUT /usuarioRestaurante/:usuarioId
  async atualizarVinculos(req, res) {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const { restaurantes } = req.body;

      if (!usuarioId || !Array.isArray(restaurantes)) {
        return res.status(400).json({ error: "Dados inválidos" });
      }

      const usuario = await UsuarioMongo.findOne({ id: usuarioId });
      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      const validos = await RestauranteMongo.find({
        id: { $in: restaurantes },
      });
      if (validos.length !== restaurantes.length)
        return res
          .status(404)
          .json({ error: "Alguns restaurantes não existem" });

      usuario.restaurantes = restaurantes;
      await usuario.save();

      return res
        .status(200)
        .json({ message: "Vínculos atualizados com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar vínculos:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },

  // DELETE /usuarioRestaurante/:usuarioId/:restauranteId
  async desvincular(req, res) {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const restauranteId = Number(req.params.restauranteId);

      const usuario = await UsuarioMongo.findOne({ id: usuarioId });
      if (!usuario)
        return res.status(404).json({ error: "Usuário não encontrado" });

      usuario.restaurantes = usuario.restaurantes.filter(
        (id) => id !== restauranteId
      );
      await usuario.save();

      return res
        .status(200)
        .json({ message: "Restaurante desvinculado com sucesso" });
    } catch (error) {
      console.error("Erro ao desvincular restaurante:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  },
};
