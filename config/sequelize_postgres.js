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
db.Usuario = require('../models/usuario')(sequelize, Sequelize);
db.Concurso = require('../models/concurso')(sequelize, Sequelize);
db.Item = require('../models/item')(sequelize, Sequelize);

module.exports = db;

