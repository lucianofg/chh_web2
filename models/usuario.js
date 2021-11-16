/**
 * Entidade que vai ser usado para todos os usuários do site, incluindo
 * familiares, colaboradores e administradores
 */
module.exports = (Sequelize) => {
    const Usuario = Sequelize.define(
        'usuario', 
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            nome: { type: Sequelize.STRING, allowNull: false },
            senha: { type: Sequelize.STRING, allowNull: false },
            email: { type: Sequelize.STRING, allowNull: false },
            eAtivo: { 
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            eAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        { underscored: true },
    )
    return Usuario;
}

