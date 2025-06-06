const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/usuarioEndereco");
const auth = require("../../middlewares/authToken");

router.post("/", auth.verificarToken, controller.criar);
router.get("/", auth.verificarToken, controller.listar);
router.delete("/:id", auth.verificarToken, controller.excluir);

module.exports = router;
