const db = require('../config/db');

async function getConcursoResultado(req, res) {

}

async function getListaConcursosView(req, res) {
    db.Concurso.findAll()
        .then(concursos => {

        }).catch(error => {

        })
}

async function getConcursoView(req, res) {
    db.Concurso.findOne({
        where: {
            id: req.params.id
        }
    }).then(concurso => {

    }).catch(error => {

    })
}

async function getConcursoCreate(req, res) {
    res.render('concurso/concursoCreate', { layout: 'noMenu.handlebars' });
}

async function postConcursoCreate(req, res) {

}

async function getConcursoEdit(req, res) {

}

async function postConcursoEdit(req, res) {

}

async function deleteConcurso(req, res) {

}


module.exports = {
    getListaConcursosView,
    getConcursoView,
    getConcursoCreate,
    postConcursoCreate,
    getConcursoEdit,
    postConcursoEdit,
    deleteConcurso,
};