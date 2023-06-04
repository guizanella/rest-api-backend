const db = require('../config/db')
const msg = "Operação não autorizada."

module.exports = {

    async postCandidatar(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        if (req.session.Usuario[0].tipo == 3) {
            const candidatoProjeto = new db.candidatoProjeto(req.body);
            candidatoProjeto.usuarioId = req.session.Usuario[0].id

            await candidatoProjeto.save().then((candidatoProjeto) => {
                return res.status(201).json({ "data": { candidatoProjeto } });
            });
        } else return res.status(401).json(msg)
    }
}