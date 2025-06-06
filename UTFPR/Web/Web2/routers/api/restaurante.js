const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/restaurante");
const auth = require("../../middlewares/authToken");

// Rotas da API para Restaurante
router.get("/", auth.isLogado, controller.listar); // Lista todos os restaurantes
router.get("/:id", auth.isLogado, controller.obter); // Obtém um restaurante específico
router.post("/", auth.isAdmin, controller.criar); // Cria um novo restaurante
router.put("/:id", auth.isAdmin, controller.atualizar); // Atualiza um restaurante existente
router.delete("/:id", auth.isAdmin, controller.excluir); // Exclui um restaurante

module.exports = router;
