const express = require("express");
const route = express.Router();

// Controllers
const controllerUsuario = require("../controllers/api/usuario");
const controllerRestaurante = require("../controllers/api/restaurante");
const controllerPrato = require("../controllers/api/prato");
const controllerEnderecos = require("../controllers/api/endereco");
const controllerPedido = require("../controllers/api/pedido");
const controllerFavorito = require("../controllers/api/favorito");
const controllerUsuarioEndereco = require("../controllers/api/usuarioEndereco");
const controllerUsuarioRestaurante = require("../controllers/api/usuarioRestaurante");

// Rotas da API
route.post("/login", controllerUsuario.login);
route.get("/usuarios", controllerUsuario.listar);
route.post("/usuarios", controllerUsuario.criar);
route.get("/usuarios/:id", controllerUsuario.detalhar);
route.put("/usuarios/:id", controllerUsuario.atualizar);
route.delete("/usuarios/:id", controllerUsuario.excluir);

// Restaurante
route.get("/restaurante", controllerRestaurante.listar);
route.post("/restaurante", controllerRestaurante.criar);
route.get("/restaurante/:id", controllerRestaurante.obter);
route.put("/restaurante/:id", controllerRestaurante.atualizar);
route.delete("/restaurante/:id", controllerRestaurante.excluir);

// Pedido
route.post("/pedido", controllerPedido.criar);
route.get("/pedido", controllerPedido.listar);
route.get("/pedido/:id", controllerPedido.detalhar);
route.put("/pedido/:id", controllerPedido.atualizar);
route.delete("/pedido/:id", controllerPedido.excluir);

// Endereço
route.post("/endereco", controllerEnderecos.criar);
route.get("/endereco", controllerEnderecos.listar);
route.get("/endereco/:id", controllerEnderecos.detalhar);
route.put("/endereco/:id", controllerEnderecos.atualizar);
route.delete("/endereco/:id", controllerEnderecos.excluir);

// Favorito
route.post("/favorito", controllerFavorito.criar);
route.get("/favorito", controllerFavorito.listar);
route.delete("/favorito/:id", controllerFavorito.excluir);

// Prato
route.post("/prato", controllerPrato.criar);
route.get("/prato", controllerPrato.listar);
route.get("/prato/:id", controllerPrato.detalhar);
route.put("/prato/:id", controllerPrato.atualizar);
route.delete("/prato/:id", controllerPrato.excluir);

// Usuário Endereço
route.post("/usuarioEndereco", controllerUsuarioEndereco.criar);
route.get("/usuarioEndereco", controllerUsuarioEndereco.listar);
route.delete("/usuarioEndereco/:id", controllerUsuarioEndereco.excluir);

// Usuário Restaurante
route.post(
  "/usuarioRestaurante/vincular",
  controllerUsuarioRestaurante.vincular
);
route.post(
  "/usuarioRestaurante/desvincular",
  controllerUsuarioRestaurante.desvincular
);
route.get("/usuarioRestaurante", controllerUsuarioRestaurante.listar);

module.exports = route;
