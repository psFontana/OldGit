const db = require("../../config/db_sequelize");
const { gerarToken } = require("../../middlewares/authToken");
const UsuarioNoSQL = require("../../models/noSql/usuario");

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email, senha } });

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const token = gerarToken(usuario);

    res.json({
      token,
      perfil: usuario.perfil,
    });
  },

  async listar(req, res) {
    const usuarios = await db.Usuario.findAll();
    res.json(usuarios);
  },

  async criar(req, res) {
    try {
      const novo = await db.Usuario.create(req.body);

      // Criação no MongoDB
      await UsuarioNoSQL.create({
        id: novo.id,
        nome: novo.nome,
        nascimento: novo.nascimento,
        email: novo.email,
        senha: novo.senha,
        perfil: novo.perfil,
        enderecos: [],
        restaurantes: [],
      });

      res.status(201).json(novo);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ erro: "Erro interno ao criar usuário" });
    }
  },

  async detalhar(req, res) {
    const usuario = await db.Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
  },

  async atualizar(req, res) {
    const atualizado = await db.Usuario.update(req.body, {
      where: { id: req.params.id },
    });

    // Atualiza também no MongoDB
    await UsuarioNoSQL.updateOne({ id: req.params.id }, req.body);

    res.json({ atualizado });
  },

  async excluir(req, res) {
    await db.Usuario.destroy({ where: { id: req.params.id } });
    await UsuarioNoSQL.deleteOne({ id: req.params.id });

    res.status(204).send();
  },
};
