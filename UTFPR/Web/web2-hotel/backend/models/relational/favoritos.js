module.exports = (sequelize, Sequelize) => {
  const Favoritos = sequelize.define('favoritos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, allowNull: false, primaryKey: true
    },
    id_usuario: {
      type: Sequelize.INTEGER, allowNull: false,
      references: { model: 'usuarios', key: 'id' }
    },
    id_restaurante: {
      type: Sequelize.INTEGER, allowNull: false,
      references: { model: 'restaurantes', key: 'id' }
    }
  }, {
    timestamps: false
  });
  return Favoritos;
}
