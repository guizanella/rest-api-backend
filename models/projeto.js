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
            type: Sequelize.DATE,
            allowNull: false
        },
        ano_fim: {
            type: Sequelize.DATE,
            allowNull: false
        },
        popularidade: {
            type: Sequelize.VIRTUAL,
            get() {
                return db.candidatoProjeto.count({
                    where: { projetoId: this.id },
                });
            }
        }
    },
    {
        timestamps: false
    });
    return Projeto;
}