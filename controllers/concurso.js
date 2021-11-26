const db = require('../config/db');

async function getConcursoResultado(req, res) {

}

async function getListaConcursosView(req, res) {
    db.Concurso.findAll().then(concursos => {
        res.render('concurso/concursoList', {
            concursos: concursos,
            layout: 'main.handlebars' 
        });
    }).catch(error => {
        res.render('concurso/concursoList', {
            error: error,
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
        })
    }).catch(error => {
        res.render('concurso/concursoView', {
            layout: 'main.handlebars',
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
            usuario: concurso.nome,
        });
    }).catch(error => {
        res.json({
            "Message": "Erro na criação do curso",
            "Erro": error,
        })
    });
}

async function getConcursoEdit(req, res) {
    await db.Concurso.findOne({
        where: {
            id: req.params.id
        }
    }).then((concurso) => {
        res.render('concurso/concursoEdit', { concurso: concurso.toJSON() });
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
    db.Usuario.destroy({
        where: { id: req.params.id, }
    });
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
