const db = require('../config/db');

module.exports = {
    
    async postSelecionadoProjeto(req, res) {
        const selecionadoProjeto = new db.selecionadoProjeto(req.body);

        await selecionadoProjeto.save().then((selecionadoProjeto) => {
            return res.json({ "data": { "status": 201, selecionadoProjeto } });
        });
    }
}