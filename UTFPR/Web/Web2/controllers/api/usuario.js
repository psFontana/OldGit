const db = require("../../config/db_sequelize");
const { gerarToken } = require("../../middlewares/authToken");

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email, senha } });
    if (!usuario) return res.status(401).json({ erro: "Credenciais inválidas" });

    const token = gerarToken(usuario);
    res.json({ token });
  },

  async listar(req, res) {
    const usuarios = await db.Usuario.findAll();
    res.json(usuarios);
  },

  async criar(req, res) {
    const novo = await db.Usuario.create(req.body);
    res.status(201).json(novo);
  },

  async detalhar(req, res) {
    const usuario = await db.Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  },

  async atualizar(req, res) {
    const atualizado = await db.Usuario.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ atualizado });
  },

  async excluir(req, res) {
    await db.Usuario.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  }
};
