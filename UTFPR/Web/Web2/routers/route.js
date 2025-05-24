const express = require("express");
const route = express.Router();

// Controllers
const controllerUsuario = require("../controllers/controllerUsuario.js");
const controllerRestaurante = require("../controllers/controllerRestaurante.js");
const controllerPrato = require("../controllers/controllerPrato.js");
const controllerEnderecos = require("../controllers/controllerEnderecos.js");
const controllerPedido = require("../controllers/controllerPedido.js");
const controllerFavorito = require("../controllers/controllerFavoritos.js");
const controllerUsuarioEndereco = require("../controllers/controllerUsuarioEndereco.js");

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

route.get("/home", function (req, res) {
  if (req.session.login) {
    res.render("home");
  } else res.redirect("/");
});

// ---------- Usuário ----------
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);

route.get("/usuarioList", controllerUsuario.getList);

route.get("/usuarioUpdate/:id", controllerUsuario.getUpdate);
route.post("/usuarioUpdate", controllerUsuario.postUpdate);

route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

// ---------- Restaurante ----------
route.get("/restauranteList", controllerRestaurante.getList);
route.get("/restauranteCreate", controllerRestaurante.getCreate);
route.post("/restauranteCreate", controllerRestaurante.postCreate);
route.get("/restauranteDelete/:id", controllerRestaurante.getDelete);
route.get("/restauranteUpdate/:id", controllerRestaurante.getUpdate);
route.post("/restauranteUpdate", controllerRestaurante.postUpdate);

// ---------- Prato ----------
route.get("/pratoList", controllerPrato.getList);
route.get("/pratoCreate", controllerPrato.getCreate);
route.post("/pratoCreate", controllerPrato.postCreate);
route.get("/pratoDelete/:id", controllerPrato.getDelete);

// ---------- Endereço ----------
route.get("/enderecosList", controllerEnderecos.getList);
route.get("/enderecosCreate", controllerEnderecos.getCreate);
route.post("/enderecosCreate", controllerEnderecos.postCreate);
route.get("/enderecosUpdate/:id", controllerEnderecos.getUpdate);
route.post("/enderecosUpdate", controllerEnderecos.postUpdate);
route.get("/enderecosDelete/:id", controllerEnderecos.getDelete);

// ---------- Pedido ----------
route.get("/pedidoList", controllerPedido.getList);
route.get("/pedidoCreate", controllerPedido.getCreate);
route.post("/pedidoCreate", controllerPedido.postCreate);
route.get("/pedidoUpdate/:id", controllerPedido.getUpdate);
route.post("/pedidoUpdate", controllerPedido.postUpdate);
route.get("/pedidoDelete/:id", controllerPedido.getDelete);

// ---------- Favorito ----------
route.get("/favoritosList", controllerFavorito.getList);
route.get("/favoritosCreate", controllerFavorito.getCreate);
route.post("/favoritosCreate", controllerFavorito.postCreate);
route.get("/favoritosUpdate/:id", controllerFavorito.getUpdate);
route.post("/favoritosUpdate", controllerFavorito.postUpdate);
route.get("/favoritosDelete/:id", controllerFavorito.getDelete);

// ---------- Usuario Endereco ----------
route.get("/usuarioEnderecoList", controllerUsuarioEndereco.getList);
route.get("/usuarioEnderecoCreate", controllerUsuarioEndereco.getCreate);
route.post("/usuarioEnderecoCreate", controllerUsuarioEndereco.postCreate);
route.get("/usuarioEnderecoUpdate/:id", controllerUsuarioEndereco.getUpdate);
route.post("/usuarioEnderecoUpdate", controllerUsuarioEndereco.postUpdate);
route.get("/usuarioEnderecoDelete/:id", controllerUsuarioEndereco.getDelete);

module.exports = route;
