const { QueryTypes } = require('sequelize');
const db = require('../config/db');
const { getUsuario } = require('./utils');
const uploadsFolder = '/uploads'

async function getListaItensConcursoView(req, res) {
    const concurso = await db.Concurso.findByPk(req.params.concurso_id);
    db.Item.findAll({
        where: {
            concurso_id: req.params.concurso_id,
        },
    }).then(itens => {
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            itens: itens.map(i => i.toJSON()),
            concurso: concurso.toJSON(),
            usuario: getUsuario(req),
        })
    }).catch(error => {
        res.render('item/itemConcursoList', {
            layout: 'main.handlebars',
            concurso: concurso.toJSON(),
            error: error,
        });
    });
}

async function getListaItensUsuarioView(req, res) {
    const query = `SELECT 
            items.id as id, 
            items.nome as nome, 
            items.link_item as link_item, 
            concursos.nome as nome_concurso, 
            concursos.id as concurso_id 
        FROM items INNER JOIN concursos 
            ON concursos.id = items.concurso_id;`
    const itens = await db.schema.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
    })
    console.log(itens.map(i => i.toJSON()));
    console.log(itens);
    res.render('item/itemConcursoList', {
        layout: 'main.handlebars',
        itens: itens.map(i => i.toJSON()),
        usuario: getUsuario(req),
    });
}


async function getItemView(req, res) {
    db.Item.findOne({
        where: { id: req.params.id }
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
        concurso_id: req.body.concurso_id,
        usuario_id: req.session.usuario_id,
        numero_votos: 0,
        nome: req.body.nome,
        link_item: uploadsFolder + req.file.filename,
    }).then(item => {
        res.render('item/itemCriado', {
            layout: 'noMenu.handlebars',
            item: item.nome,
        });
    }).catch(error => {
        res.render('item/itemCriado', {
            layout: 'main.handlebars',
            error: error,
        });
    });
}

async function getItemEdit(req, res) {
    await db.Item.findOne({
        where: {
            id: req.params.id_item,
            concurso_id: req.params.concurso_id,
        }
    }).then((item) => {
        res.render('item/itemEdit', {
            item: item.toJSON(),
            layout: 'noMenu.handlebars',
        });
    }).catch((err) => {
        res.render('erros/404_not_found', { layout: 'noMenu.handlebars' })
    });
}
async function postItemEdit(req, res) {
    db.Item.findOne({
        where: { id: req.body.id }
    }).then(item => {
        item.set({
            nome: req.body.nome,
            link_item: req.body.link_item,
        });
        item.save();
    }).catch(error => {
        res.json({
            error: error,
        });
    })

}

async function getItemDelete(req, res) {
    if (req.session.eAdmin) {
        db.Item.destroy({
            where: {
                id: req.params.id,
            }
        });
    }
}

async function postVotarItemConcurso(req, res) {
    const id_item = req.body.id_item;
    const concurso_id = req.params.concurso_id;

    db.Item.findOne({
        where: {
            id_item: id_item,
            concurso_id: concurso_id,
        }
    }).then(vic => {
        vic.increment('numero_votos', { returning: false });
    }).catch(error => {
        res.json({
            error: error
        })
    });
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
    postVotarItemConcurso,
};