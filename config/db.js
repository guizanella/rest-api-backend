const Sequelize = require('sequelize');

const sequelize = new Sequelize('API', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
})

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Projeto = require('../models/projeto.js')(sequelize, Sequelize);
db.Usuario = require('../models/usuario.js')(sequelize, Sequelize);
db.candidatoProjeto = require('../models/candidatoProjeto.js')(sequelize, Sequelize);
db.selecionadoProjeto = require('../models/selecionadoProjeto.js')(sequelize, Sequelize);

db.Usuario.hasMany(db.Projeto, { foreignKey: 'id_responsavel' });
db.Usuario.belongsToMany(db.Projeto, { through: db.candidatoProjeto });
db.Projeto.belongsToMany(db.Usuario, { through: db.candidatoProjeto });
db.Usuario.belongsToMany(db.Projeto, { through: db.selecionadoProjeto });
db.Projeto.belongsToMany(db.Usuario, { through: db.selecionadoProjeto });
module.exports = db;