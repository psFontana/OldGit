const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const db = require("./config/db_sequelize");
const mongoose = require("./config/db_mongoose");
const sessionControl = require("./middlewares/sessionControl");
const routes = require("./routers/route");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const rotaApiUsuario = require("./routers/api/usuario");
const rotaApiRestaurante = require("./routers/api/restaurante");
const rotaApiPedido = require("./routers/api/pedido");
const rotaApiEndereco = require("./routers/api/endereco");
const rotaApiFavorito = require("./routers/api/favorito");
const rotaApiPrato = require("./routers/api/prato");
const rotaApiUsuarioEndereco = require("./routers/api/usuarioEndereco");
const rotaApiUsuarioRestaurante = require("./routers/api/usuarioRestaurante");

const app = express();

// Configuração do Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Middlewares essenciais para API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", rotaApiUsuario);
app.use("/api/restaurante", rotaApiRestaurante);
app.use("/api/pedido", rotaApiPedido);
app.use("/api/endereco", rotaApiEndereco);
app.use("/api/favorito", rotaApiFavorito);
app.use("/api/prato", rotaApiPrato);
app.use("/api/usuarioEndereco", rotaApiUsuarioEndereco);
app.use("/api/usuarioRestaurante", rotaApiUsuarioRestaurante);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares para sessão
app.use(cookieParser());
app.use(session({
  secret: "seilaman",
  cookie: { maxAge: 30 * 60 * 1000 },
  resave: false,
  saveUninitialized: true
}));

// Middlewares das rotas web com proteção de sessão
app.use(sessionControl);
app.use(routes);

// Sincronização com Sequelize
db.sequelize
  .sync()
  .then(async () => {
    console.log("🟢 Banco sincronizado.");

    const UsuarioModel = db.Usuario;

    const adminExistente = await UsuarioModel.findOne({
      where: { email: "admin@admin.com" },
    });

    if (!adminExistente) {
      await UsuarioModel.create({
        nome: "Administrador",
        nascimento: new Date(2005, 4, 27),
        email: "admin@admin.com",
        senha: "admin", // Em produção, use hash
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
