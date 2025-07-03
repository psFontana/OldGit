const Sequelize = require('sequelize');
const sequelize = new Sequelize('Web2_PF', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models (relacionais)
db.Enderecos = require('../models/relational/enderecos.js')(sequelize, Sequelize);
db.Favoritos = require('../models/relational/favoritos.js')(sequelize, Sequelize);
db.Pedido = require('../models/relational/pedido.js')(sequelize, Sequelize);
db.Prato = require('../models/relational/prato.js')(sequelize, Sequelize);
db.Restaurante = require('../models/relational/restaurante.js')(sequelize, Sequelize);
db.UsuarioEndereco = require('../models/relational/usuario_endereco.js')(sequelize, Sequelize);
db.Usuario = require('../models/relational/usuario.js')(sequelize, Sequelize);

// Associações
db.Usuario.belongsToMany(db.Enderecos, { through: db.UsuarioEndereco, foreignKey: 'id_usuario', otherKey: 'id_endereco', as: 'enderecos' });

db.Enderecos.belongsToMany(db.Usuario, { through: db.UsuarioEndereco, foreignKey: 'id_endereco', otherKey: 'id_usuario', as: 'usuarios' });

db.Usuario.hasMany(db.Pedido, { foreignKey: 'id_usuario', as: 'pedidos' });

db.Pedido.belongsTo(db.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

db.Restaurante.hasMany(db.Pedido, { foreignKey: 'id_restaurante', as: 'pedidos' });

db.Pedido.belongsTo(db.Restaurante, { foreignKey: 'id_restaurante', as: 'restaurante' });

db.Restaurante.hasMany(db.Prato, { foreignKey: 'id_restaurante', as: 'pratos' });

db.Prato.belongsTo(db.Restaurante, { foreignKey: 'id_restaurante', as: 'restaurante' });

db.Usuario.hasMany(db.Favoritos, { foreignKey: 'id_usuario', as: 'favoritos' });

db.Favoritos.belongsTo(db.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });

db.Restaurante.hasMany(db.Favoritos, { foreignKey: 'id_restaurante', as: 'favoritos' });

db.Favoritos.belongsTo(db.Restaurante, { foreignKey: 'id_restaurante', as: 'restaurante' });

module.exports = db;
