const connection = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "653255",
    database: "provihack",
  },
});

module.exports = connection;
