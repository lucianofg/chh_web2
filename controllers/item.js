const {QueryTypes} = require('sequelize');
const db = require('../config/db');
const {getUsuario} = require('./utils');
const uploadsFolder = '/uploads'

async function getListaItensConcursoView(req, res) {
    const query = `
        SELECT
            items.id as id,
            items.nome as nome,
            items.link_item as link_item,
            COALESCE(g.gostou, FALSE) as gostou
        FROM items 
        FULL OUTER JOIN (
            SELECT * FROM gostous WHERE usuario_id = $1
        ) as g ON
                items.id = g.item_id
        WHERE items.concurso_id = $2;
        ;`
    if (req.session.usuario_id) {
        var itens = await db.schema.query(query, {
            bind: [req.session.usuario_id, req.params.concurso_id],
            type: QueryTypes.SELECT,
        })
    } else itens = {}
    res.render('item/itemConcursoList', {
        layout: 'main.handlebars',
        itens: itens,
        usuario: getUsuario(req),
    });
}

async function getListaItensUsuarioView(req, res) {
    const query = `
        SELECT 
            items.id as id, 
            items.nome as nome, 
            items.link_item as link_item, 
            concursos.nome as nome_concurso, 
            concursos.id as concurso_id
        FROM items 
            INNER JOIN concursos ON concursos.id = items.concurso_id
        WHERE
            items.usuario_id = $1
        ;`
    const itens = await db.schema.query(query, {
        bind: [req.session.usuario_id],
        type: QueryTypes.SELECT,
    })
    console.log(itens);
    res.render('item/itemUsuarioList', {
        layout: 'main.handlebars',
        itens: itens,
        usuario: getUsuario(req),
    });
}

async function getItemView(req, res) {
    db.Item.findOne({
        where: {id: req.params.id}
    }).then(item => {
        res.render('item/itemView', {
            layout: 'main.handlebars',
            item: item.toJSON(),
            usuario: getUsuario(req),
        });
    }).catch(error => {
        res.render('item/itemView', {
            layout: 'main.handlebars',
            error: error,
        })
    });
}

async function getItemCreate(req, res) {
    res.render('item/itemCreate', {
        layout: 'main.handlebars',
        usuario: getUsuario(req),
        concurso_id: req.params.concurso_id,
    });
}

async function postItemCreate(req, res) {
    db.Item.create({
        concursoId: req.body.concurso_id,
        usuarioId: req.session.usuario_id,
        numero_votos: 0,
        nome: req.body.nome,
        link_item: uploadsFolder + '/' + req.file.filename,
    }).then(item => {
        res.render('item/itemCriado', {
            layout: 'noMenu.handlebars',
            item: item.nome,
            concurso_id: req.body.concurso_id,
        });
    }).catch(error => {
        res.render('item/itemCriado', {
            layout: 'main.handlebars',
            error: error,
        });
    });
}

async function getItemEdit(req, res) {
    db.Item.findOne({
        where: {
            id: req.params.id_item,
        }
    }).then((item) => {
        res.render('item/itemEdit', {
            item: item.toJSON(),
            usuario: getUsuario(req),
            layout: 'noMenu.handlebars',
        });
    }).catch((error) => {
        res.render('item/itemEdit', {
            layout: 'noMenu.handlebars',
            error: error,
        })
    });
}

async function postItemEdit(req, res) {
    db.Item.findOne({
        where: {id: req.body.id}
    }).then(item => {
        item.set({
            nome: req.body.nome,
        });
        item.save();
        res.render('item/itemEditado', {
            layout: 'noMenu.handlebars',
            nomeEditado: req.body.nome,
        })
    }).catch(error => {
        res.render('item/itemEditado', {
            layout: 'noMenu.handlebars',
            error: error,
        });
    })
}

async function getItemDelete(req, res) {
    db.Item.findByPk(req.params.id).then(item => {
        if (req.session.eAdmin || item.usuarioId == req.session.id_usuario) {
            item.destroy().then(item => {
                res.render('item/itemDeletado', {
                    layout: 'noMenu.handlebars',
                    id: req.params.id,
                    eAdmin: req.session.eAdmin,
                });
            });
        }
    }).catch(error => {
        res.render('item/itemDeletado', {
            layout: 'noMenu.handlebars',
            error: error,
        })
    })
}

module.exports = {
    getListaItensConcursoView,
    getListaItensUsuarioView,
    getItemView,
    getItemCreate,
    postItemCreate,
    getItemEdit,
    postItemEdit,
    getItemDelete,
};
