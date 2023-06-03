module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        idade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    { 
        timestamps: false 
    });
    return Usuario;
}