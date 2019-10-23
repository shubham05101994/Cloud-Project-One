const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("user_login", "admin", "Mission123", {
  host: "database-1.c7gf8ktybcod.us-west-1.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",

  pool: {
    max: 1000,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
