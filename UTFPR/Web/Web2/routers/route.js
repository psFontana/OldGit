const express = require("express");
const route = express.Router();

// Middlewares
const sessionControl = require("../middlewares/sessionControl.js");
const accessControl = require("../middlewares/accessControl.js");

// Controllers
const controllerUsuario = require("../controllers/controllerUsuario.js");
const controllerRestaurante = require("../controllers/controllerRestaurante.js");
const controllerPrato = require("../controllers/controllerPrato.js");
const controllerEnderecos = require("../controllers/controllerEnderecos.js");
const controllerPedido = require("../controllers/controllerPedido.js");
const controllerFavorito = require("../controllers/controllerFavoritos.js");
const controllerUsuarioEndereco = require("../controllers/controllerUsuarioEndereco.js");
const controllerUsuarioRestaurante = require("../controllers/controllerUsuarioRestaurante.js");

// Redireciona raiz para login
route.get("/", (req, res) => res.redirect("/login"));

// Página de login
route.get("/login", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);

route.get("/logout", controllerUsuario.getLogout);

// Página home (após login) com menu
// Cookies:
// route.get("/home", function (req, res) {
//   if (req.cookies.controllerUsuarioEndereco) {
//     res.render("home");
//   } else res.redirect("/");
// });

// ---------- Home ----------
route.get("/home", sessionControl, (req, res) => {
  // Renderiza a página inicial com o layout apropriado
  res.render("home", { layout: res.locals.layout }); // Usa o layout definido no middleware
});

// ---------- Usuário ----------
route.get("/usuarioCreate", accessControl(["admin"]), controllerUsuario.getCreate);
route.post("/usuarioCreate", accessControl(["admin"]), controllerUsuario.postCreate);

route.get("/usuarioList", accessControl(["admin"]), controllerUsuario.getList);

route.get("/usuarioUpdate/:id", accessControl(["admin"]), controllerUsuario.getUpdate);
route.post("/usuarioUpdate", accessControl(["admin"]), controllerUsuario.postUpdate);

route.get("/usuarioDelete/:id", accessControl(["admin"]), controllerUsuario.getDelete);

// ---------- Restaurante ----------
route.get("/restauranteList", controllerRestaurante.getList);
route.get("/restauranteCreate", accessControl(["admin", "dono"]), controllerRestaurante.getCreate);
route.post("/restauranteCreate", accessControl(["admin", "dono"]), controllerRestaurante.postCreate);
route.get("/restauranteDelete/:id", accessControl(["admin", "dono"]), controllerRestaurante.getDelete);
route.get("/restauranteUpdate/:id", accessControl(["admin", "dono"]), controllerRestaurante.getUpdate);
route.post("/restauranteUpdate", accessControl(["admin", "dono"]), controllerRestaurante.postUpdate);

// ---------- Prato ----------
route.get("/pratoList", accessControl(["admin", "dono"]), controllerPrato.getList);
route.get("/pratoCreate", accessControl(["admin", "dono"]), controllerPrato.getCreate);
route.post("/pratoCreate", accessControl(["admin", "dono"]), controllerPrato.postCreate);
route.get("/pratoDelete/:id", accessControl(["admin", "dono"]), controllerPrato.getDelete);

// ---------- Endereço ----------
route.get("/enderecosList", accessControl(["admin", "dono"]), controllerEnderecos.getList);
route.get("/enderecosCreate", accessControl(["admin", "dono"]), controllerEnderecos.getCreate);
route.post("/enderecosCreate", accessControl(["admin", "dono"]), controllerEnderecos.postCreate);
route.get("/enderecosUpdate/:id", accessControl(["admin", "dono"]), controllerEnderecos.getUpdate);
route.post("/enderecosUpdate", accessControl(["admin", "dono"]), controllerEnderecos.postUpdate);
route.get("/enderecosDelete/:id", accessControl(["admin", "dono"]), controllerEnderecos.getDelete);

// ---------- Pedido ----------
route.get("/pedidoList", accessControl(["admin", "dono"]), controllerPedido.getList);
route.get("/pedidoCreate", accessControl(["admin", "dono"]), controllerPedido.getCreate);
route.post("/pedidoCreate", accessControl(["admin", "dono"]), controllerPedido.postCreate);
route.get("/pedidoUpdate/:id", accessControl(["admin", "dono"]), controllerPedido.getUpdate);
route.post("/pedidoUpdate", accessControl(["admin", "dono"]), controllerPedido.postUpdate);
route.get("/pedidoDelete/:id", accessControl(["admin", "dono"]), controllerPedido.getDelete);

// ---------- Favorito ----------
route.get("/favoritosList", accessControl(["admin", "dono"]), controllerFavorito.getList);
route.get("/favoritosCreate", accessControl(["admin", "dono"]), controllerFavorito.getCreate);
route.post("/favoritosCreate", accessControl(["admin", "dono"]), controllerFavorito.postCreate);
route.get("/favoritosUpdate/:id", accessControl(["admin", "dono"]), controllerFavorito.getUpdate);
route.post("/favoritosUpdate", accessControl(["admin", "dono"]), controllerFavorito.postUpdate);
route.get("/favoritosDelete/:id", accessControl(["admin", "dono"]), controllerFavorito.getDelete);

// ---------- Usuario Endereco ----------
route.get("/usuarioEnderecoList", accessControl(["admin", "dono"]), controllerUsuarioEndereco.getList);
route.get("/usuarioEnderecoCreate", accessControl(["admin", "dono"]), controllerUsuarioEndereco.getCreate);
route.post("/usuarioEnderecoCreate", accessControl(["admin", "dono"]), controllerUsuarioEndereco.postCreate);
route.get("/usuarioEnderecoUpdate/:id", accessControl(["admin", "dono"]), controllerUsuarioEndereco.getUpdate);
route.post("/usuarioEnderecoUpdate", accessControl(["admin", "dono"]), controllerUsuarioEndereco.postUpdate);
route.get("/usuarioEnderecoDelete/:id", accessControl(["admin", "dono"]), controllerUsuarioEndereco.getDelete);

// ---------- Usuario Restaurante ----------
route.get("/usuarioRestauranteList", accessControl(["admin", "dono"]), controllerUsuarioRestaurante.getList);
route.get("/usuarioRestauranteCreate", accessControl(["admin", "dono"]), controllerUsuarioRestaurante.getCreate);
route.post("/usuarioRestauranteCreate", accessControl(["admin", "dono"]), controllerUsuarioRestaurante.postCreate);
route.get("/usuarioRestauranteUpdate/:id", accessControl(["admin", "dono"]), controllerUsuarioRestaurante.getUpdate);
route.post("/usuarioRestauranteUpdate", accessControl(["admin", "dono"]), controllerUsuarioRestaurante.postUpdate);
route.get('/usuarioRestauranteDelete/:usuarioId/:restauranteId', accessControl(["admin", "dono"]), controllerUsuarioRestaurante.getDelete);

module.exports = route;
