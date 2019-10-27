const Sequelize = require("sequelize");
const db = {};
const sequelize = new Sequelize("", "", "", {
  host: "",
  port: ,
  dialect: "",
  dialectOptions: {
    ssl:''
  },

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log("db-->", db);

module.exports = db;
