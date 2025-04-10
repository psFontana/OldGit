const Sequelize = require("sequelize");
const sequelize = new Sequelize("web2", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Pessoa = require("./pessoa.js")(sequelize, Sequelize);
db.Compra = require("./compra.js")(sequelize, Sequelize);
db.Produto = require("./produto.js")(sequelize, Sequelize);
db.ItemCompra = require("./itemcompra.js")(sequelize, Sequelize);

db.Pessoa.hasMany(db.Compra);
db.Compra.belongsToMany(db.Produto, { through: db.ItemCompra });

module.exports = sequelize;
