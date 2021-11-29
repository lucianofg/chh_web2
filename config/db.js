var db = {}

db.Usuario = require('../models/usuario');
db.Concurso = require('../models/concurso');
db.Item = require('../models/item');
db.Gostou = require('../models/gostou')
db.schema = require('./sequelize_postgres');

db.Usuario.sync()
db.Concurso.sync()
db.Item.sync()
db.Gostou.sync()


module.exports = db;
