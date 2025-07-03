const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/prato");
const auth = require("../../middlewares/authToken");

router.post("/", auth.verificarToken, controller.criar);
router.get("/", auth.verificarToken, controller.listar);
router.get("/:id", auth.verificarToken, controller.detalhar);
router.put("/:id", auth.verificarToken, controller.atualizar);
router.delete("/:id", auth.verificarToken, controller.excluir);

module.exports = router;
