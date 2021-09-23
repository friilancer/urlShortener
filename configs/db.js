const Sequelize = require('sequelize');
const database = process.env.DB || require('../secret/secrets').postgresUri;
module.exports = new Sequelize(database);