module.exports = (allowedProfiles) => {
  return (req, res, next) => {
    const user = req.session.usuario;

    if (!user) {
      return res.redirect("/login");
    }

    if (!allowedProfiles.includes(user.perfil)) {
      return res.status(403).send("Acesso negado.");
    }

    next();
  };
};
