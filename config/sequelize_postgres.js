const Sequelize = require('sequelize');

// Sequelize segue a forma:     banco      usuario     senha
const sequelize = new Sequelize('web2_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adicionar modelos
db.Usuario = require('../models/usuario');
db.Concurso = require('../models/concurso');
db.Item = require('../models/item');
db.VotosItemConcurso = require('../models/votacao');

db.Usuario.sync()
db.Concurso.sync()
db.Item.sync()
db.VotosItemConcurso.sync()

module.exports = db;

