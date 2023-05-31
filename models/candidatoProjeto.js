module.exports = (sequelize, Sequelize) => {
    const candidatoProjeto = sequelize.define('candidatoProjeto',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            }
        },
        {
            tableName: 'candidato_projeto',
            timestamps: false
        })
    return candidatoProjeto;
}