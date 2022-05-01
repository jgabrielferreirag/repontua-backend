const configs = require("../localConfigs/databaseConfigs");

const connection = require("knex")(configs);

module.exports = connection;
