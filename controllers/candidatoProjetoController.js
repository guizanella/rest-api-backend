const db = require('../config/db')

module.exports = {

    async postCandidatoProjeto(req, res) {
        const candidatoProjeto = new db.candidatoProjeto(req.body);

        await candidatoProjeto.save().then((candidatoProjeto) => {
            return res.json({ "data": { "status": 201, candidatoProjeto } });
        });
    }
}