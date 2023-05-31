module.exports = (sequelize, Sequelize) => {
    const selecionadoProjeto = sequelize.define('selecionadoProjeto',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            }
        },
        {
            tableName: 'selecionado_projeto',
            timestamps: false
        })
    return selecionadoProjeto;
}