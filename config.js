const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  database: "postgres",
  username: "postgres",
  password: "1234", // this password is used for my local postgres user setup
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: false,
  },
});

module.exports = sequelize;
