const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/usuarioRestaurante");
const auth = require("../../middlewares/authToken");

router.get("/", auth.verificarToken, controller.listar);
router.post("/", auth.verificarToken, controller.vincular);
router.put("/:usuarioId", auth.verificarToken, controller.atualizarVinculos);
router.delete(
  "/:usuarioId/:restauranteId",
  auth.verificarToken,
  controller.desvincular
);

module.exports = router;
