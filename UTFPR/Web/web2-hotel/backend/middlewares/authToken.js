const jwt = require("jsonwebtoken");
const SECRET = "seuSegredoSuperSeguro"; // Ideal: use process.env.JWT_SECRET

module.exports = {
  gerarToken(usuario) {
    return jwt.sign({ id: usuario.id, perfil: usuario.perfil }, SECRET, {
      expiresIn: "2h",
    });
  },

  verificarToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ erro: "Token não fornecido" });

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ erro: "Token inválido" });
      req.usuario = decoded;
      next();
    });
  },

  isLogado(req, res, next) {
    module.exports.verificarToken(req, res, next);
  },

  isAdmin(req, res, next) {
    module.exports.verificarToken(req, res, () => {
      if (req.usuario.perfil === "admin") {
        next();
      } else {
        res.status(403).json({ erro: "Acesso restrito a administradores" });
      }
    });
  },

  isDono(req, res, next) {
    module.exports.verificarToken(req, res, () => {
      if (req.usuario.perfil === "dono" || req.usuario.perfil === "admin") {
        next();
      } else {
        res
          .status(403)
          .json({ erro: "Acesso restrito a donos de restaurante" });
      }
    });
  },

  isCliente(req, res, next) {
    module.exports.verificarToken(req, res, () => {
      if (req.usuario.perfil === "cliente") {
        next();
      } else {
        res.status(403).json({ erro: "Acesso restrito a clientes" });
      }
    });
  },
};
