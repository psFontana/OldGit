const express = require("express");
const router = express.Router();
const controller = require("../../../web2-hotel/backend/controllers/api/usuarioRestaurante");
const auth = require("../../../web2-hotel/backend/middlewares/authToken");

router.post("/vincular", auth.verificarToken, controller.vincular);
router.post("/desvincular", auth.verificarToken, controller.desvincular);
router.get("/", auth.verificarToken, controller.listar);

module.exports = router;
