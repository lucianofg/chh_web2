/**
 * Entidade que vai ser usada para o cadastro de um item que vai
 * concorrer a um concurso.
 */

module.exports = (Sequelize) => {
    const Item = Sequelize.define(
        'item',
        {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true
            },
            tipo_item: {
                type: Sequelize.CHAR(1),
                allowNull: false,
            },
            link_item: {
                type: Sequelize.STRING,
                allowNull: false
            },
        },
        { underscored: true },
    )
}
