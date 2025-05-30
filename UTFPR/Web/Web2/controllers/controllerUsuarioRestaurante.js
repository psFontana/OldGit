const mongoose = require('../config/db_mongoose');
const UsuarioMongo = require('../models/noSql/usuario');
const RestauranteMongo = require('../models/noSql/restaurante');

module.exports = {
  async getCreate(req, res) {
    res.render('usuarioRestaurante/usuarioRestauranteCreate');
  },

  async postCreate(req, res) {
  try {
    const usuarioId = req.body.usuarioId;
    const restauranteId = req.body.restauranteId;

    // Verificar se o restauranteId é um número
    if (isNaN(restauranteId)) {
      return res.status(400).send('ID do restaurante inválido');
    }

    // Converter o ID do restaurante para Number
    const restauranteNumberId = Number(restauranteId);

    // Verificar se o restaurante existe (opcional, mas recomendado)
    const restauranteExists = await RestauranteMongo.findOne({ id: restauranteNumberId });
    if (!restauranteExists) {
      return res.status(404).send('Restaurante não encontrado');
    }

    // Adicionar o ID do restaurante ao usuário
    await UsuarioMongo.updateOne(
      { id: usuarioId },
      { $addToSet: { restaurantes: restauranteNumberId } }
    );
    res.redirect('/restauranteList');
  } catch (error) {
    console.error('Erro ao adicionar restaurante ao usuário:', error);
    res.status(500).send('Erro interno');
  }
},

  async getList(req, res) {
    try {
      // Buscar todos os usuários do MongoDB e popular os restaurantes
      const usuariosMongo = await UsuarioMongo.find().populate('restaurantes');

      // Renderizar a lista de usuários do MongoDB
      res.render('usuarioRestaurante/usuarioRestauranteList', {
        usuariosMongo: usuariosMongo
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getDelete(req, res) {
    try {
      const usuarioId = req.user.id; // ID do usuário logado
      const restauranteId = req.params.id; // ID do restaurante a ser deletado

      const usuario = await UsuarioMongo.findOne({ id: usuarioId });

      if (!usuario) {
        return res.status(404).send('Usuário não encontrado');
      }

      if (req.user.perfil === 'admin') {
        await UsuarioMongo.updateOne(
          { id: usuarioId },
          { $pull: { restaurantes: restauranteId } }
        );
        return res.redirect('/usuarioRestauranteList');
      } else {
        if (usuario.restaurantes.includes(restauranteId)) {
          await UsuarioMongo.updateOne(
            { id: usuarioId },
            { $pull: { restaurantes: restauranteId } }
          );
          return res.redirect('/usuarioRestauranteList');
        } else {
          return res.status(403).send('Você não tem permissão para deletar este restaurante');
        }
      }
    } catch (error) {
      console.error('Erro ao deletar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getUpdate(req, res) {
    try {
      const usuarioId = req.params.id;
      const usuario = await UsuarioMongo.findOne({ id: usuarioId });

      if (usuario) {
        res.render('usuarioRestaurante/usuarioRestauranteUpdate', { usuario: usuario });
      } else {
        res.redirect('/usuarioRestauranteList');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      res.status(500).send('Erro interno');
    }
  },

  async postUpdate(req, res) {
    try {
      const usuarioId = req.body.usuarioId;

      await UsuarioMongo.updateOne({ id: usuarioId }, { $set: req.body });

      res.redirect('/usuarioRestauranteList');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro interno');
    }
  }
};
