const express = require('express');

const usuarioController = require('../controllers/usuario');
const concursoController = require('../controllers/concurso');
const itemController = require('../controllers/item');
const generalController = require('../controllers/geral');

const routes = express.Router();

// Rotas gerais
routes.get('/', generalController.getRoot);
routes.get('/home', generalController.getHome);
routes.get('/admin', generalController.getAdmin);

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
routes.get('/concurso/resultado/view', concursoController.getConcursoResultado);
routes.get('/concurso/list', concursoController.getListaConcursosView);
routes.get('/concurso/:id/view', concursoController.getConcursoView);
routes.get('/concurso/create', concursoController.getConcursoCreate);
routes.post('/concurso/create', concursoController.postConcursoCreate);
routes.get('/concurso/:id/edit', concursoController.getConcursoEdit);
routes.post('/concurso/edit', concursoController.postConcursoEdit);
routes.get('/concurso/:id/delete', concursoController.getConcursoDelete);

// Rotas relacionadas aos itens de um concurso
routes.get('/item/list', itemController.getListaItensView);
routes.get('/item/:id_item/view', itemController.getItemView);
routes.get('/item/create', itemController.getItemCreate);
routes.post('/item/create', itemController.postItemCreate);
routes.get('/item/:id_item/edit', itemController.getItemEdit);
routes.post('/item/edit', itemController.postItemEdit);
routes.get('/item/:id_item/delete', itemController.getItemDelete);

// Rotas relacionadas as votações
routes.get('/concurso/:id_concurso/item/view', itemController.getListaItensComVotos);
routes.get('/concurso/:id_concurso/item/:id_item/view', itemController.getVotosItemConcurso);
routes.post('/concurso/:id_concurso/item/votar', itemController.postVotarItemConcurso);

routes.get('/404_not_found', generalController.getNotFound);

routes.get('*', function(req, res) {
    res.redirect('/404_not_found');
});


module.exports = routes;
