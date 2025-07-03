const db = require("../../config/db_sequelize");
const { gerarToken } = require("../../middlewares/authToken");

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;
    const usuario = await db.Usuario.findOne({ where: { email, senha } });

    // Se o usuário não for encontrado ou as credenciais forem inválidas, retorna erro 401.
    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Gera o token JWT usando as informações do usuário (id e perfil).
    const token = gerarToken(usuario);

    // Retorna o token e, CRITICAMENTE, o perfil do usuário na resposta JSON.
    // Isso permite que o frontend salve o perfil no localStorage.
    res.json({
      token,
      perfil: usuario.perfil, // <-- Adicionado: Envia o perfil do usuário para o frontend
    });
  },

  async listar(req, res) {
    // Lista todos os usuários.
    const usuarios = await db.Usuario.findAll();
    res.json(usuarios);
  },

  async criar(req, res) {
    // Cria um novo usuário com os dados do corpo da requisição.
    const novo = await db.Usuario.create(req.body);
    res.status(201).json(novo);
  },

  async detalhar(req, res) {
    // Busca um usuário pelo ID.
    const usuario = await db.Usuario.findByPk(req.params.id);
    // Se o usuário não for encontrado, retorna erro 404.
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
  },

  async atualizar(req, res) {
    // Atualiza um usuário existente pelo ID com os dados do corpo da requisição.
    const atualizado = await db.Usuario.update(req.body, {
      where: { id: req.params.id },
    });
    // Retorna o status da atualização (número de linhas afetadas).
    res.json({ atualizado });
  },

  async excluir(req, res) {
    // Exclui um usuário pelo ID.
    await db.Usuario.destroy({ where: { id: req.params.id } });
    // Retorna status 204 (No Content) indicando sucesso sem conteúdo.
    res.status(204).send();
  },
};
