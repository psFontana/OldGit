const db = require("../../config/db_sequelize");
const RestauranteMongo = require("../../models/noSql/restaurante");
const Restaurante = db.Restaurante;
const UsuarioMongo = require("../../models/noSql/usuario");

module.exports = {
  async listar(req, res) {
    try {
      const dados = await Restaurante.findAll();
      res.status(200).json(dados);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar restaurantes" });
    }
  },

  async obter(req, res) {
    try {
      const dado = await Restaurante.findByPk(req.params.id);
      if (!dado) return res.status(404).json({ erro: "Não encontrado" });
      res.status(200).json(dado);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar restaurante" });
    }
  },

  async criar(req, res) {
    try {
      console.log("Dados recebidos no body:", req.body);
      console.log("Usuário autenticado:", req.usuario);

      const novo = await Restaurante.create(req.body);

      await RestauranteMongo.create({
        id: novo.id,
        nome: novo.nome,
        pratos: [],
      });

      // Se o perfil for "dono", vincula automaticamente o restaurante
      if (req.usuario.perfil === "dono") {
        const usuario = await UsuarioMongo.findOne({ id: req.usuario.id });
        if (usuario) {
          usuario.restaurantes = [...(usuario.restaurantes || []), novo.id];
          await usuario.save();
        }
      }

      res.status(201).json(novo);
    } catch (err) {
      console.error(err);
      res.status(400).json({ erro: "Erro ao criar restaurante" });
    }
  },

  async atualizar(req, res) {
    try {
      const atualizado = await Restaurante.update(req.body, {
        where: { id: req.params.id },
      });

      await RestauranteMongo.updateOne({ id: req.params.id }, req.body);

      res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (err) {
      res.status(400).json({ erro: "Erro ao atualizar restaurante" });
    }
  },

  async excluir(req, res) {
    try {
      await Restaurante.destroy({ where: { id: req.params.id } });
      await RestauranteMongo.deleteOne({ id: req.params.id });

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao excluir restaurante" });
    }
  },
};
