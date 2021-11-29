const db = require('./config/db');
const { gerarSalt} = require('./controllers/utils')
const argon = require('argon2');

async function createSuperUser(nome, sobrenome, email, senha) {
    const novoSalt = gerarSalt();
    const novoHash = await argon.hash(senha + novoSalt);

    db.Usuario.create({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        salt: novoSalt,
        senha: novoHash,
        eColaborador: true,
        eAdmin: true,
    }).then(usuario => {
        console.log("Usuário criado:")
        console.log(usuario);
    }).catch(error => {
        console.log("Erro na criação do usuário");
        console.log(error);
    });
}

console.log("Criando usuário...");
createSuperUser("admin", "admin", "admin@admin.com", "admin");


