const db = require('../config/db')

module.exports = {

    async getCandidatoProjeto(req, res) {
        const candidatoProjeto = await db.candidatoProjeto.findAll();
        return res.json({ "data": { "status": "success", candidatoProjeto } });
    },

    async getCandidatoProjetoById(req, res) {
        const { id } = req.params;
        candidatoProjeto = await db.candidatoProjeto.findOne({ where: { id: id } })
        if (candidatoProjeto)
            return res.json({ "data": { "status": "success", candidatoProjeto } });
        else
            return res.status(204).json();
    },

    async postCandidatoProjeto(req, res) {
        const candidatoProjeto = new db.candidatoProjeto(req.body);

        await candidatoProjeto.save().then((candidatoProjeto) => {
            return res.json({ "data": { "status": 201, candidatoProjeto } });
        });
    },

    async putCandidatoProjeto(req, res) {
        await db.candidatoProjeto.update(req.body, {
            where: { id: req.params.id },
            returning: true
        }).then((candidatoProjeto) => {
            return res.json({ "data": { "status": "success", candidatoProjeto } });
        });
    },
    
    async deleteCandidatoProjeto(req, res) {
        await db.candidatoProjeto.destroy({
            where: { id: req.params.id }
        }).then(() => {
            return res.json({ "data": { "status": "success" } });
        });
    }
}