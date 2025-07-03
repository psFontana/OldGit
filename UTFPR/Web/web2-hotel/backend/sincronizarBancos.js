const db = require("./config/db_sequelize");
const UsuarioSequelize = db.Usuario;
const RestauranteSequelize = db.Restaurante;

const mongoose = require("./config/db_mongoose");
const UsuarioMongo = require("./models/noSql/usuario");
const RestauranteMongo = require("./models/noSql/restaurante");

async function syncUsersAndRestaurants() {
  console.log("Iniciando script de sincronização de dados...");

  try {
    await db.sequelize.authenticate();
    console.log(
      "Conexão com o banco de dados relacional (Sequelize) estabelecida."
    );

    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        mongoose.connection.once("open", resolve);
        mongoose.connection.on("error", reject);
      });
    }
    console.log(
      "Conexão com o banco de dados não relacional (MongoDB) estabelecida."
    );

    console.log("\nSincronizando usuários...");
    const sequelizeUsers = await UsuarioSequelize.findAll();
    let usersSyncedCount = 0;

    for (const user of sequelizeUsers) {
      const existingMongoUser = await UsuarioMongo.findOne({ id: user.id });

      if (!existingMongoUser) {
        await UsuarioMongo.create({
          id: user.id,
          nome: user.nome,
          nascimento: user.nascimento,
          email: user.email,
          senha: user.senha,
          perfil: user.perfil,

          enderecos: [],
          restaurantes: [],
        });
        usersSyncedCount++;
        console.log(
          `  Usuário '${user.nome}' (ID: ${user.id}) criado no MongoDB.`
        );
      } else {
        await UsuarioMongo.updateOne(
          { id: user.id },
          {
            $set: {
              nome: user.nome,
              nascimento: user.nascimento,
              email: user.email,
              senha: user.senha,
              perfil: user.perfil,
            },
          }
        );
        console.log(
          `  Usuário '${user.nome}' (ID: ${user.id}) atualizado no MongoDB.`
        );
      }
    }
    console.log(
      `Sincronização de usuários concluída. ${usersSyncedCount} novos usuários criados.`
    );

    console.log("\nSincronizando restaurantes...");
    const sequelizeRestaurants = await RestauranteSequelize.findAll();
    let restaurantsSyncedCount = 0;

    for (const restaurant of sequelizeRestaurants) {
      const existingMongoRestaurant = await RestauranteMongo.findOne({
        id: restaurant.id,
      });

      if (!existingMongoRestaurant) {
        await RestauranteMongo.create({
          id: restaurant.id,
          nome: restaurant.nome,

          pratos: [],
        });
        restaurantsSyncedCount++;
        console.log(
          `  Restaurante '${restaurant.nome}' (ID: ${restaurant.id}) criado no MongoDB.`
        );
      } else {
        await RestauranteMongo.updateOne(
          { id: restaurant.id },
          { $set: { nome: restaurant.nome } }
        );
        console.log(
          `  Restaurante '${restaurant.nome}' (ID: ${restaurant.id}) atualizado no MongoDB.`
        );
      }
    }
    console.log(
      `Sincronização de restaurantes concluída. ${restaurantsSyncedCount} novos restaurantes criados.`
    );
  } catch (error) {
    console.error("\n🔴 Erro durante a sincronização:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Conexão com o MongoDB fechada.");

    console.log("Script de sincronização finalizado.");
    process.exit(0);
  }
}

syncUsersAndRestaurants();
