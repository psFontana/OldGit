module.exports = (sequelize, Sequelize) => {
  const compra = sequelize.define("compra", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    valor_total: Sequelize.DOUBLE,
  });
  return compra;
};
