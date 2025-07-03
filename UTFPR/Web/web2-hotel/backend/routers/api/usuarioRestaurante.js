const express = require("express");
const router = express.Router();
const controller = require("../../controllers/api/usuarioRestaurante");
const auth = require("../../middlewares/authToken");

router.post("/vincular", auth.verificarToken, controller.vincular);
router.post("/desvincular", auth.verificarToken, controller.desvincular);
router.get("/", auth.verificarToken, controller.listar);

module.exports = router;
