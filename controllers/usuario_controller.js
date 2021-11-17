const Usuario = require('../config/sequelize_postgres');
const argon = require('argon2');
const crypto = require('crypto');
const TAMANHO_SALT = 64;

// Talvez seja desnecessário, mas vou deixar aqui como referência
const hashOptions =  {
    timeCost: 4,
    memoryCost: 2 ** 13,
    parallelism: 2,
    type: argon.argon2d,
}

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

async function criarUsuario(usuario) {
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
    });

    // TODO: Decidir como prossegui em caso de erro ou sucesso
}

async function loginUsuario(email, senha) {
    const usuario = await db.Usuario.findOne({
        where: { email: email }
    });

    if (verificarHash(usuario.senha, senha, usuario.salt)) {
        // TODO: Processiguir com o login
    } else {
        // TODO: negar login
    }
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


