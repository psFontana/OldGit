module.exports = (req, res, next) => {
  const user = req.session.usuario;
  const rotaPublica = ['/', '/login'].includes(req.path);

  if (!user && rotaPublica) return next();
  if (!user) return res.redirect('/login');

  // Define layout dinâmico
  switch (user.perfil) {
    case "admin":
      res.locals.layout = "adminMain";
      break;
    case "dono":
      res.locals.layout = "donoMain";
      break;
    case "cliente":
      res.locals.layout = "clienteMain";
      break;
    default:
      res.locals.layout = "main";
  }

  return next();
};