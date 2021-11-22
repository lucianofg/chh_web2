const db = require('../config/db');
const argon = require('argon2'); // função de hash
const crypto = require('crypto');
const TAMANHO_SALT = 64;

function gerarSalt() {
    return crypto.randomBytes(Math.ceil(TAMANHO_SALT / 2))
        .toString('hex')
        .slice(0, TAMANHO_SALT);
}

function verificarHash(hash, senha, salt) {
    return argon.verify(hash, senha + salt);
}

function hashSenha(senha, salt) {
    return argon.hash(senha + salt)
}

async function postCriarUsuario(req, res) {
    const usuario = req.body;

    const novoSalt = gerarSalt();
    const hashSenha = hashSenha(usuario.senha, novoSalt);

    db.Usuario.create({
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        senha: hashSenha,
        salt: novoSalt,
        email: usuario.email,
        eAtivo: usuario.eAtivo,
        eAdmin: usuario.eAdmin,
    }).then((item) => {
        res.json({
            "Message": "Usuario criado",
            "Usuario": usuario.nome,
        });
    }).catch((error) => {
        res.json({
            "Message": "Erro na criação do usuário",
            "Erro": error,
        })
    });
}

async function postLoginUsuario(req, res) {
    const email = req.body.email;
    const senha = req.body.senha;
    const usuario = await db.Usuario.findOne({
        where: { email: email }
    });

    if (verificarHash(usuario.senha, senha, usuario.salt)) {
        // TODO: Processiguir com o login
    } else {
        // TODO: negar login
    }
}

async function getPaginaCadastro(req, res) {
    res.render('usuario/usuarioCreate', {layout: 'noMenu.handlebars'})
}

async function mudarSenha(id_usuario, novaSenha) {
    const novoSalt = gerarSalt();
    const hashSenha = hashSenha(usuario.senha, novoSalt);

    let usuario = db.Usuario.findByPk(id_usuario);
    usuario.set({
        salt: novoSalt,
        senha: hashSenha,
    });
    usuario.save();
}

async function recuperarSenha(req, res) {
    // TODO
}


module.exports = {
    getPaginaCadastro,
    postCriarUsuario,
}
