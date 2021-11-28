const db = require('../config/db');
const { getUsuario } = require('./utils');

async function getConcursoResultado(req, res) {

}

async function getListaConcursosView(req, res) {
    db.Concurso.findAll().then(concursos => {
        res.render('concurso/concursoList', {
            concursos: concursos,
            usuario: getUsuario(req),
            layout: 'main.handlebars' 
        });
    }).catch(error => {
        res.render('concurso/concursoList', {
            error: error,
            usuario: getUsuario(req),
            layout: 'main.handlebars',
        });
    });
}

async function getConcursoView(req, res) {
    db.Concurso.findOne({
        where: {
            id: req.params.id
        }
    }).then(concurso => {
        res.render('concurso/concursoView', {
            layout: 'main.handlebars',
            concurso: concurso,
            usuario: getUsuario(req)
        });
    }).catch(error => {
        res.render('concurso/concursoView', {
            layout: 'main.handlebars',
            usuario: getUsuario(req),
            error: error
        });
    })
}

async function getConcursoCreate(req, res) {
    res.render('concurso/concursoCreate', { layout: 'noMenu.handlebars' });
}

async function postConcursoCreate(req, res) {
    db.Concurso.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        premio: req.body.premio,
        prazoEnvioItem: req.body.prazoEnvioItem,
        dataDivulgacaoResultados: req.body.dataDivulgacaoResultados,
    }).then(concurso => {
        res.render('concurso/concursoCriadoComSucesso', {
            layout: 'main.handlebars',
            concurso: concurso.nome,
            usuario: getUsuario(req),
        });
    }).catch(error => {
        res.render('concurso/concursoCriadoComSucesso', {
            error: error,
            layout: 'main.handlebars',
            usuario: getUsuario(req),
        });
    });
}

async function getConcursoEdit(req, res) {
    await db.Concurso.findOne({
        where: {
            id: req.params.id
        }
    }).then((concurso) => {
        if (concurso == null) throw new Error("Concurso não achado");
        res.render('concurso/concursoEdit', { 
            concurso: concurso.toJSON(),
            usuario: {
                id: req.session.id_usario,
                eAdmin: req.session.eAdmin,
            },
        });
    }).catch(err => {
        res.render('erros/concursoNaoAchado');
    });

}

async function postConcursoEdit(req, res) {
    db.Concurso.findOne({
        where: { id: req.body.id  }
    }).then(concurso => {
        concurso.set({
            nome: req.body.nome,
            descricao: req.body.descricao,
            premio: req.body.premio,
            prazoEnvioItem: req.body.prazoEnvioItem,
            dataDivulgacaoResultados: req.body.dataDivulgacaoResultados,
        });
        concurso.save();
    })
}

async function getConcursoDelete(req, res) {
    if (req.session.eAdmin) {
        db.Usuario.destroy({
            where: { id: req.params.id, }
        });
    }
}


module.exports = {
    getConcursoResultado,
    getListaConcursosView,
    getConcursoView,
    getConcursoCreate,
    postConcursoCreate,
    getConcursoEdit,
    postConcursoEdit,
    getConcursoDelete,
};
