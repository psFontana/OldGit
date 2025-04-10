module.exports = (sequelize, Sequelize) => {
  const produto = sequelize.define("produto", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return produto;
};
