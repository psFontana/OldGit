const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");

const db = require("./config/db_sequelize");
const mongoose = require("./config/db_mongoose");

// Importar model Usuario Sequelize
const UsuarioModel = db.Usuario;

// Middlewares
const sessionControl = require("./middlewares/sessionControl");

// Rotas da API
const usuarioRoutes = require("./routers/api/usuario");
const enderecoRoutes = require("./routers/api/endereco");
const favoritoRoutes = require("./routers/api/favorito");
const pedidoRoutes = require("./routers/api/pedido");
const pratoRoutes = require("./routers/api/prato");
const restauranteRoutes = require("./routers/api/restaurante");
const usuarioEnderecoRoutes = require("./routers/api/usuarioEndereco");
const usuarioRestauranteRoutes = require("./routers/api/usuarioRestaurante");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

const app = express();

// Middleware padrão
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "seilaman",
    cookie: { maxAge: 30 * 60 * 1000 }, // 30 minutos
    resave: false,
    saveUninitialized: true,
  })
);

// Rotas da API
app.use("/api/usuario", usuarioRoutes);
app.use("/api/endereco", enderecoRoutes);
app.use("/api/favorito", favoritoRoutes);
app.use("/api/pedido", pedidoRoutes);
app.use("/api/prato", pratoRoutes);
app.use("/api/restaurante", restauranteRoutes);
app.use("/api/usuarioEndereco", usuarioEnderecoRoutes);
app.use("/api/usuarioRestaurante", usuarioRestauranteRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function criarAdminSeNaoExistir() {
  try {
    const adminExistente = await UsuarioModel.findOne({
      where: { perfil: "admin" },
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
  } catch (error) {
    console.error("Erro ao verificar/criar usuário admin:", error);
  }
}

db.sequelize
  .sync()
  .then(async () => {
    console.log("🟢 Banco sincronizado.");

    await criarAdminSeNaoExistir();

    app.listen(8081, () => {
      console.log("Servidor no http://localhost:8081");
      console.log("Estado do Mongoose:", mongoose.connection.readyState);
    });
  })
  .catch((err) => {
    console.error("🔴 Erro ao sincronizar banco: ", err);
  });
