const sequelize = require("./db.js"); // Importando sua configuração

sequelize
  .sync({ force: true }) // Use 'force: true' apenas se você estiver OK com a recriação das tabelas.
  .then(() => {
    console.log("Tabelas criadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao criar tabelas:", error);
  });
