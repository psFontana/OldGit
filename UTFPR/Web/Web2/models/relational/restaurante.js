module.exports = (sequelize, Sequelize) => {
  const Restaurante = sequelize.define('restaurante', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true, allowNull: false, primaryKey: true
    },
    nome: {
      type: Sequelize.STRING, allowNull: false
    }
  }, {
    timestamps: true
  });
  return Restaurante;
}
