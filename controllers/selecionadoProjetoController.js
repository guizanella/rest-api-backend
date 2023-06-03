const db = require('../config/db');

module.exports = {
    async getSelecionadoProjeto(req, res) {
        const selecionadoProjeto = await db.selecionadoProjeto.findAll();
        return res.json({ "data": { "status": "success", selecionadoProjeto } });
    },
    async getSelecionadoProjetoById(req, res) {
        const { id } = req.params;
        selecionadoProjeto = await db.selecionadoProjeto.findOne({ where: { id: id } })
        if (selecionadoProjeto)
            return res.json({ "data": { "status": "success", selecionadoProjeto } });
        else
            return res.status(204).json();
    },
    async postSelecionadoProjeto(req, res) {
        const selecionadoProjeto = new db.selecionadoProjeto(req.body);

        await selecionadoProjeto.save().then((selecionadoProjeto) => {
            return res.json({ "data": { "status": 201, selecionadoProjeto } });
        });
    },
    async putSelecionadoProjeto(req, res) {
        await db.selecionadoProjeto.update(req.body, {
            where: { id: req.params.id },
            returning: true
        }).then((selecionadoProjeto) => {
            return res.json({ "data": { "status": "success", selecionadoProjeto } });
        });
    },
    async deleteSelecionadoProjeto(req, res) {
        await db.selecionadoProjeto.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.json({ "data": { "status": "success" } });
        });
    }
}