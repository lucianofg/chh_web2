const db = require('../config/db');
const { getUsuario } = require('./utils');

async function getConcursoResultado(req, res) {

}

async function getListaConcursosView(req, res) {
    db.Concurso.findAll().then(concursos => {
        res.render('concurso/concursoList', {
            concursos: concursos.map(c => c.toJSON()),
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
        if (concurso == undefined) throw new Error("Concurso não achado");
        var aceita_envios = new Date(concurso.prazoEnvioItem) >= new Date() ? true : false;
        var saiu_resultado = new Date(concurso.dataDivulgacaoResultado) < new Date() ? true : false;

        res.render('concurso/concursoView', {
            layout: 'main.handlebars',
            concurso: concurso.toJSON(),
            concursoAceitaEnvios: aceita_envios,
            concursoSaiuResultado: saiu_resultado,
            usuario: getUsuario(req),
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
    res.render('concurso/concursoCreate', { 
        layout: 'noMenu.handlebars',
        usuario: getUsuario(req),
    });
}

async function postConcursoCreate(req, res) {
    db.Concurso.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        premio: req.body.premio,
        prazoEnvioItem: new Date(req.body.prazoEnvioItem),
        dataDivulgacaoResultado: new Date(req.body.dataDivulgacaoResultado),
    }).then(concurso => {
        res.render('concurso/concursoCriado', {
            layout: 'main.handlebars',
            concurso: concurso.nome,
            usuario: getUsuario(req),
        });
    }).catch(error => {
        res.render('concurso/concursoCriado', {
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
    }).catch(error => {
        res.render('erros/concursoNaoAchado', {
            layout: 'noMenu.handlebars',
            error: error,
        });
    });

}

async function postConcursoEdit(req, res) {
    console.log(req.body.id)
    db.Concurso.findOne({
        where: { id: req.body.id  }
    }).then(concurso => {
        concurso.set({
            nome: req.body.nome,
            descricao: req.body.descricao,
            premio: req.body.premio,
            prazoEnvioItem: new Date(req.body.prazoEnvioItem),
            dataDivulgacaoResultado: new Date(req.body.dataDivulgacaoResultado),
        });
        concurso.save();
        res.redirect('/concurso/list')
    }).catch(error => {
        res.render('erros/404_not_found')
        console.log(error);
    })
}

async function getConcursoDelete(req, res) {
    if (req.session.eAdmin) {
        db.Concurso.destroy({
            where: { id: req.params.id, }
        });
        res.render('concurso/concursoDeletado', {
            layout: 'noMenu.handlebars',
            id: req.params.id,
        });
    } else {
        res.render('concurso/concursoDeletado', {
            layout: 'noMenu.handlebars',
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
