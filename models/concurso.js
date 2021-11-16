/**
 * Entidade que vai ser usada para o cadastro dos concursos
 */
module.exports = (Sequelize) => {
    const Concurso = Sequelize.define(
        'concurso',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            nome_concurso: { type: Sequelize.TEXT, allowNull: false },
            descricao: { type: Sequelize.TEXT, allowNull: false },
            premio: { type: Sequelize.TEXT, allowNull: false },
        }
    )
    return Concurso;
}
