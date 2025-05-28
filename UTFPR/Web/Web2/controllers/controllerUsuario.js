const db = require("../config/db_sequelize");
const UsuarioNoSQL = require("../models/noSql/usuario");

module.exports = {
  // Página de login
  async getLogin(req, res) {
    res.render("usuario/login", { layout: "noMenu.handlebars" });
  },

  // Ação de login
  // Cookies:
  // async postLogin(req, res) {
  //   var user = {
  //     email: req.body.email,
  //   };
  //   db.Usuario.findAll({
  //     where: { email: req.body.email, senha: req.body.senha },
  //   })
  //     .then((usuarios) => {
  //       if (usuarios.length > 0) {
  //         res.cookie("userData", user, {
  //           maxAge: 30 * 60 * 1000,
  //           httpOnly: true,
  //         });
  //         res.render("home");
  //       } else res.redirect("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },

  async postLogin(req, res) {
    let user = {
      email: req.body.email,
    };
    db.Usuario.findAll({
      where: { email: req.body.email, senha: req.body.senha },
    })
      .then((usuarios) => {
        if (usuarios.length > 0) {
          req.session.login = req.body.email;
          res.render("home");
        } else res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  // Cookies:
  // async getLogout(req, res) {
  //   res.cookie("userData", ,
  //       req.cookies.userData,
  //     { maxAge: 0, httpOnly: true });
  //     resredirect("/");
  // },

  async getLogout(req, res) {
    req.session.destroy();
    res.redirect("/");
  },

  // Página de cadastro
  async getCreate(req, res) {
    res.render("usuario/usuarioCreate");
  },

  // Ação de criação
  async postCreate(req, res) {
    try {
      // Cria no relacional
      const novoUsuario = await db.Usuario.create(req.body);

      // Cria no NoSQL usando o mesmo id
      await UsuarioNoSQL.create({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        nascimento: novoUsuario.nascimento,
        email: novoUsuario.email,
        senha: novoUsuario.senha,
        enderecos: [],
        restaurantes: [],
      });

      res.redirect("/usuarioList");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).send("Erro interno");
    }
  },

  // Listagem de usuários
  async getList(req, res) {
    try {
      const usuarios = await db.Usuario.findAll();
      res.render("usuario/usuarioList", {
        usuarios: usuarios.map((user) => user.toJSON()),
      });
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
      res.status(500).send("Erro interno ao listar usuários");
    }
  },

  // Página de edição
  async getUpdate(req, res) {
    try {
      const usuario = await db.Usuario.findByPk(req.params.id);
      if (usuario) {
        const usuarioData = usuario.toJSON();

        // Formata a data para input type="date"
        if (usuarioData.nascimento) {
          usuarioData.nascimento = new Date(usuarioData.nascimento)
            .toISOString()
            .split("T")[0];
        }

        res.render("usuario/usuarioUpdate", { usuario: usuarioData });
      } else {
        res.redirect("/usuarioList");
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      res.status(500).send("Erro interno");
    }
  },

  // Ação de atualização
  async postUpdate(req, res) {
    try {
      const dadosAtualizados = {
        nome: req.body.nome,
        email: req.body.email,
        nascimento: req.body.nascimento,
        perfil: req.body.perfil,
      };

      // Só atualiza a senha se ela for preenchida
      if (req.body.senha && req.body.senha.trim() !== "") {
        dadosAtualizados.senha = req.body.senha;
      }

      await db.Usuario.update(dadosAtualizados, {
        where: { id: req.body.id },
      });

      // Atualiza no NoSQL também
      await UsuarioNoSQL.updateOne({ id: req.body.id }, dadosAtualizados);

      res.redirect("/usuarioList");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).send("Erro interno");
    }
  },

  // Ação de exclusão
  async getDelete(req, res) {
    try {
      await db.Usuario.destroy({
        where: { id: req.params.id },
      });

      // Remove do NoSQL também
      await UsuarioNoSQL.deleteOne({ id: req.params.id });

      await db.sequelize.query(
        `ALTER SEQUENCE "public"."usuarios_id_seq" RESTART WITH 1;`
      );
      res.redirect("/usuarioList");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).send("Erro interno");
    }
  },
};
