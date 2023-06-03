const db = require('../config/db')

module.exports = (sequelize, Sequelize) => {
    const Projeto = sequelize.define('projeto', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ano_inicio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ano_fim: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    return Projeto;
}