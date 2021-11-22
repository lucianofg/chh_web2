const express = require('express');

const usuarioController = require('../controllers/usuario_controller')

const routes = express.Router();

routes.get("/pagina_cadastro", usuarioController.getPaginaCadastro)
routes.post("/criar_usuario", usuarioController.postCriarUsuario);
//route.get("/", controllerUsuario.getLogin);
//route.post("/login", controllerUsuario.postLogin);
//route.get("/logout", controllerUsuario.getLogout);
//route.get("/recuperarSenha/:login", controllerUsuario.getRecuperarSenha);
//route.post("/recuperarSenha", controllerUsuario.postRecuperarSenha);

module.exports = routes;
