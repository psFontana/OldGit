module.exports = (sequelize, Sequelize) => {
  const Pedido = sequelize.define('pedido', {
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
    },
    data: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return Pedido;
};
