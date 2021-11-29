var db = {}

db.Usuario = require('../models/usuario');
db.Concurso = require('../models/concurso');
db.Item = require('../models/item');
db.Gostou = require('../models/gostou')
db.schema = require('./sequelize_postgres');

db.schema.sync()

module.exports = db;
