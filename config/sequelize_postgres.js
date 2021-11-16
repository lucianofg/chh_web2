const Sequelize = require('sequelize');

//const sequelize = new Sequelize('database', 'username', 'password', {
const sequelize = new Sequelize('web2_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adicionar modelos
db.Usuario = require('../models/models_postgres/usuario.js')(sequelize, Sequelize);
module.exports = db;

