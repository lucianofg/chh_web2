const express = require('express');
const multer = require('multer');
const { uuid } = require('uuidv4')

const usuarioController = require('../controllers/usuario');
const concursoController = require('../controllers/concurso');
const itemController = require('../controllers/item');
const generalController = require('../controllers/geral');


const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/uploads/',
        filename(req, file, cb) {
            const fileName = `${uuid()}-${file.originalname.replaceAll(' ', '_')}`
            return cb(null, fileName)
        },
    }),
})

const routes = express.Router();

// Rotas gerais
routes.get('/', generalController.getRoot);
routes.get('/home', (req, res) => { res.redirect('/') });

// Rotas relacionadas ao usuário
routes.get("/usuario/create", usuarioController.getUsuarioCreate);
routes.post("/usuario/create", usuarioController.postUsuarioCreate);
routes.get("/usuario/:id/edit/", usuarioController.getUsuarioEdit);
routes.get("/usuario/edit", usuarioController.getUsuarioSelfEdit);
routes.post("/usuario/edit", usuarioController.postUsuarioEdit);
routes.get("/usuario/:id/delete/", usuarioController.getUsuarioDelete);
routes.get("/usuario/login", usuarioController.getUsuarioLogin);
routes.post("/usuario/login", usuarioController.postUsuarioLogin);
routes.get("/usuario/logout", usuarioController.getUsuarioLogout);
routes.get("/usuario/list", usuarioController.getUsuarioList);

// Rotas relacionadas aos concursos
routes.get('/concurso/:id/resultado', concursoController.getConcursoResultado);
routes.get('/concurso/list', concursoController.getListaConcursosView);
routes.get('/concurso/:id/view', concursoController.getConcursoView);
routes.get('/concurso/create', concursoController.getConcursoCreate);
routes.post('/concurso/create', concursoController.postConcursoCreate);
routes.get('/concurso/:id/edit', concursoController.getConcursoEdit);
routes.post('/concurso/edit', concursoController.postConcursoEdit);
routes.get('/concurso/:id/delete', concursoController.getConcursoDelete);

// Rotas relacionadas aos itens de um concurso
routes.get('/item/concurso/:concurso_id/list', itemController.getListaItensConcursoView);
routes.get('/item/usuario/list', itemController.getListaItensUsuarioView);
routes.get('/item/:id_item/view', itemController.getItemView);
routes.get('/item/concurso/:concurso_id/create', itemController.getItemCreate);
routes.get('/item/:id_item/edit', itemController.getItemEdit);
routes.post('/item/edit', itemController.postItemEdit);
routes.get('/item/:id/delete', itemController.getItemDelete);

routes.post(
    '/item/create',
    upload.single('arquivoItem'),
    itemController.postItemCreate
);


routes.post('/item/vote', itemController.postVotarItemConcurso);

module.exports = routes;
