const Sequelize = require("sequelize");
const sequelize = new Sequelize("real-state", "postgres", "12345678", {
  dialect: "postgres",
  host: "localhost",
  port: 5433,
});

module.exports = sequelize;