const express = require('express');

const usuarioController = require('../controllers/usuario_controller');
const concursoController = require('../controllers/concurso_contrller');

const routes = express.Router();

// Rotas relacionadas ao usuário
routes.get("/usuario/create", usuarioController.getUsuarioCreate);
routes.post("/usuario/create", usuarioController.postUsuarioCreate);
routes.get("/usuario/:id/edit/", usuarioController.getUsuarioEdit) //TODO
routes.post("/usuario/edit", usuarioController.postUsuarioEdit); // TODO
routes.delete("/usuario/:id/delete/", usuarioController.deleteUsuario); //TODO
routes.post("/usuario/:id/disable", usuario.postUsuarioDisable); //TODO
routes.post("/usuario/login", usuarioController.postUsuarioLogin);
routes.post("/usuario/logout", usuarioController.postUsuarioLogout);

// Rotas relacionadas aos concursos
routes.get('/concurso/view', concursoController.getListaConcursosView);
routes.get('/concurso/:id/view', concursoController.getConcursoView);
routes.get('/concurso/create', concursoController.getConcursoCreate);
routes.post('/concurso/create', concursoController.postConcursoCreate);
routes.get('/concurso/:id/edit', concursoController.getConcursoEdit);
routes.post('/concurso/edit', concursoController.postConcursoEdit);
routes.delete('/concurso/:id/delete', concursoController.deleteConcurso);

// Rotas relacionadas aos itens de um concurso
routes.get('/concurso/:id_concurso/item/view', itemController.getListaItensView);
routes.get('/concurso/:id_concurso/item/:id_item/view', itemController.getItemView);
routes.get('/concurso/:id_concurso/item/create', itemController.getItemCreate);
routes.post('/concurso/:id_concurso/item/create', itemController.postItemCreate);
routes.get('/concurso/:id_concurso/item/:id_item/edit', itemController.getItemEdit);
routes.post('/concurso/:id_concurso/item/edit', itemController.postItemEdit);
routes.delete('/concurso/:id_concurso/item/:id_item/delete', itemController.deleteItem);

// Rotas relacionadas as votações
routes.get('/concurso/:id_concurso/item')


module.exports = routes;
