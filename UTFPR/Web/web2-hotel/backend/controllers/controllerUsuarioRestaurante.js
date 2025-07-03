const UsuarioMongo = require('../models/noSql/usuario');
const RestauranteMongo = require('../models/noSql/restaurante');

module.exports = {
  async getCreate(req, res) {
    res.render('usuarioRestaurante/usuarioRestauranteCreate');
  },

  async postCreate(req, res) {
    try {
      const usuarioId = req.body.usuarioId;
      const restauranteId = Number(req.body.restauranteId);

      if (isNaN(restauranteId)) {
        return res.status(400).send('ID do restaurante inválido');
      }

      const restauranteExists = await RestauranteMongo.findOne({ id: restauranteId });
      if (!restauranteExists) {
        return res.status(404).send('Restaurante não encontrado');
      }

      await UsuarioMongo.updateOne(
        { id: usuarioId },
        { $addToSet: { restaurantes: restauranteId } }
      );

      res.redirect('/usuarioRestauranteList');
    } catch (error) {
      console.error('Erro ao adicionar restaurante ao usuário:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getList(req, res) {
    try {
      const usuariosMongo = await UsuarioMongo.find();

      const usuariosComRestaurantes = await Promise.all(
        usuariosMongo.map(async (usuario) => {
          const restaurantes = await RestauranteMongo.find({
            id: { $in: usuario.restaurantes || [] }
          });

          return {
            ...usuario.toObject(),
            restaurantes: restaurantes.map(r => r.toObject())
          };
        })
      );

      res.render('usuarioRestaurante/usuarioRestauranteList', {
        usuariosMongo: usuariosComRestaurantes
      });
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).send('Erro interno');
    }
  },

  async getDelete(req, res) {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const restauranteId = Number(req.params.restauranteId);
      const userLogado = req.session.usuario;

      if (!userLogado) {
        return res.status(401).send('Usuário não autenticado');
      }

      const usuarioAlvo = await UsuarioMongo.findOne({ id: usuarioId });
      const restaurante = await RestauranteMongo.findOne({ id: restauranteId });

      if (!usuarioAlvo || !restaurante) {
        return res.status(404).send('Usuário ou restaurante não encontrado');
      }


      if (userLogado.perfil === 'admin') {
        await UsuarioMongo.updateOne(
          { id: usuarioId },
          { $pull: { restaurantes: restauranteId } }
        );
        return res.redirect('/usuarioRestauranteList');
      }


      if (userLogado.perfil === 'dono' && restaurante.usuarioId === userLogado.id) {
        await UsuarioMongo.updateOne(
          { id: usuarioId },
          { $pull: { restaurantes: restauranteId } }
        );
        return res.redirect('/usuarioRestauranteList');
      }

      return res.status(403).send('Você não tem permissão para remover este restaurante');
    } catch (error) {
      console.error('Erro ao deletar restaurante:', error);
      res.status(500).send('Erro interno');
    }
  },


  async getUpdate(req, res) {
    try {
      const usuarioId = req.params.id;
      const usuarioDoc = await UsuarioMongo.findOne({ id: usuarioId });

      if (usuarioDoc) {
        const usuario = usuarioDoc.toObject(); // <-- ESSENCIAL
        res.render('usuarioRestaurante/usuarioRestauranteUpdate', { usuario });
      } else {
        res.redirect('/usuarioRestauranteList');
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      res.status(500).send('Erro interno');
    }
  }
  ,

  async postUpdate(req, res) {
    try {
      const usuarioId = req.body.id;
      const restaurantesString = req.body.restaurantes || '';
      const restaurantesArray = restaurantesString
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => !isNaN(id));

      await UsuarioMongo.updateOne(
        { id: usuarioId },
        {
          $set: {
            restaurantes: restaurantesArray
          }
        }
      );

      res.redirect('/usuarioRestauranteList');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).send('Erro interno');
    }
  }
};
