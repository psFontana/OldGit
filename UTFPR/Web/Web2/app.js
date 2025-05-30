const db = require("./config/db_sequelize"); // Importar o db
const mongoose = require("./config/db_mongoose");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const sessionControl = require("./middlewares/sessionControl");
const routes = require("./routers/route");
const express = require("express");
const app = express();

app.engine("handlebars", handlebars.engine());

app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: "seilaman", cookie: { maxAge: 30 * 60 * 1000 } }));

app.use(sessionControl);
app.use(routes);

// Sincronizar modelos com o banco de dados, FORÇANDO a recriação
db.sequelize
  .sync()
  .then(async () => {
    console.log("🟢 Banco sincronizado.");

    const UsuarioModel = db.Usuario;

    // Verifica se já existe um admin
    const adminExistente = await UsuarioModel.findOne({
      where: { email: "admin@admin.com" },
    });

    if (!adminExistente) {
      await UsuarioModel.create({
        nome: "Administrador",
        nascimento: new Date(2005, 4, 27),
        email: "admin@admin.com",
        senha: "admin",
        perfil: "admin",
      });
      console.log("🔐 Usuário admin criado com sucesso!");
    } else {
      console.log("🔐 Usuário admin já existe.");
    }

    app.listen(8081, () => {
      console.log("Servidor no http://localhost:8081");
      console.log("Estado do Mongoose:", mongoose.connection.readyState);
    });
  })
  .catch((err) => {
    console.error("🔴 Erro ao sincronizar banco: ", err);
  });
