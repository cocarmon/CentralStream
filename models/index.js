const Sequelize = require('sequelize');
const config = require('../config/database');

// Sequelize Instance connects to postgres
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,

  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  timestamps: false, // disables the updatedAt column
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Intizlized to the users table in postgres
db.user = require('./userModel')(sequelize, Sequelize);
db.channel = require('./channelModel')(sequelize, Sequelize);

module.exports = db;
