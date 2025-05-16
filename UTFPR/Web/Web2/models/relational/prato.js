module.exports = (sequelize, Sequelize) => {
  const Prato = sequelize.define('prato', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, allowNull: false, primaryKey: true
    },
    nome: {
      type: Sequelize.STRING, allowNull: false
    },
    preco: {
      type: Sequelize.FLOAT, allowNull: false
    },
    id_restaurante: {
      type: Sequelize.INTEGER, allowNull: false,
      references: { model: 'restaurantes', key: 'id' }
    }
  }, {
    timestamps: false
  });
  return Prato;
}
