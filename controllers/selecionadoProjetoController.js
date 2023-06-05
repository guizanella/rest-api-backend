const db = require('../config/db');
const msg = "Operação não autorizada."

module.exports = {

    async postSelecionar(req, res) {
        if (!req.session.Usuario) return res.status(401).json(msg)

        projeto = await db.Projeto.findOne({ where: { id: req.body.projetoId } })

        if (req.session.Usuario[0].tipo == 2 &&
            projeto.id_responsavel == req.session.Usuario[0].id) {

            candidatoProjeto = await db.candidatoProjeto.count({
                where: {
                    projetoId: req.body.projetoId,
                    usuarioId: req.body.usuarioId
                }
            })
            if (candidatoProjeto == 0) return res.status(404).json("Candidato não encontrado para este projeto.")

            const selecionadoProjeto = new db.selecionadoProjeto(req.body);

            await selecionadoProjeto.save().then((selecionadoProjeto) => {
                return res.status(201).json({ "data": { selecionadoProjeto } });
            });
        } else return res.status(401).json(msg)
    }
}