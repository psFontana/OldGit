const express = require("express");
const router = express.Router();
const controller = require("../../../web2-hotel/backend/controllers/api/usuario");
const auth = require("../../../web2-hotel/backend/middlewares/authToken");

router.post("/login", controller.login);
router.get("/usuarios", auth.verificarToken, controller.listar);
router.post("/usuarios", auth.verificarToken, controller.criar);
router.get("/usuarios/:id", auth.verificarToken, controller.detalhar);
router.put("/usuarios/:id", auth.verificarToken, controller.atualizar);
router.delete("/usuarios/:id", auth.verificarToken, controller.excluir);

module.exports = router;
